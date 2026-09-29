import { memo, useContext } from "react"
import "../styles/ResultadoCascada.css"
import { JuegoContext } from "../contexts/juego"

function ResultadoCascada({ resultado, limpiarBuscador }) {
  const { jugar } = useContext(JuegoContext)


  const handleClick = (digimon) => {
    limpiarBuscador()
    jugar(digimon)
  }


  return (
    <div className="resultado-cascada" onClick={() => handleClick(resultado.href)}>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}

export default memo(ResultadoCascada)