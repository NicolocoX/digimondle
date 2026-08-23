import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) { // revisar casos piyomon beelzebumon post inclusión imágenes
  const esLista = Array.isArray(children)
  const esTexto = (esLista && (typeof children[0] === "string"))

  const contenido = (esLista && esTexto)
    ? children.join("\n")
    : children

  const contenidoLargo = (esLista && children.length > 5)
    ? "contenido-largo"
    : ""

  return (
    <div className={`casilla${tipo}`}>
      <div className={contenidoLargo}>
        {contenido}
      </div>
    </div>
  )
}