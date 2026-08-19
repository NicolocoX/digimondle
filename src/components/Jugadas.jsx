import Fila from "./Fila";

export default function Jugadas({ jugadas }) {
  return (
    <div>
      {jugadas.map((digimon, index) => {
        return (
          <Fila key={index} digimon={digimon} />
        )
      })}
    </div>
  )
}