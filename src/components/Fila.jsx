import Casilla from "./Casilla"
import "./Fila.css"

export default function Fila({ digimon, objetivo }) {
  const compararListas = (lista1, lista2) => {
    if (lista1.length === lista2.length &&
      lista1.every((elemento) => lista2.includes(elemento))
    ) return " correcta"
    else return " incorrecta"
  }

  const tipoNivel = compararListas(digimon.nivel, objetivo.nivel)
  const tipoAtributo = compararListas(digimon.atributo, objetivo.atributo)
  const tipoCampo = compararListas(digimon.campo, objetivo.campo)
  const tipoTipo = compararListas(digimon.tipo, objetivo.tipo)
  const tipoAño = digimon.año === objetivo.año ? " correcta" : " incorrecta"

  return (
    <div className="fila">
      <Casilla><img src={digimon.imagen} alt={digimon.name} /></Casilla>
      <Casilla tipo={tipoNivel}>{digimon.nivel}</Casilla>
      <Casilla tipo={tipoAtributo}>{digimon.atributo}</Casilla>
      <Casilla tipo={tipoCampo}>{digimon.campo}</Casilla>
      <Casilla tipo={tipoTipo}>{digimon.tipo}</Casilla>
      <Casilla tipo={tipoAño}>{digimon.año}</Casilla>
    </div>
  )
}