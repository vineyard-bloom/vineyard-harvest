
export function promiseEach(items, action) {
  if (items.length == 0)
    return Promise.resolve()

  let result = action(items[0])
  for (let i = 1; i < items.length; ++i) {
    result = result
      .then(() => action(items[i]))
  }

  return result
}