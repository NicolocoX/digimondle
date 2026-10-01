import { memo, useContext } from "react"
import "../styles/Sugerencia.css"
import { JuegoContext } from "../contexts/juego"

function Sugerencia({ sugerencia, limpiarBuscador }) {
  const { jugar } = useContext(JuegoContext)


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