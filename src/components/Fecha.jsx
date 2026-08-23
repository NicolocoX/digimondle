import "./Fecha.css"

export default function Fecha({ año, dirección }) {
  return (
    <div className={`fecha ${dirección}`}>
      {año}
    </div>
  )
}