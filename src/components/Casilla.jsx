import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) {
  const texto = Array.isArray(children)
    ? children.join("\n")
    : children

  const contenidoLargo = (Array.isArray(children) && children.length > 5)
    ? "contenido-largo"
    : ""

  return (
    <div className={`casilla${tipo}`}>
      <div className={contenidoLargo}>
        {texto}
      </div>
    </div >
  )
}