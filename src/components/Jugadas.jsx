import Digimon from "./Digimon";

export default function Jugadas({ jugadas }) {
  return (
    <div>
      {jugadas.map((digimon, index) => {
        return (
          <Digimon key={index} digimon={digimon} />
        )
      })}
    </div>
  )
}