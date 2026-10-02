import { useContext } from "react"
import "../styles/Resultado.css"
import { JuegoContext } from "../contexts/juego"
import { ObjetivoContext } from "../contexts/objetivo"


export default function Resultado() {
  const { partidaGanada } = useContext(JuegoContext)
  const { objetivo } = useContext(ObjetivoContext)


  return (
    <div className="resultado">
      <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>
      <img src={objetivo.imagen} alt={objetivo.nombre} />
      <span>{partidaGanada ? "Encontraste a " : "Tu objetivo era "}{objetivo.nombre}</span>
    </div>
  )
}