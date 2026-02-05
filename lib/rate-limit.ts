import { NextRequest } from 'next/server'

interface RateLimitConfig {
  limit: number
  windowMs: number
}

interface RateLimitStore {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

export function rateLimit(key: string, config: RateLimitConfig) {
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return { success: true }
  }

  record.count += 1
  if (record.count > config.limit) {
    return { success: false }
  }

  return { success: true }
}

const GLOBAL_LIMIT = 500
const GLOBAL_WINDOW = 60 * 1000 // 1 minute

export async function checkRateLimit(request: NextRequest | Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const result = rateLimit(ip, { limit: GLOBAL_LIMIT, windowMs: GLOBAL_WINDOW })

  return { rateLimited: !result.success }
}
