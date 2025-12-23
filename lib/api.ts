// Environment-aware API client helper
// - Uses NEXT_PUBLIC_API_BASE when provided (for deploy overrides)
// - Defaults to http://localhost:8080 in development
// - Exposes apiFetch and several typed helpers for common endpoints

type FetchOptions = RequestInit & { query?: Record<string, string | number | boolean> }

const DEFAULT_LOCAL = "http://localhost:8080"

// Set this to true to use Next.js proxy (bypasses CORS)
const USE_PROXY = true  // ← CHANGED TO TRUE

function getEnvIsDev() {
  try {
    // In Next.js client code, process.env.NODE_ENV is replaced at build time
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
    // Allow overriding with NEXT_PUBLIC_API_BASE for production or staging deployments
    if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE) {
      return process.env.NEXT_PUBLIC_API_BASE
    }
    // Use proxy if enabled (for CORS bypass in development)
    if (USE_PROXY && typeof window !== "undefined") {
      return "" // Empty string means same origin, Next.js will proxy to backend
    }
    return this.isDev ? DEFAULT_LOCAL : "https://api.example.com"
  },
}

function buildUrl(path: string, query?: Record<string, string | number | boolean>) {
  const base = ApiConfig.baseUrl.replace(/\/$/, "")
  let p = path.startsWith("/") ? path : `/${path}`
  
  // If using proxy, prepend /api-proxy to the path
  if (USE_PROXY && typeof window !== "undefined") {
    p = p.replace(/^\/api/, "/api-proxy")
  }
  
  let url = `${base}${p}`
  if (query && Object.keys(query).length) {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([k, v]) => params.append(k, String(v)))
    url += `?${params.toString()}`
  }
  return url
}

async function apiFetch(path: string, options: FetchOptions = {}) {
  const { query, headers, ...rest } = options
  const url = buildUrl(path, query)

  const token = typeof window !== "undefined" ? localStorage.getItem("tlu-hub-token") : null

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) defaultHeaders["Authorization"] = `Bearer ${token}`

  console.log("📡 API Request:", { url, method: rest.method || "GET", body: rest.body })

  const res = await fetch(url, {
    headers: { ...defaultHeaders, ...(headers as Record<string, string> | undefined) },
    credentials: "include",
    ...rest,
  })

  const text = await res.text()
  const contentType = res.headers.get("content-type") || ""
  let data: any = text
  if (contentType.includes("application/json") && text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }
  
  console.log("📡 API Response:", { status: res.status, ok: res.ok, data })
  
  if (!res.ok) {
    const err: any = new Error(data?.message || `API request failed: ${res.status} ${res.statusText}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

// High-level helper functions (paths may be adapted easily)
export const api = {
  // Auth - Backend expects userName and password
  login: async (studentId: string, password: string) => {
    return apiFetch(`/api/Auth/login`, { 
      method: "POST", 
      body: JSON.stringify({ 
        userName: studentId,  // Backend expects "userName" field
        password 
      }) 
    })
  },
  logout: async () => {
    return apiFetch(`/api/Auth/logout`, { method: "POST" })
  },

  // Documents
  getDocumentById: async (documentId: string) => {
    return apiFetch(`/api/Document/${encodeURIComponent(documentId)}`, { method: "GET" })
  },
  getDocumentAccess: async (documentId: string, studentId: string) => {
    return apiFetch(`/api/Document/access`, { method: "GET", query: { documentId, studentId } })
  },
  searchDocuments: async (keyword: string) => {
    return apiFetch(`/api/Document/search`, { method: "GET", query: { keyword } })
  },

  // Student
  getStudentDocuments: async (studentId: string) => {
    console.log("📚 Calling getStudentDocuments with studentId:", studentId)
    return apiFetch(`/api/Student/ViewDocuments/${encodeURIComponent(studentId)}`, { method: "GET" })
  },
  upgradeVip: async (studentId: string, payload: any) => {
    return apiFetch(`/api/Student/${encodeURIComponent(studentId)}/upgrade-vip`, { method: "PUT", body: JSON.stringify(payload) })
  },
  rechargeAccount: async (payload: any) => {
    return apiFetch(`/api/Student/recharge`, { method: "POST", body: JSON.stringify(payload) })
  },
  purchaseDocument: async (payload: any) => {
    return apiFetch(`/api/Student/purchase-document`, { method: "POST", body: JSON.stringify(payload) })
  },
}

export default apiFetch
