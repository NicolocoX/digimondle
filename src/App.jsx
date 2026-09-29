import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import confetti from "@hiseb/confetti"
import useJugadas from "./hooks/useJugadas"
import usePartida from "./hooks/usePartida"
import useObjetivo from "./hooks/useObjetivo"


export default function App() {
  const {
    objetivo,
    getObjetivo
  } = useObjetivo()

  const {
    jugadas,
    agregarJugada,
    limpiarJugadas
  } = useJugadas()

  const {
    partidaGanada,
    finPartida,
    rendirse,
    reiniciarPartida,
    ganar
  } = usePartida()


  const jugar = async (jugada) => {
    const newDigimon = await agregarJugada(jugada)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      ganar()
    }
  }


  const reiniciar = async () => {
    await getObjetivo()
    limpiarJugadas()
    reiniciarPartida()
  }


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador
        manejarJugada={jugar}
        jugadas={jugadas}
        reiniciar={reiniciar}
        rendirse={rendirse}
        finPartida={finPartida}
        partidaGanada={partidaGanada} />

      {finPartida && <Resultado partidaGanada={partidaGanada} imagen={objetivo.imagen} nombre={objetivo.nombre} />}

      <Jugadas jugadas={jugadas} objetivo={objetivo} />

      {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={confetti}>prueba</button>
    </main>
  )
}