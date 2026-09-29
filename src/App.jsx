import { useContext } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import confetti from "@hiseb/confetti"
import { JuegoContext } from "./contexts/juego"


export default function App() {
  const {
    objetivo,
    jugadas,
    partidaGanada,
    finPartida,
  } = useContext(JuegoContext)


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador />

      {finPartida && <Resultado partidaGanada={partidaGanada} imagen={objetivo.imagen} nombre={objetivo.nombre} />}

      <Jugadas jugadas={jugadas} objetivo={objetivo} />

      {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={confetti}>prueba</button>
    </main>
  )
}