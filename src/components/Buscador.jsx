import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback, useRef } from "react"
import debounce from "debounce"
import getDatosAPI from "../services/getDatosAPI"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador({ agregarJugada }) {
  const [consulta, setConsulta] = useState("")
  const [respuesta, setRespuesta] = useState(null)
  const [resultados, setResultados] = useState(null)
  const buscadorRef = useRef(null)
  const [mostrarCascada, setMostrarCascada] = useState(true)
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10,
    page: 0
  })


  useEffect(() => { // descarga los datos
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


  useEffect(() => { // desactiva cascada al clickear afuera
    const clickAfuera = () => {
      if (buscadorRef.current &&
        !buscadorRef.current.contains(event.target)) setMostrarCascada(false)
    }

    console.log("effect", mostrarCascada)
    document.addEventListener("mousedown", clickAfuera)

    return () => {
      document.removeEventListener("mousedown", clickAfuera)
    }
  }
    , [])
  console.log("render", mostrarCascada)


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
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>
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