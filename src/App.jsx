import { useContext } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import confetti from "@hiseb/confetti"
import { JuegoContext } from "./contexts/juego"


export default function App() {
  const {
    objetivo,
    finPartida,
  } = useContext(JuegoContext)


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador />

      {finPartida && <Resultado />}

      <Jugadas />

      {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={confetti}>prueba</button>
    </main>
  )
}