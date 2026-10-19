import { useContext, useEffect, useRef } from "react"
import "../styles/Resultado.css"
import { ObjetivoContext } from "../contexts/objetivo"
import { PartidaContext } from "../contexts/partida"


export default function Resultado() {
  const { partidaGanada } = useContext(PartidaContext)
  const { objetivo } = useContext(ObjetivoContext)
  const resultadoRef = useRef()


  useEffect(() => {
    resultadoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  }, [])



  return (
    <div
      className={`resultado${partidaGanada ? " victoria" : " derrota"}`}
      ref={resultadoRef}>

      <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>

      <img src={objetivo.imagen} alt={objetivo.nombre} />

      <span>
        {partidaGanada ? "Encontraste a " : "Tu objetivo era "}
        <strong>{objetivo.nombre}</strong>
      </span>

    </div>
  )
}