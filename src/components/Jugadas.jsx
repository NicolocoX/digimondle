import Columnas from "./Columnas";
import Fila from "./Fila";
import "../styles/Jugadas.css"
import { useEffect, useRef } from "react";

export default function Jugadas({ jugadas, objetivo }) {
  const ultimaJugadaRef = useRef(null)
  const hayJugadas = jugadas.length > 0


  useEffect(() => {
    const elemento = ultimaJugadaRef.current
    if (!elemento) return

    const rect = elemento.getBoundingClientRect()

    const esVisible = rect.top >= 0

    if (!esVisible) {
      window.scrollTo({
        behavior: "smooth",
        top: 130
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
              objetivo={objetivo}
              ultimaJugadaRef={esUltima ? ultimaJugadaRef : null} />
          )
        })}
      </div>
    </div>
  )
}