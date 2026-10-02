import Casilla from "./Casilla.jsx"
import "../styles/Fila.css"
import { memo, useContext } from "react"
import IconosCasilla from "./IconosCasilla.jsx"
import Fecha from "./Fecha.jsx"
import compararListas from "../logic/CompararListas.js"
import useIconosCampo from "../hooks/useIconosCampo.js"
import { ObjetivoContext } from "../contexts/objetivo.jsx"


function Fila({ digimon, ultimaJugadaRef }) {
  const { iconosCampo } = useIconosCampo({ campo: digimon.campo })
  const { objetivo } = useContext(ObjetivoContext)

  const nombre = digimon.nombre

  const tipoNivel = compararListas(digimon.nivel, objetivo.nivel)
  const tipoAtributo = compararListas(digimon.atributo, objetivo.atributo)
  const tipoCampo = compararListas(digimon.campo, objetivo.campo)
  const tipoTipo = compararListas(digimon.tipo, objetivo.tipo)

  const tipoAño = digimon.año === objetivo.año ? " correcta" : " incorrecta"
  const orientacionAño = digimon.año === objetivo.año
    ? ""
    : digimon.año < objetivo.año
      ? "arriba"
      : "abajo"


  return (
    <div className="fila" ref={ultimaJugadaRef}>
      <Casilla>
        <img className={"imagen-digimon"} src={digimon.imagen} alt={nombre} title={nombre} />
      </Casilla>

      <Casilla tipo={tipoNivel}>
        {digimon.nivel}
      </Casilla>

      <Casilla tipo={tipoAtributo}>
        {digimon.atributo.length !== 0
          ? <IconosCasilla listaIconos={digimon.atributo} />
          : "Sin informacion"}
      </Casilla>

      <Casilla tipo={tipoCampo}>
        {iconosCampo.length !== 0
          ? <IconosCasilla listaIconos={iconosCampo} />
          : "Sin informacion"}
      </Casilla>

      <Casilla tipo={tipoTipo}>
        {digimon.tipo}
      </Casilla>

      <Casilla tipo={tipoAño}>
        <Fecha año={digimon.año} dirección={orientacionAño} />
      </Casilla>
    </div>
  )
}

export default memo(Fila)