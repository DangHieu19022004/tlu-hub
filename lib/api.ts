/**
 * API Client for TLU Hub Backend
 * Enterprise-grade configuration with environment variable support
 * Supports authentication, error handling, and request/response logging
 */

import type {
  LoginRequestDto,
  LoginResponse,
  Document,
  DocumentListResponse,
  Student,
  Transaction,
  CreateTransactionRequestDto,
  ApiResponse,
  ApiException,
  StudentInfo,
  BalanceResponse,
} from "./types"

type FetchOptions = RequestInit & { query?: Record<string, string | number | boolean> }

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_API_BASE = "https://tailieutlu-backend.onrender.com"
const DEFAULT_TIMEOUT = 30000 // 30 seconds

function getEnvIsDev() {
  try {
    return process.env.NODE_ENV !== "production"
  } catch {
    return true
  }
}

export const ApiConfig = {
  get isDev() {
    return getEnvIsDev()
  },
  get baseUrl() {
    // Read from environment variable (NEXT_PUBLIC_ prefix for client-side access)
    const envBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (envBaseUrl) {
      return envBaseUrl.replace(/\/$/, "") // Remove trailing slash
    }
    return DEFAULT_API_BASE
  },
  get timeout() {
    const envTimeout = process.env.NEXT_PUBLIC_API_TIMEOUT
    return envTimeout ? parseInt(envTimeout, 10) : DEFAULT_TIMEOUT
  },
  get debug() {
    return process.env.NEXT_PUBLIC_API_DEBUG === "true" || this.isDev
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function buildUrl(path: string, query?: Record<string, string | number | boolean>) {
  const base = ApiConfig.baseUrl
  const p = path.startsWith("/") ? path : `/${path}`
  let url = `${base}${p}`
  
  if (query && Object.keys(query).length) {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([k, v]) => params.append(k, String(v)))
    url += `?${params.toString()}`
  }
  return url
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("tlu-hub-token")
}

function logRequest(method: string, url: string, body?: any) {
  if (!ApiConfig.debug) return
  console.log("📡 API Request:", {
    method,
    url,
    body: body ? JSON.parse(body) : undefined,
    timestamp: new Date().toISOString(),
  })
}

function logResponse(status: number, ok: boolean, data: any, duration: number) {
  if (!ApiConfig.debug) return
  console.log("📡 API Response:", {
    status,
    ok,
    data,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
  })
}

// ============================================================================
// CORE API FETCH FUNCTION
// ============================================================================

async function apiFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const { query, headers, ...rest } = options
  const url = buildUrl(path, query)
  const token = getAuthToken()

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json; charset=utf-8",
  }
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`
  }

  const startTime = Date.now()
  logRequest(rest.method || "GET", url, rest.body)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), ApiConfig.timeout)

    const res = await fetch(url, {
      headers: { ...defaultHeaders, ...(headers as Record<string, string> | undefined) },
      credentials: "include",
      signal: controller.signal,
      ...rest,
    })

    clearTimeout(timeoutId)

    const contentType = res.headers.get("content-type") || ""
    let data: any = null

    if (contentType.includes("application/json")) {
      // Use res.json() instead of res.text() for proper UTF-8 handling
      try {
        data = await res.json()
      } catch (jsonError) {
        // Fallback to text if JSON parsing fails
        const text = await res.text()
        data = text || null
      }
    } else {
      data = await res.text()
    }

    const duration = Date.now() - startTime
    logResponse(res.status, res.ok, data, duration)

    if (!res.ok) {
      const error: ApiException = {
        name: "ApiException",
        message: data?.message || `API request failed: ${res.status} ${res.statusText}`,
        status: res.status,
        data,
      }
      throw error
    }

    return data as T
  } catch (err: any) {
    const duration = Date.now() - startTime
    
    if (err.name === "AbortError") {
      const timeoutError = {
        name: "ApiException",
        message: "Server không phản hồi",
        status: 408,
        data: null,
      }
      
      if (ApiConfig.debug) {
        console.warn("⚠️ API Timeout:", { 
          url, 
          duration: `${duration}ms`,
          timeout: `${ApiConfig.timeout}ms`,
        })
      }
      
      throw timeoutError
    }

    // Network error or fetch failed
    if (!err.status) {
      const networkError = {
        name: "ApiException",
        message: err.message || "Network error - Unable to connect to server",
        status: 0,
        data: null,
      }
      
      if (ApiConfig.debug) {
        console.warn("⚠️ API Network Error:", {
          url,
          message: err.message,
          duration,
        })
      }
      
      throw networkError
    }

    if (ApiConfig.debug) {
      console.warn("⚠️ API Error:", {
        url,
        error: err.message,
        status: err.status,
        data: err.data,
        duration,
      })
    }

    throw err
  }
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const api = {
  // ========== AUTH ENDPOINTS ==========
  
  /**
   * Login with studentId and password
   * POST /api/Auth/login
   */
  login: async (studentId: string, password: string): Promise<LoginResponse> => {
    const payload: LoginRequestDto = {
      userName: studentId, // Backend expects userName field
      password,
    }
    return apiFetch<LoginResponse>("/api/Auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  /**
   * Logout user
   * POST /api/Auth/Logout/{studentId}
   */
  logout: async (studentId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Auth/Logout/${encodeURIComponent(studentId)}`, {
      method: "POST",
    })
  },

  // ========== DOCUMENT ENDPOINTS ==========

  /**
   * Get document by ID
   * GET /api/Document/{id}
   */
  getDocumentById: async (documentId: string): Promise<Document> => {
    return apiFetch<Document>(`/api/Document/${encodeURIComponent(documentId)}`, {
      method: "GET",
    })
  },

  /**
   * Create new document
   * POST /api/Document
   */
  createDocument: async (document: Partial<Document>): Promise<ApiResponse<Document>> => {
    return apiFetch<ApiResponse<Document>>("/api/Document", {
      method: "POST",
      body: JSON.stringify(document),
    })
  },

  /**
   * Update document
   * PUT /api/Document
   */
  updateDocument: async (document: Document): Promise<ApiResponse<Document>> => {
    return apiFetch<ApiResponse<Document>>("/api/Document", {
      method: "PUT",
      body: JSON.stringify(document),
    })
  },

  /**
   * Delete document
   * DELETE /api/Document/{documentId}
   */
  deleteDocument: async (documentId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Document/${encodeURIComponent(documentId)}`, {
      method: "DELETE",
    })
  },

  /**
   * Get document access link
   * GET /api/Document/access-link?studentId=...&documentId=...
   */
  getDocumentAccessLink: async (studentId: string, documentId: string): Promise<ApiResponse<string>> => {
    return apiFetch<ApiResponse<string>>("/api/Document/access-link", {
      method: "GET",
      query: { studentId, documentId },
    })
  },

  /**
   * Search documents by keyword
   * GET /api/Document/search?keyword=...&limit=...
   */
  searchDocuments: async (keyword: string, limit: number = 50): Promise<ApiResponse<Document[]>> => {
    return apiFetch<ApiResponse<Document[]>>("/api/Document/search", {
      method: "GET",
      query: { keyword, limit },
    })
  },

  /**
   * Get all documents with pagination
   * GET /api/Document/all?pageNumber=...&pageSize=...
   */
  getAllDocuments: async (pageNumber: number = 1, pageSize: number = 10): Promise<DocumentListResponse> => {
    return apiFetch<DocumentListResponse>("/api/Document/all", {
      method: "GET",
      query: { pageNumber, pageSize },
    })
  },

  /**
   * Get top documents
   * GET /api/Document/top-document
   */
  getTopDocuments: async (): Promise<ApiResponse<Document[]>> => {
    return apiFetch<ApiResponse<Document[]>>("/api/Document/top-document", {
      method: "GET",
    })
  },

  // ========== STUDENT ENDPOINTS ==========

  /**
   * Check VIP status
   * GET /api/Student/CheckVIPStatus/{studentId}
   */
  checkVIPStatus: async (studentId: string): Promise<ApiResponse<{ isVIP: boolean; expiryDate?: string }>> => {
    return apiFetch<ApiResponse<{ isVIP: boolean; expiryDate?: string }>>(
      `/api/Student/CheckVIPStatus/${encodeURIComponent(studentId)}`,
      {
        method: "GET",
      }
    )
  },

  /**
   * View student's documents
   * GET /api/Student/ViewDocuments/{studentId}
   */
  getStudentDocuments: async (studentId: string): Promise<ApiResponse<Document[]>> => {
    return apiFetch<ApiResponse<Document[]>>(`/api/Student/ViewDocuments/${encodeURIComponent(studentId)}`, {
      method: "GET",
    })
  },

  /**
   * Upgrade to VIP
   * PUT /api/Student/UpgradeToVIP/{studentId}
   */
  upgradeToVIP: async (studentId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Student/UpgradeToVIP/${encodeURIComponent(studentId)}`, {
      method: "PUT",
    })
  },

  /**
   * Recharge account
   * POST /api/Student/RechargeAccount/{studentId}?amount=...
   */
  rechargeAccount: async (studentId: string, amount: number): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Student/RechargeAccount/${encodeURIComponent(studentId)}`, {
      method: "POST",
      query: { amount },
    })
  },

  /**
   * Purchase document
   * POST /api/Student/PurchaseDocument/{studentId}/{documentId}
   */
  purchaseDocument: async (studentId: string, documentId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(
      `/api/Student/PurchaseDocument/${encodeURIComponent(studentId)}/${encodeURIComponent(documentId)}`,
      {
        method: "POST",
      }
    )
  },

  /**
   * Get student info
   * GET /api/Student/info/{studentId}
   */
  getStudentInfo: async (studentId: string): Promise<StudentInfo> => {
    return apiFetch<StudentInfo>(`/api/Student/info/${encodeURIComponent(studentId)}`, {
      method: "GET",
    })
  },

  /**
   * Get student balance
   * GET /api/Student/{studentId}/balance
   */
  getStudentBalance: async (studentId: string): Promise<BalanceResponse> => {
    return apiFetch<BalanceResponse>(`/api/Student/${encodeURIComponent(studentId)}/balance`, {
      method: "GET",
    })
  },

  // ========== TRANSACTION ENDPOINTS ==========

  /**
   * Create transaction
   * POST /api/Transaction
   */
  createTransaction: async (transaction: CreateTransactionRequestDto): Promise<ApiResponse<Transaction>> => {
    return apiFetch<ApiResponse<Transaction>>("/api/Transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
    })
  },

  /**
   * Get transaction by ID
   * GET /api/Transaction/{transactionId}
   */
  getTransaction: async (transactionId: string): Promise<ApiResponse<Transaction>> => {
    return apiFetch<ApiResponse<Transaction>>(`/api/Transaction/${encodeURIComponent(transactionId)}`, {
      method: "GET",
    })
  },

  /**
   * Get pending transactions
   * GET /api/Transaction/pending
   */
  getPendingTransactions: async (): Promise<ApiResponse<Transaction[]>> => {
    return apiFetch<ApiResponse<Transaction[]>>("/api/Transaction/pending", {
      method: "GET",
    })
  },

  /**
   * Verify transaction
   * PUT /api/Transaction/verify/{transactionId}
   */
  verifyTransaction: async (transactionId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Transaction/verify/${encodeURIComponent(transactionId)}`, {
      method: "PUT",
    })
  },

  /**
   * Cancel transaction
   * PUT /api/Transaction/cancel/{transactionId}
   */
  cancelTransaction: async (transactionId: string): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/api/Transaction/cancel/${encodeURIComponent(transactionId)}`, {
      method: "PUT",
    })
  },
}

export default apiFetch
