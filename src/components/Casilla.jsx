import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) {
  return (
    <div className={`casilla${tipo}`}>
      {Array.isArray(children) ? "\n" + children.join("\n") : children}
    </div>
  )
}