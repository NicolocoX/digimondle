import { useContext } from "react"
import Jugadas from "./components/Jugadas/Jugadas"
import Resultado from "./components/Resultado"
import Debugueador from "./components/Debugueador"
import { PartidaContext } from "./contexts/partida"
import Controles from "./components/Controles/Controles"
import Bienvenida from "./components/Bienvenida"
import solSVG from "./assets/tema/sol.svg"



export default function App() {
  const {
    finPartida
  } = useContext(PartidaContext)


  return (
    <main>
      <h1>Digimondle</h1>
      <Bienvenida />
      <Controles />
      {finPartida && <Resultado />}
      <Jugadas />
      <Debugueador />
      <img src={solSVG} />
    </main>
  )
}