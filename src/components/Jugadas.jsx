import Columnas from "./Columnas";
import Fila from "./Fila";
import "./Jugadas.css"

export default function Jugadas({ jugadas, objetivo }) {
  const hayJugadas = jugadas.length > 0

  return (
    <>
      {hayJugadas &&
        <div className="jugadas">
          <Columnas></Columnas>

          <div className="jugadas digimon">
            {jugadas.map((digimon, index) => {
              return (
                <Fila key={index} digimon={digimon} objetivo={objetivo} />
              )
            })}
          </div>
        </div>
      }
    </>
  )
}