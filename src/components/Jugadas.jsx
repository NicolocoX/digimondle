import Columnas from "./Columnas";
import Fila from "./Fila";
import "./Jugadas.css"

export default function Jugadas({ jugadas, objetivo }) {
  const hayJugadas = jugadas.length > 0 // quizás esto podría estar en app


  return (
    <>
      {hayJugadas &&
        <div className="jugadas">
          <Columnas />

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