import "./ResultadoCascada.css"

export default function ResultadoCascada({ resultado }) {
  const handleClick = () => {
    console.log("wena")
  }

  return (
    <div className="resultado-cascada" onClick={handleClick}>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}