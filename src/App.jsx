import { useContext } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import { JuegoContext } from "./contexts/juego"
import Debugueador from "./components/Debugueador"


export default function App() {
  const { finPartida } = useContext(JuegoContext)


  return (
    <main>
      <h1>Digimondle</h1>
      <Buscador />
      {finPartida && <Resultado />}
      <Jugadas />
      <Debugueador />
    </main>
  )
}