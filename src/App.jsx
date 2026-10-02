import { useContext } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import { JugadasContext } from "./contexts/jugadas"
import Debugueador from "./components/Debugueador"
import './styles/Buscador.css'
import { ObjetivoContext } from "./contexts/objetivo"
import { PartidaContext } from "./contexts/partida"


export default function App() {
  const { limpiarJugadas } = useContext(JugadasContext)

  const { cambiarObjetivo } = useContext(ObjetivoContext)

  const {
    partidaGanada,
    finPartida,
    rendirse,
    reiniciarPartida
  } = useContext(PartidaContext)


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