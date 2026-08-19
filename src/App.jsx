import { useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"

export default function App() {
  const [jugadas, setJugadas] = useState([])


  const agregarJugada = async (jugada) => {
    const digimon = await getDatosAPI(jugada)

    setJugadas(estadoAnt => [...estadoAnt, digimon])
  }


  return (
    <main>
      <h1>Digimondle</h1>
      <Buscador agregarJugada={agregarJugada} jugadas={jugadas} />
      <Jugadas jugadas={jugadas} />
    </main>
  )
}