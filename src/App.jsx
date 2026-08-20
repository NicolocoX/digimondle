import { useEffect, useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"

export default function App() {
  const [jugadas, setJugadas] = useState([])
  const [totalDigimons, setTotalDigimons] = useState(0)


  useEffect(() => {
    const getDataGeneral = async () => {
      const data = await getDatosAPI("https://digi-api.com/api/v1/digimon?pageSize=1")
      setTotalDigimons(data.pageable.totalElements)
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
      <Jugadas jugadas={jugadas} />
    </main>
  )
}