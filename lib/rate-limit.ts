export type RateLimitConfig = {
  limit: number
  windowMs: number
}

const trackers = new Map<string, { count: number; expiresAt: number }>()

export function rateLimit(key: string, config: RateLimitConfig) {
  const now = Date.now()
  const record = trackers.get(key)

  if (!record || now > record.expiresAt) {
    trackers.set(key, {
      count: 1,
      expiresAt: now + config.windowMs,
    })
    return { success: true }
  }

  if (record.count >= config.limit) {
    return { success: false }
  }

  record.count++
  return { success: true }
}

setInterval(() => {
  const now = Date.now()
  for (const [key, record] of trackers.entries()) {
    if (now > record.expiresAt) {
      trackers.delete(key)
    }
  }
}, 60000)
