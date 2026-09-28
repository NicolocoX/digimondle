const getListaDatos = (lista, campo) => lista.map((elemento) => elemento[campo])


export default function infoRelevante(digimon) {
  if (!digimon) return null

  const id = digimon.id
  const nombre = digimon.name
  const imagen = digimon.images[0].href
  const nivel = digimon.levels.length
    ? getListaDatos(digimon.levels, "level")
    : ["Sin información"]
  const atributo = digimon.attributes.length
    ? getListaDatos(digimon.attributes, "attribute")
    : []
  const campo = digimon.fields.length
    ? getListaDatos(digimon.fields, "id")
    : []
  const tipo = digimon.types.length
    ? getListaDatos(digimon.types, "type")
    : ["Sin información"]
  const año = digimon.releaseDate

  return {
    id,
    nombre,
    imagen,
    nivel,
    atributo,
    campo,
    tipo,
    año
  }
}