import { createContext } from "react";
import useObjetivo from "../hooks/useObjetivo";
import useJugadas from "../hooks/useJugadas";
import usePartida from "../hooks/usePartida";


export const JuegoContext = createContext()


export function JuegoProvider({ children }) {
  const {
    objetivo,
    cambiarObjetivo
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


  const jugar = async (url) => {
    const newDigimon = await agregarJugada(url)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      ganar()
    }
  }


  return (
    <JuegoContext.Provider value={{
      objetivo,
      cambiarObjetivo,
      jugadas,
      agregarJugada,
      limpiarJugadas,
      partidaGanada,
      finPartida,
      rendirse,
      reiniciarPartida,
      ganar,
      jugar
    }}>
      {children}
    </JuegoContext.Provider>
  )
}