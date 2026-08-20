import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) {
  return (
    <div className={`casilla${tipo}`}>{children}</div>
  )
}