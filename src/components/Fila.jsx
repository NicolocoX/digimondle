import Casilla from "./Casilla"
import "./Fila.css"

export default function Fila({ digimon, objetivo }) {
  const tipoNivel = digimon.nivel === objetivo.nivel ? " correcta" : " incorrecta"
  const tipoAtributo = digimon.atributo === objetivo.atributo ? " correcta" : " incorrecta"
  const tipoCampo = digimon.campo === objetivo.campo ? " correcta" : " incorrecta"
  const tipoTipo = digimon.tipo === objetivo.tipo ? " correcta" : " incorrecta"
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