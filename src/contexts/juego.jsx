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
      ganar
    }}>
      {children}
    </JuegoContext.Provider>
  )
}