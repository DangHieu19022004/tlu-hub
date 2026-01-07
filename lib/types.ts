/**
 * TypeScript types generated from Swagger/OpenAPI specification
 * Backend API: tailieuTlu v1.0
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum AccessLevel {
  Public = 0,
  Student = 1,
  VIP = 2,
}

export enum DocumentType {
  Lecture = 0,
  Exercise = 1,
  Exam = 2,
  Reference = 3,
}

export enum TransactionType {
  Recharge = 0,
  Purchase = 1,
  Refund = 2,
}

// ============================================================================
// REQUEST DTOs
// ============================================================================

export interface LoginRequestDto {
  /** Username (3-100 characters) */
  userName: string
  /** Password */
  password: string
}

export interface CreateTransactionRequestDto {
  /** Student ID (required) */
  studentID: string
  /** Document ID (optional, UUID format) */
  documentID?: string
  /** Transaction amount (required) */
  amount: number
  /** Transaction note (optional) */
  note?: string
  /** Transaction type (required) */
  type: TransactionType
}

// ============================================================================
// RESPONSE DTOs / MODELS
// ============================================================================

export interface Document {
  /** Document ID (UUID) */
  documentID: string
  /** Document title (1-255 characters, required) */
  title: string
  /** Document description (optional) */
  description?: string
  /** Document type */
  type: DocumentType
  /** Document price */
  price: number
  /** Access level required */
  accessLevel: AccessLevel
  /** Storage link (required) */
  storageLink: string
  /** Upload date */
  uploadDate: string
  /** Subject name (max 100 characters) */
  subject?: string
  /** Tags (max 255 characters) */
  tags?: string
  /** View count */
  viewsCount: number
}

export interface Student {
  /** Student ID */
  studentID: string
  /** Full name */
  fullName: string
  /** Email address */
  email: string
  /** Password hash */
  passwordHash: string
  /** Account balance */
  balance: number
  /** Is VIP status */
  isVIP: boolean
  /** VIP expiration date */
  vipExpiryDate?: string
  /** Registration date */
  registrationDate: string
}

export interface StudentInfo {
  /** Student ID */
  studentID: string
  /** Student name */
  name: string
  /** Email address */
  email: string
  /** Account balance */
  balance: number
  /** Is VIP status */
  isVIP: boolean
  /** VIP end date */
  vipEndDate?: string
  /** Last updated date */
  updatedAt: string
}

export interface BalanceResponse {
  /** Student ID */
  studentID: string
  /** Account balance */
  balance: number
  /** Formatted balance string */
  formattedBalance: string
}

export interface Transaction {
  /** Transaction ID (UUID) */
  transactionID: string
  /** Student ID */
  studentID: string
  /** Document ID (optional) */
  documentID?: string
  /** Transaction amount */
  amount: number
  /** Transaction type */
  type: TransactionType
  /** Transaction date */
  transactionDate: string
  /** Transaction note */
  note?: string
  /** Transaction status */
  status: string
}

export interface LoginResponse {
  /** JWT token */
  token: string
  /** User information */
  user: {
    studentId: string
    email: string
    name: string
    isVIP: boolean
    balance: number
  }
}

export interface ApiResponse<T = any> {
  /** Success status */
  success: boolean
  /** Response message */
  message?: string
  /** Response data */
  data?: T
  /** Error details */
  errors?: string[]
}

// ============================================================================
// API ERROR TYPES
// ============================================================================

export interface ApiError {
  /** HTTP status code */
  status: number
  /** Error message */
  message: string
  /** Additional error data */
  data?: any
}

export class ApiException extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message)
    this.name = "ApiException"
  }
}
