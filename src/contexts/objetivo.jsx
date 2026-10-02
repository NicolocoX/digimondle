import { createContext } from "react";
import useObjetivo from "../hooks/useObjetivo";

export const ObjetivoContext = createContext()

export function ObjetivoProvider({ children }) {
  const {
    objetivo,
    cambiarObjetivo
  } = useObjetivo()

  return (
    <ObjetivoContext.Provider value={{
      objetivo,
      cambiarObjetivo
    }}>
      {children}
    </ObjetivoContext.Provider>
  )
}