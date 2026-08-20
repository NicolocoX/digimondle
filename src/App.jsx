import { useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"

export default function App() {
  const [jugadas, setJugadas] = useState([])
  const [objetivo, setObjetivo] = useState(null)


  useEffect(() => {
    const getDataGeneral = async () => {
      const data = await getDatosAPI("https://digi-api.com/api/v1/digimon?pageSize=1")
      const total = data.pageable.totalElements

      const idRandom = Math.floor(Math.random() * total) + 1
      const digimon = await getDatosAPI(`https://digi-api.com/api/v1/digimon/${idRandom}`)
      setObjetivo(digimon)
    }

    getDataGeneral()
  }, [])


  const agregarJugada = async (jugada) => {
    const digimon = await getDatosAPI(jugada)

    setJugadas(estadoAnt => [digimon, ...estadoAnt])
  }


  return (
    <main>
      <h1>Digimondle</h1>
      <Buscador agregarJugada={agregarJugada} jugadas={jugadas} />
      <Jugadas jugadas={jugadas} objetivo={objetivo} />
    </main>
  )
}