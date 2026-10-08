import { useContext } from "react"
import "../styles/Resultado.css"
import { ObjetivoContext } from "../contexts/objetivo"
import { PartidaContext } from "../contexts/partida"


export default function Resultado() {
  const { partidaGanada } = useContext(PartidaContext)
  const { objetivo } = useContext(ObjetivoContext)


  return (
    <div className={`resultado${partidaGanada ? " victoria" : " derrota"}`}>
      <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>
      <img src={objetivo.imagen} alt={objetivo.nombre} />
      <span>
        {partidaGanada ? "Encontraste a " : "Tu objetivo era "}
        <strong>{objetivo.nombre}</strong>
      </span>
    </div>
  )
}