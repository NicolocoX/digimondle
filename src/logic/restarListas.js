export default function restarListas (lista, filtro) {
  return lista.filter(
    elementoA => !filtro.some(
      elementoB => elementoB.id === elementoA.id
    ))
}