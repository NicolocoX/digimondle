import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback } from "react"
import debounce from "debounce"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador() {
  const [consulta, setConsulta] = useState("")
  const [respuesta, setRespuesta] = useState(null)
  const [resultados, setResultados] = useState(null)
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10,
    page: 0
  })


  const getRespuesta = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setRespuesta(data)
    return data
  }


  useEffect(() => {
    if (consulta === "") {
      setRespuesta(null)
      return
    }

    const obtenerRespuesta = async () => {
      const data = await getRespuesta(API_URL + parametros)
      setResultados(data.content)
    }

    obtenerRespuesta()
  }, [consulta])


  const expandirResultados = async () => {
    const nextPage = respuesta.pageable.nextPage
    if (nextPage === "") return

    const datos = await getRespuesta(nextPage)
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
          expandirResultados={expandirResultados} />}
    </form>
  )
}