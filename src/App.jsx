import { useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"
import getDatosAPI from "./services/getDatosAPI"

export default function App() {
  const [jugadas, setJugadas] = useState([])


  const agregarJugada = async (jugada) => {
    const digimon = await getDatosAPI(jugada)

    const newJugadas = [...jugadas, digimon]
    setJugadas(newJugadas)
    console.log(newJugadas)
  }


  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador agregarJugada={agregarJugada} />
      <Jugadas jugadas={jugadas} />
    </main>
  )
}