import Casilla from "./Casilla"
import "./Fila.css"
import getDatosAPI from "../services/getDatosAPI"
import { useEffect, useState } from "react"
import IconosCampo from "./IconosCampo.jsx"

export default function Fila({ digimon, objetivo }) { // cada fila se renderiza por cada selección
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


  const getIconos = async () => {
    let newIconosCampo = []
    for (const elemento of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const data = await getDatosAPI(`https://digi-api.com/api/v1/field/${elemento}`)
      newIconosCampo.push(data.href)
    }

    setIconosCampo(newIconosCampo)
  }

  useEffect(() => {
    getIconos()
  }, [])


  return (
    <div className="fila">
      <Casilla>
        <img className={"imagen-digimon"} src={digimon.imagen} alt={digimon.nombre} />
      </Casilla>
      <Casilla tipo={tipoNivel}>{digimon.nivel}</Casilla>
      <Casilla tipo={tipoAtributo}>{digimon.atributo}</Casilla>
      <Casilla tipo={tipoCampo}>
        <IconosCampo listaIconos={iconosCampo} />
      </Casilla>
      <Casilla tipo={tipoTipo}>{digimon.tipo}</Casilla>
      <Casilla tipo={tipoAño}>{digimon.año}</Casilla>
    </div>
  )
}