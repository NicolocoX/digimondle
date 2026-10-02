import { useContext } from "react"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import Debugueador from "./components/Debugueador"
import './styles/Buscador.css'
import { PartidaContext } from "./contexts/partida"
import Controles from "./components/Controles"


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