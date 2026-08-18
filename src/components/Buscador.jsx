import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback } from "react"
import debounce from "debounce"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador() {
  const [consulta, setConsulta] = useState("")
  const [respuesta, setRespuesta] = useState(null)
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10
  })


  const getRespuesta = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setRespuesta(data)
  }


  useEffect(() => {
    if (consulta === "") {
      setRespuesta(null)
      return
    }

    getRespuesta(API_URL + parametros)
  }, [consulta])


  //resultados.pageable.nextPage



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

      {respuesta?.content && <Cascada resultados={respuesta.content} />}
    </form>
  )
}