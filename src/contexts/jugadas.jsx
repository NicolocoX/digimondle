import { createContext } from "react";
import useJugadas from "../hooks/useJugadas";


export const JugadasContext = createContext()


export function JugadasProvider({ children }) {
  const {
    jugadas,
    agregarJugada,
    limpiarJugadas
  } = useJugadas()


  return (
    <JugadasContext.Provider value={{
      jugadas,
      agregarJugada,
      limpiarJugadas,
    }}>
      {children}
    </JugadasContext.Provider>
  )
}