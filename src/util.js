/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

/**
 * Given an object, returns a new object containing only
 * allowed keys
 * @param {array} keys - Array of allowed keys
 * @param {object} obj - Original Object
 * @returns {object} Object containing only allowed keys
 */
export function filterByKeys(keys, raw) {
  return keys.reduce((obj, key) => (raw[key] ? { ...obj, [key]: raw[key] } : obj), {})
}

/**
 * Returns a new list without values in the first argument
 * @param {array} keys - Array of keys to be removed
 * @param {object} obj - Original Object
 * @returns {object} Object containing only allowed keys
 */
export function removeKeys(arr, obj) {
  const clone = { ...obj }
  arr.forEach(function(key) {
    delete clone[key]
  })
  return clone
}

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 * @param {object} keys - Mapping object
 * @param {object} obj - Original Object
 * @returns {object} Object with renamed keys
 */
export function renameKeys(keysMap, obj) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = keysMap[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}
