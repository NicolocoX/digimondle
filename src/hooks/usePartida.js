import { useState } from "react"
import confetti from "@hiseb/confetti"

export default function usePartida({ objetivo, agregarJugada }) {
  const [partidaGanada, setPartidaGanada] = useState(false)
  const [finPartida, setFinPartida] = useState(false)


  const manejarJugada = async (jugada) => {
    const newDigimon = await agregarJugada(jugada)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      confetti()
      setPartidaGanada(true)
      setFinPartida(true)
    }
  }


  const rendirse = () => setFinPartida(true)


  const reiniciarPartida = () => {
    setFinPartida(false)
    setPartidaGanada(false)
  }


  return { partidaGanada, finPartida, manejarJugada, rendirse, reiniciarPartida }
}