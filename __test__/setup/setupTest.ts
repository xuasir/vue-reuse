/* eslint-disable no-undef */
let state: Record<string, any> = {}

const localStorageMock = {
  getItem: jest.fn((x) => state[x]),
  setItem: jest.fn((x, v) => (state[x] = v)),
  removeItem: jest.fn((x) => delete state[x]),
  clear: jest.fn(() => (state = {}))
}
const sessionStorageMock = {
  getItem: jest.fn((x) => state[x]),
  setItem: jest.fn((x, v) => (state[x] = v)),
  removeItem: jest.fn((x) => delete state[x]),
  clear: jest.fn(() => (state = {}))
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

// ---- patch fetch
Object.defineProperty(window, 'fetch', {
  value: (url: string, { error }: { error: string } = { error: '' }) =>
    new Promise((resolve) => {
      const res = error
        ? {
            ok: false,
            statusText: error
          }
        : {
            ok: true,
            json() {
              return url
            }
          }
      setTimeout(() => {
        resolve(res)
      }, 100)
    })
})
