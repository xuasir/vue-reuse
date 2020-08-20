/* eslint-disable no-undef */
let state = {}

const localStorageMock = {
  getItem: jest.fn((x) => state[x]),
  setItem: jest.fn((x, v) => (state[x] = v)),
  removeItem: jest.fn((x) => delete state[x]),
  clear: jest.fn(() => (state = {})),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
