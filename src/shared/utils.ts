export const isBrowser = typeof window !== 'undefined'

export function createStorage(): Storage {
  let state: Record<string, any> = {}
  return {
    getItem: (x) => state[x],
    setItem: (x, v) => (state[x] = v),
    removeItem: (x) => delete state[x],
    clear: () => (state = {}),
    length: Object.keys(state).length,
    key: (index) => Object.keys(state)[index],
  }
}
