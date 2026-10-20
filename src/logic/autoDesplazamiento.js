export default function autoDesplazamiento(ref) {
  const elemento = ref.current
  if (!elemento) return

  const rect = elemento.getBoundingClientRect()
  const esVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
  if (esVisible) return

  elemento.scrollIntoView({
    block: "nearest",
    behavior: "smooth"
  })
}