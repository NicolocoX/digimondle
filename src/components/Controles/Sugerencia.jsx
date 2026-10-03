import { memo } from "react"
import "../../styles/controles/Sugerencia.css"
import useJugar from "../../hooks/useJugar"

function Sugerencia({ sugerencia, limpiarBuscador }) {
  const { jugar } = useJugar()


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