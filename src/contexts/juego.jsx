import { createContext } from "react";
import useObjetivo from "../hooks/useObjetivo";
import useJugadas from "../hooks/useJugadas";
import usePartida from "../hooks/usePartida";


export const JuegoContext = createContext()


export function JuegoProvider({ children }) {
  const {
    objetivo,
    getObjetivo
  } = useObjetivo()

  const {
    jugadas,
    agregarJugada,
    limpiarJugadas
  } = useJugadas()

  const {
    partidaGanada,
    finPartida,
    rendirse,
    reiniciarPartida,
    ganar
  } = usePartida()


  const jugar = async (jugada) => {
    const newDigimon = await agregarJugada(jugada)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      ganar()
    }
  }


  const reiniciar = async () => {
    await getObjetivo()
    limpiarJugadas()
    reiniciarPartida()
  }

  return (
    <JuegoContext.Provider value={{
      objetivo,
      getObjetivo,
      jugadas,
      agregarJugada,
      limpiarJugadas,
      partidaGanada,
      finPartida,
      rendirse,
      reiniciarPartida,
      ganar,
      jugar,
      reiniciar
    }}>
      {children}
    </JuegoContext.Provider>
  )
}