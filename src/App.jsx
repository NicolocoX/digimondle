import { useContext, useEffect, useRef } from "react"
import Jugadas from "./components/Jugadas/Jugadas"
import Resultado from "./components/Resultado"
import Debugueador from "./components/Debugueador"
import { PartidaContext } from "./contexts/partida"
import Controles from "./components/Controles/Controles"
import { JugadasContext } from "./contexts/jugadas"


export default function App() {
  const {
    finPartida,
    partidaGanada
  } = useContext(PartidaContext)

  const { jugadas } = useContext(JugadasContext)

  const scrollJugadasRef = useRef(null)


  useEffect(() => {
    if (partidaGanada) return

    scrollJugadasRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth"
    })

  }, [partidaGanada, jugadas])


  return (
    <main>
      <h1>Digimondle</h1>
      <div>
        <p>¡Bienvenido a Digimondle! Un juego de navegador inspirado en Wordle y basado en Digimon.</p>
        <p>Tu objetivo es encontrar al Digimon secreto en la menor cantidad de intentos posible. Para comenzar, selecciona
          cualquier Digimon en el buscador. A continuación, se mostrarán sus características en casillas de colores que te
          darán pistas sobre cuánto coincide con el Digimon secreto.</p>
        <ul>
          <li>Verde: la característica coincide.</li>
          <li>Amarillo: la coincidencia es parcial.</li>
          <li>Rojo: la característica no coincide.</li>
        </ul>
        <p>¡Utiliza las pistas de cada intento para descubrir al Digimon secreto!</p>
      </div>

      <Controles />
      {finPartida && <Resultado />}
      <div ref={scrollJugadasRef} />
      <Jugadas />
      <Debugueador />
    </main>
  )
}