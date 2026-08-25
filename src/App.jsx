import { useCallback, useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"
import AnuncioGanador from "./components/AnuncioGanador"
import confetti from "@hiseb/confetti"


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
    : ["Sin información"]
  const campo = digimon.fields.length
    ? getListaDatos(digimon.fields, "id")
    : [0]
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
  const [finPartida, setFinPartida] = useState(false)


  useEffect(() => { // obtiene al digimon objetivo
    const getDataGeneral = async () => {
      const data = await getDatosAPI("https://digi-api.com/api/v1/digimon?pageSize=1")
      const total = data.pageable.totalElements

      const idRandom = Math.floor(Math.random() * total) + 1
      const digimon = await getDatosAPI(`https://digi-api.com/api/v1/digimon/${idRandom}`)
      setObjetivo(infoRelevante(digimon))
      console.log(infoRelevante(digimon))
    }

    getDataGeneral()
  }, [])


  const agregarJugada = useCallback(async (jugada) => {
    const digimon = await getDatosAPI(jugada)
    const newDigimon = infoRelevante(digimon)

    setJugadas(estadoAnt => [...estadoAnt, newDigimon])

    if (newDigimon.id === objetivo.id) {
      setFinPartida(true)
      confetti()
    }
  }, [objetivo])


  return (
    <main>
      <h1>Digimondle</h1>
      <Buscador agregarJugada={agregarJugada} jugadas={jugadas} />
      <Jugadas jugadas={jugadas} objetivo={objetivo} />
      {finPartida && <AnuncioGanador
        nombre={objetivo.nombre}
        imagen={objetivo.imagen}
        setFinPartida={setFinPartida} />}
    </main>
  )
}