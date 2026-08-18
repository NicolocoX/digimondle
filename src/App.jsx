import { useState } from "react"
import Buscador from "./components/Buscador"
import Jugadas from "./components/Jugadas"

export default function App() {
  const [digimons, setDigimons] = useState([])

  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador />
      <Jugadas digimons={digimons} />
    </main>
  )
}