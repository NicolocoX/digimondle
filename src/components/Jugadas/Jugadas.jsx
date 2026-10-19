import Columnas from "./Columnas";
import Fila from "./Fila";
import "../../styles/jugadas/Jugadas.css"
import { useContext } from "react";
import { JugadasContext } from "../../contexts/jugadas";


export default function Jugadas() {
  const { jugadas } = useContext(JugadasContext)
  const hayJugadas = jugadas.length > 0


  return (
    <div className="jugadas">
      {hayJugadas && <Columnas />}

      <div className="jugadas digimon">
        {jugadas.map((digimon, index) => {
          return (
            <Fila key={index}
              digimon={digimon} />
          )
        })}
      </div>
    </div>
  )
}