import { memo, useContext } from "react"
import "../styles/Sugerencia.css"
import { JuegoContext } from "../contexts/juego"

function Sugerencia({ sugerencia, limpiarBuscador }) {
  const {
    agregarJugada,
    objetivo,
    finPartida,
    ganar
  } = useContext(JuegoContext)


  const jugar = async (url) => {
    const newDigimon = await agregarJugada(url)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      ganar()
    }
  }


  const handleClick = (url) => {
    limpiarBuscador()
    jugar(url)
  }


  return (
    <div className="sugerencia" onClick={() => handleClick(sugerencia.href)}>
      <img src={sugerencia.image} />
      <span>{sugerencia.name}</span>
    </div>
  )
}

export default memo(Sugerencia)