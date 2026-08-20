export default async function getDatosAPI(url) {
  const response = await fetch(url)
  const data = await response.json()

  return data
}