import { useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"

export default function App() {
  const [jugadas, setJugadas] = useState([])

  const agregarJugada = async (jugada) => {
    const digimon = await getDigimon(jugada)

    const newJugadas = [...jugadas, digimon]
    setJugadas(newJugadas)
    console.log(newJugadas)
  }

  const getDigimon = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador agregarJugada={agregarJugada} />
      <Jugadas jugadas={jugadas} />
    </main>
  )
}