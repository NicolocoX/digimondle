import { useState, useCallback } from "react"
import getDatosAPI from "../services/getDatosAPI"
import infoRelevante from "../logic/infoRelevante"


export default function useJugadas() {
  const [jugadas, setJugadas] = useState([])


  const agregarJugada = useCallback(async (url) => {
    const digimon = await getDatosAPI(url)
    const newDigimon = infoRelevante(digimon)

    setJugadas(estadoAnt => [...estadoAnt, newDigimon])
    return newDigimon
  }, [])


  const limpiarJugadas = () => setJugadas([])


  return { 
    jugadas, 
    agregarJugada, 
    limpiarJugadas
  }
}