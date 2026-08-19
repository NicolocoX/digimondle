export default function Digimon({ digimon }) {
  const nombre = digimon.name
  const nivel = digimon.levels.length ? digimon.levels[0].level : "Sin información"
  const atributo = digimon.attributes.length ? digimon.attributes[0].attribute : "Sin información"
  const campo = digimon.fields.length ? digimon.fields[0].field : "Sin información"
  const tipo = digimon.types.length ? digimon.types[0].type : "Sin información"


  return (
    <div>
      <span>{nombre}</span>
      <span>{nivel}</span>
      <span>{atributo}</span>
      <span>{campo}</span>
      <span>{tipo}</span>
    </div>
  )
}