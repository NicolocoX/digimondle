import { useContext } from "react"
import Jugadas from "./components/Jugadas/Jugadas"
import Resultado from "./components/Resultado"
import Debugueador from "./components/Debugueador"
import { PartidaContext } from "./contexts/partida"
import Controles from "./components/Controles/Controles"


export default function App() {
  const {
    finPartida
  } = useContext(PartidaContext)


  return (
    <main>
      <h1>Digimondle</h1>
      <Controles />
      {finPartida && <Resultado />}
      <Jugadas />
      <Debugueador />
    </main>
  )
}