import "./ResultadoCascada.css"

export default function ResultadoCascada({ resultado }) {
  return (
    <div className="resultado-cascada">
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}