import { createContext } from "react";
import useObjetivo from "../hooks/useObjetivo";

export const ObjetivoContext = createContext()

export function ObjetivoProvider({ children }) {
  const {
    objetivo,
    cargandoObjetivo,
    cambiarObjetivo
  } = useObjetivo()

  return (
    <ObjetivoContext.Provider value={{
      objetivo,
      cargandoObjetivo,
      cambiarObjetivo
    }}>
      {children}
    </ObjetivoContext.Provider>
  )
}