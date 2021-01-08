type Timer = ReturnType<typeof setTimeout>
type CacheKey = string
type CacheData = {
  data: any
  timer: Timer | undefined
  startTime: number
}

const cache = new Map<CacheKey, CacheData>()

export function getCache(
  key: CacheKey
): Pick<CacheData, Exclude<keyof CacheData, 'timer'>> {
  const cached = cache.get(key)
  return {
    data: cached?.data,
    startTime: cached?.startTime as number
  }
}

export function setCache(key: CacheKey, data: any, cacheTime: number): void {
  const cached = cache.get(key)
  if (cached?.timer) {
    clearTimeout(cached.timer)
  }
  let timer: Timer | undefined
  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key)
    }, cacheTime)
  }

  cache.set(key, {
    data: data,
    timer,
    startTime: new Date().getTime()
  })
}
