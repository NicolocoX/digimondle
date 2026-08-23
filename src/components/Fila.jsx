import Casilla from "./Casilla"
import "./Fila.css"
import getDatosAPI from "../services/getDatosAPI"
import { useEffect, useState } from "react"
import IconosCampo from "./IconosCampo.jsx"
import Fecha from "./Fecha.jsx"

export default function Fila({ digimon, objetivo }) { // cada fila se renderiza por cada selección
  const nombre = digimon.nombre
  const [iconosCampo, setIconosCampo] = useState([])

  const compararListas = (lista1, lista2) => {
    let count = 0
    for (const elemento of lista1) {
      if (lista2.includes(elemento)) count++
    }

    if (lista1.length === lista2.length && count === lista2.length) {
      return " correcta"
    } else if (count > 0) {
      return " semi-correcta"
    } else {
      return " incorrecta"
    }
  }

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


  const getIconos = async () => {
    let newIconosCampo = []
    if (digimon.campo[0] !== 0) {
      for (const elemento of digimon.campo) {
        const data = await getDatosAPI(`https://digi-api.com/api/v1/field/${elemento}`)
        newIconosCampo.push({ nombre: data.name, url: data.href })
      }
    }


    setIconosCampo(newIconosCampo)
  }

  useEffect(() => {
    getIconos()
  }, [])


  return (
    <div className="fila">
      <Casilla>
        <img className={"imagen-digimon"} src={digimon.imagen} alt={nombre} title={nombre} />
      </Casilla>
      <Casilla tipo={tipoNivel}>{digimon.nivel}</Casilla>
      <Casilla tipo={tipoAtributo}>{digimon.atributo}</Casilla>
      <Casilla tipo={tipoCampo}>
        {iconosCampo.length !== 0
          ? <IconosCampo listaIconos={iconosCampo} />
          : "Sin informacion"}
      </Casilla>
      <Casilla tipo={tipoTipo}>{digimon.tipo}</Casilla>

      <Casilla tipo={tipoAño}>
        <Fecha año={digimon.año} dirección={orientacionAño} />
      </Casilla>
    </div>
  )
}