import { useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"

export default function App() {
  const [jugadas, setJugadas] = useState([])
  const [objetivo, setObjetivo] = useState(null)


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


  const agregarJugada = async (jugada) => {
    const digimon = await getDatosAPI(jugada)

    setJugadas(estadoAnt => [infoRelevante(digimon), ...estadoAnt])
  }


  const infoRelevante = (digimon) => {
    if (!digimon) return null

    const nombre = digimon.name
    const imagen = digimon.images[0].href
    const nivel = digimon.levels.length ? getListaDatos(digimon.levels, "level") : "Sin información"
    const atributo = digimon.attributes.length ? getListaDatos(digimon.attributes, "attribute") : "Sin información"
    const campo = digimon.fields.length ? getListaDatos(digimon.fields, "field") : "Sin información"
    const tipo = digimon.types.length ? getListaDatos(digimon.types, "type") : "Sin información"
    const año = digimon.releaseDate

    return {
      nombre: nombre,
      imagen: imagen,
      nivel: nivel,
      atributo: atributo,
      campo: campo,
      tipo: tipo,
      año: año
    }
  }


  const getListaDatos = (lista, campo) => {
    let resultados = []
    for (const elemento of lista) {
      resultados = [...resultados, elemento[campo]]
    }

    return resultados
  }


  return (
    <main>
      <h1>Digimondle</h1>
      <Buscador agregarJugada={agregarJugada} jugadas={jugadas} />
      <Jugadas jugadas={jugadas} objetivo={objetivo} />
    </main>
  )
}