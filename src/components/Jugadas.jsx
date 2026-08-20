import Fila from "./Fila";
import "./Jugadas.css"

export default function Jugadas({ jugadas, objetivo }) {
  return (
    <div className="jugadas">
      {jugadas.map((digimon, index) => {
        return (
          <Fila key={index} digimon={digimon} objetivo={objetivo} />
        )
      })}
    </div>
  )
}