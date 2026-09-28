import { useState, useCallback } from "react"
import getDatosAPI from "../services/getDatosAPI"
import infoRelevante from "../logic/infoRelevante"
import confetti from "@hiseb/confetti"


export default function useJugadas({ finPartida, objetivo, setPartidaGanada, setFinPartida }) {
  const [jugadas, setJugadas] = useState([])


  const agregarJugada = useCallback(async (jugada) => {
    const digimon = await getDatosAPI(jugada)
    const newDigimon = infoRelevante(digimon)

    setJugadas(estadoAnt => [...estadoAnt, newDigimon])

    if (!finPartida && newDigimon.id === objetivo.id) {
      confetti()
      setPartidaGanada(true)
      setFinPartida(true)
    }
  }, [objetivo, finPartida])

  return { jugadas, setJugadas, agregarJugada }
}