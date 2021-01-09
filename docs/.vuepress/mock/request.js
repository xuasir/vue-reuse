export const service = (p) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(p)
    }, 2000)
  })

export const serviceError = (p) =>
  new Promise < ((_, reject) => {
    setTimeout(() => {
      reject(p)
    }, 2000)
  })