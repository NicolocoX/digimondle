import { useContext } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import { JuegoContext } from "./contexts/juego"
import Debugueador from "./components/Debugueador"
import './styles/Buscador.css'
import { ObjetivoContext } from "./contexts/objetivo"


export default function App() {
  const {
    finPartida,
    partidaGanada,
    rendirse,
    limpiarJugadas,
    reiniciarPartida
  } = useContext(JuegoContext)

  const { cambiarObjetivo } = useContext(ObjetivoContext)

  const reiniciar = async () => {
    await cambiarObjetivo()
    limpiarJugadas()
    reiniciarPartida()
  }


  return (
    <main>
      <h1>Digimondle</h1>
      <div className="buscador">
        <Buscador />
        <button onClick={rendirse} type="button" disabled={finPartida || partidaGanada}>Rendirse</button>
        <button onClick={reiniciar} type="button">Reiniciar</button>
      </div>
      {finPartida && <Resultado />}
      <Jugadas />
      <Debugueador />
    </main>
  )
}