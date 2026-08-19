import "./ResultadoCascada.css"

export default function ResultadoCascada({ resultado, agregarJugada, limpiarBuscador }) {
  const handleClick = (digimon) => {
    limpiarBuscador()
    agregarJugada(digimon)
  }

  return (
    <div className="resultado-cascada" onClick={() => handleClick(resultado.href)}>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}