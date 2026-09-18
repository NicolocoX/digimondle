import { useCallback, useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"
import confetti from "@hiseb/confetti"
import Resultado from "./components/Resultado"


const infoRelevante = (digimon) => {
  if (!digimon) return null

  const id = digimon.id
  const nombre = digimon.name
  const imagen = digimon.images[0].href
  const nivel = digimon.levels.length
    ? getListaDatos(digimon.levels, "level")
    : ["Sin información"]
  const atributo = digimon.attributes.length
    ? getListaDatos(digimon.attributes, "attribute")
    : []
  const campo = digimon.fields.length
    ? getListaDatos(digimon.fields, "id")
    : []
  const tipo = digimon.types.length
    ? getListaDatos(digimon.types, "type")
    : ["Sin información"]
  const año = digimon.releaseDate

  return {
    id,
    nombre,
    imagen,
    nivel,
    atributo,
    campo,
    tipo,
    año
  }
}


const getListaDatos = (lista, campo) => lista.map((elemento) => elemento[campo])



export default function App() {
  const [objetivo, setObjetivo] = useState(null)
  const [jugadas, setJugadas] = useState([])
  const [partidaGanada, setPartidaGanada] = useState(false)
  const [finPartida, setFinPartida] = useState(false)


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


  const agregarJugada = useCallback(async (jugada) => {
    const digimon = await getDatosAPI(jugada)
    const newDigimon = infoRelevante(digimon)

    setJugadas(estadoAnt => [...estadoAnt, newDigimon])

    if (!finPartida && newDigimon.id === objetivo.id) {
      confetti()
      setPartidaGanada(true)
      setFinPartida(true)
    }
  }, [objetivo, finPartida])


  const reiniciar = async () => {
    await getDataGeneral()
    setJugadas([])
    setFinPartida(false)
    setPartidaGanada(false)
  }


  const rendirse = async () => {
    setFinPartida(true)
  }


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador
        agregarJugada={agregarJugada}
        jugadas={jugadas}
        reiniciar={reiniciar}
        rendirse={rendirse}
        finPartida={finPartida}
        partidaGanada={partidaGanada} />

      {finPartida && <Resultado partidaGanada={partidaGanada} imagen={objetivo.imagen} nombre={objetivo.nombre} />}

      <Jugadas jugadas={jugadas} objetivo={objetivo} />

      {/* {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={confetti}>prueba</button> */}
    </main>
  )
}