import { useState } from "react"
import confetti from "@hiseb/confetti"

export default function usePartida() {
  const [partidaGanada, setPartidaGanada] = useState(false)
  const [finPartida, setFinPartida] = useState(false)


  const ganar = () => {
    confetti()
    setPartidaGanada(true)
    setFinPartida(true)
  }


  const rendirse = () => setFinPartida(true)


  const reiniciarPartida = () => {
    setFinPartida(false)
    setPartidaGanada(false)
  }


  return { partidaGanada, finPartida, rendirse, reiniciarPartida, ganar }
}