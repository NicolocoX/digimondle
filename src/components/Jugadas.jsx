import Columnas from "./Columnas";
import Fila from "./Fila";
import "../styles/Jugadas.css"
import { useContext, useEffect, useRef } from "react";
import { JuegoContext } from "../contexts/juego";

export default function Jugadas() {
  const ultimaJugadaRef = useRef(null)
  const { jugadas } = useContext(JuegoContext)
  const hayJugadas = jugadas.length > 0


  useEffect(() => {
    const elemento = ultimaJugadaRef.current
    if (!elemento) return

    const rect = elemento.getBoundingClientRect()

    const esVisible = rect.top >= 0

    if (!esVisible) {
      window.scrollTo({
        behavior: "smooth",
        top: 125
      })
    }
  }, [jugadas])


  return (
    <div className="jugadas">
      {hayJugadas && <Columnas />}

      <div className="jugadas digimon">
        {jugadas.map((digimon, index) => {
          const esUltima = index === jugadas.length - 1

          return (
            <Fila key={index}
              digimon={digimon}
              ultimaJugadaRef={esUltima ? ultimaJugadaRef : null} />
          )
        })}
      </div>
    </div>
  )
}