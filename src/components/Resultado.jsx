import { useContext, useRef } from "react"
import "../styles/Resultado.css"
import { ObjetivoContext } from "../contexts/objetivo"
import { PartidaContext } from "../contexts/partida"
import autoDesplazamiento from "../logic/autoDesplazamiento"


export default function Resultado() {
  const { partidaGanada } = useContext(PartidaContext)
  const { objetivo } = useContext(ObjetivoContext)
  const resultadoRef = useRef()


  return (
    <div
      className={`resultado${partidaGanada ? " victoria" : " derrota"}`}
      ref={resultadoRef}>

      <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>

      <img src={objetivo.imagen} alt={objetivo.nombre} onLoad={() => autoDesplazamiento(resultadoRef)} />

      <span>
        {partidaGanada ? "Encontraste a " : "Tu objetivo era "}
        <strong>{objetivo.nombre}</strong>
      </span>

    </div>
  )
}