import { createContext } from "react";
import usePartida from "../hooks/usePartida";

export const PartidaContext = createContext()

export function PartidaProvider({ children }) {
  const {
    partidaGanada,
    finPartida,
    rendirse,
    reiniciarPartida,
    ganar
  } = usePartida()


  return (
    <PartidaContext.Provider value={{
      partidaGanada,
      finPartida,
      rendirse,
      reiniciarPartida,
      ganar
    }}>
      {children}
    </PartidaContext.Provider>
  )
}