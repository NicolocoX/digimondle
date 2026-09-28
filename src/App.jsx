import { useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import Resultado from "./components/Resultado"
import getDatosAPI from "./services/getDatosAPI"
import confetti from "@hiseb/confetti"
import infoRelevante from "./logic/infoRelevante"
import useJugadas from "./hooks/useJugadas"


export default function App() {
  const [objetivo, setObjetivo] = useState(null)
  const [partidaGanada, setPartidaGanada] = useState(false)
  const [finPartida, setFinPartida] = useState(false)
  const { jugadas, setJugadas, agregarJugada } = useJugadas({ finPartida, objetivo, setPartidaGanada, setFinPartida })


  const getDataGeneral = async () => {
    const data = await getDatosAPI("https://digi-api.com/api/v1/digimon?pageSize=1")
    const total = data.pageable.totalElements

    const idRandom = Math.floor(Math.random() * total) + 1
    const digimon = await getDatosAPI(`https://digi-api.com/api/v1/digimon/${idRandom}`)
    setObjetivo(infoRelevante(digimon))
    // console.log(infoRelevante(digimon).nombre)
    // console.log(infoRelevante(digimon).id)
  }


  useEffect(() => { //Obtiene al digimon objetivo
    getDataGeneral()
  }, [])


  const reiniciar = async () => {
    await getDataGeneral()
    setJugadas([])
    setFinPartida(false)
    setPartidaGanada(false)
  }


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador
        agregarJugada={agregarJugada}
        jugadas={jugadas}
        reiniciar={reiniciar}
        setFinPartida={setFinPartida}
        finPartida={finPartida}
        partidaGanada={partidaGanada} />

      {finPartida && <Resultado partidaGanada={partidaGanada} imagen={objetivo.imagen} nombre={objetivo.nombre} />}

      <Jugadas jugadas={jugadas} objetivo={objetivo} />

      {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={confetti}>prueba</button>
    </main>
  )
}