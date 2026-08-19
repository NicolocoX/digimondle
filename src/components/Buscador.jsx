import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback } from "react"
import debounce from "debounce"
import getDatosAPI from "../services/getDatosAPI"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador({ agregarJugada }) {
  const [consulta, setConsulta] = useState("")
  const [respuesta, setRespuesta] = useState(null)
  const [resultados, setResultados] = useState(null)
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10,
    page: 0
  })

  useEffect(() => {
    if (consulta === "") {
      setRespuesta(null)
      return
    }

    const obtenerRespuesta = async () => {
      const data = await getDatosAPI(API_URL + parametros)
      setRespuesta(data)
      setResultados(data.content)
    }

    obtenerRespuesta()
  }, [consulta])


  const expandirResultados = async () => {
    const nextPage = respuesta.pageable.nextPage
    if (nextPage === "") return

    const datos = await getDatosAPI(nextPage)
    setRespuesta(datos)

    const sigResultados = datos.content
    const newResultados = [...resultados, ...sigResultados]
    setResultados(newResultados)
  }


  const setConsultaDebounce = useCallback(
    debounce(valor => setConsulta(valor), 300),
    []
  )


  return (
    <form className="buscador" onSubmit={(event) => event.preventDefault()}>
      <div className="entrada">
        <label>Buscar: </label>
        <input onChange={(event) => setConsultaDebounce(event.target.value)} />
      </div>

      {respuesta?.content &&
        <Cascada
          resultados={resultados}
          expandirResultados={expandirResultados}
          agregarJugada={agregarJugada} />}
    </form>
  )
}