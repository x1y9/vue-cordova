export function jsonParse (value) {
  try {
    return JSON.parse(value)
  }
  catch (e) {
    console.error(e)
    return null
  }
}
