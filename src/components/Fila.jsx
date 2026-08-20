import Casilla from "./Casilla"
import "./Fila.css"

export default function Fila({ digimon, objetivo }) {
  const imagen = digimon.images[0].href
  const nivel = digimon.levels.length ? digimon.levels[0].level : "Sin información"
  const atributo = digimon.attributes.length ? digimon.attributes[0].attribute : "Sin información"
  const campo = digimon.fields.length ? digimon.fields[0].field : "Sin información"
  const tipo = digimon.types.length ? digimon.types[0].type : "Sin información"


  return (
    <div className="fila">
      <Casilla><img src={imagen} alt={digimon.name} /></Casilla>
      <Casilla tipo={" correcta"}>{nivel}</Casilla>
      <Casilla tipo={" incorrecta"}>{atributo}</Casilla>
      <Casilla tipo={" semi-correcta"}>{campo}</Casilla>
      <Casilla>{tipo}</Casilla>
    </div>
  )
}