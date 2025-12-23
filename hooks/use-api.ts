/**
 * React Hook for API calls with loading, error handling, and caching
 * Provides a consistent pattern for data fetching across the application
 */

import { useState, useEffect, useCallback } from "react"

interface UseApiOptions<T> {
  /** Initial data value */
  initialData?: T
  /** Whether to fetch immediately on mount */
  immediate?: boolean
  /** Cache key for memoization */
  cacheKey?: string
  /** Cache duration in milliseconds */
  cacheDuration?: number
}

interface UseApiResult<T> {
  /** Response data */
  data: T | null
  /** Loading state */
  loading: boolean
  /** Error object if request failed */
  error: Error | null
  /** Execute the API call */
  execute: (...args: any[]) => Promise<T | null>
  /** Reset state to initial */
  reset: () => void
  /** Refetch with same parameters */
  refetch: () => Promise<T | null>
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const { initialData = null, immediate = false, cacheKey, cacheDuration = 5 * 60 * 1000 } = options

  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastArgs, setLastArgs] = useState<any[]>([])

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setLastArgs(args)
      
      // Check cache
      if (cacheKey) {
        const cached = cache.get(cacheKey)
        if (cached && Date.now() - cached.timestamp < cacheDuration) {
          setData(cached.data)
          setError(null)
          return cached.data
        }
      }

      setLoading(true)
      setError(null)

      try {
        const result = await apiFunction(...args)
        setData(result)
        
        // Store in cache
        if (cacheKey) {
          cache.set(cacheKey, { data: result, timestamp: Date.now() })
        }
        
        return result
      } catch (err: any) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        setData(null)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, cacheKey, cacheDuration]
  )

  const refetch = useCallback(async () => {
    return execute(...lastArgs)
  }, [execute, lastArgs])

  const reset = useCallback(() => {
    setData(initialData)
    setLoading(false)
    setError(null)
    setLastArgs([])
  }, [initialData])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, []) // Only run on mount

  return { data, loading, error, execute, reset, refetch }
}

/**
 * Hook for API calls that require authentication
 * Automatically handles token and redirects on auth errors
 */
export function useAuthApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const result = useApi(apiFunction, options)

  useEffect(() => {
    if (result.error) {
      const apiError = result.error as any
      // Redirect to login if unauthorized
      if (apiError.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }
    }
  }, [result.error])

  return result
}

/**
 * Clear all cached data
 */
export function clearApiCache() {
  cache.clear()
}

/**
 * Clear specific cache entry
 */
export function clearCacheKey(key: string) {
  cache.delete(key)
}
