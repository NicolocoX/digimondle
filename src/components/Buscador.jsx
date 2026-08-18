import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect } from "react"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador() {
  const [resultados, setResultados] = useState(null)
  const [consulta, setConsulta] = useState("")
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10
  })

  useEffect(() => {
    if (consulta === "") {
      setResultados(null)
      return
    }

    fetch(API_URL + parametros)
      .then(response => response.json())
      .then(data => setResultados(data.content))
  }, [consulta])

  return (
    <form className="buscador" onSubmit={(event) => event.preventDefault()}>
      <div className="entrada">
        <label>Buscar: </label>
        <input onChange={(event) => setConsulta(event.target.value)} />
      </div>

      {resultados && <Cascada resultados={resultados} />}
    </form>
  )
}