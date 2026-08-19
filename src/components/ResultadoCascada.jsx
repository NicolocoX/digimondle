import "./ResultadoCascada.css"

export default function ResultadoCascada({ resultado, agregarJugada, setMostrarCascada, setTexto }) {
  const handleClick = (digimon) => {
    setMostrarCascada(false)
    setTexto("")
    agregarJugada(digimon)
  }

  return (
    <div className="resultado-cascada" onClick={() => handleClick(resultado.href)}>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}