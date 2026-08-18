import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect } from "react"

const API_URL = "https://digi-api.com/api/v1/digimon?name="

export default function Buscador() {
  const [resultados, setResultados] = useState(null)
  const [mostrar, setMostrar] = useState(false)
  const [consulta, setConstulta] = useState("")

  useEffect(() => {
    fetch(API_URL + consulta)
      .then(response => response.json())
      .then(data => setResultados(data.content))
  }, [consulta])

  const inputChange = (event) => {
    const valor = event.target.value
    setConstulta(valor)

    valor === "" ? setMostrar(false) : setMostrar(true)
  }

  return (
    <form className="buscador" onSubmit={(event) => event.preventDefault()}>
      <div className="entrada">
        <label>Buscar: </label>
        <input onChange={inputChange} />
      </div>

      {(mostrar && resultados) && <Cascada resultados={resultados} />}
    </form>
  )
}