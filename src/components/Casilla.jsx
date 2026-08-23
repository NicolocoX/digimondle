import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) { // revisar casos piyomon beelzebumon post inclusión imágenes
  const esLista = Array.isArray(children)
  const esTexto = (esLista && (typeof children[0] === "string"))

  const contenido = (esLista && esTexto)
    ? children.join("\n")
    : children

  return (
    <div className={`casilla${tipo}`}>
      {contenido}
    </div>
  )
}