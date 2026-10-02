import { createContext } from "react";
import useJugadas from "../hooks/useJugadas";


export const JuegoContext = createContext()


export function JuegoProvider({ children }) {
  const {
    jugadas,
    agregarJugada,
    limpiarJugadas
  } = useJugadas()


  return (
    <JuegoContext.Provider value={{
      jugadas,
      agregarJugada,
      limpiarJugadas,
    }}>
      {children}
    </JuegoContext.Provider>
  )
}