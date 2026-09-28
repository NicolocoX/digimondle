import { memo } from "react"
import "../styles/ResultadoCascada.css"

function ResultadoCascada({ resultado, manejarJugada, limpiarBuscador }) {
  const handleClick = (digimon) => {
    limpiarBuscador()
    manejarJugada(digimon)
  }


  return (
    <div className="resultado-cascada" onClick={() => handleClick(resultado.href)}>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}

export default memo(ResultadoCascada)