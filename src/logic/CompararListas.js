export default function compararListas(lista1, lista2) {
  let count = 0
  for (const elemento of lista1) {
    if (lista2.includes(elemento)) count++
  }

  if (lista1.length === lista2.length && count === lista2.length) {
    return " correcta"
  } else if (count > 0) {
    return " semi-correcta"
  } else {
    return " incorrecta"
  }
}