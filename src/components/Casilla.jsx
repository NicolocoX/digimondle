import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) {
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