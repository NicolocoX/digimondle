import { memo } from "react"
import "./ResultadoCascada.css"

function ResultadoCascada({ resultado, agregarJugada, limpiarBuscador }) {
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

export default memo(ResultadoCascada)