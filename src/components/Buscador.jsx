import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback, useRef } from "react"
import debounce from "debounce"
import getDatosAPI from "../services/getDatosAPI"

const API_URL = "https://digi-api.com/api/v1/digimon?"

export default function Buscador({ agregarJugada }) {
  const [consulta, setConsulta] = useState("")
  const [resultados, setResultados] = useState(null)
  const buscadorRef = useRef(null)
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10,
    page: 0
  })


  useEffect(() => { // descarga los datos
    if (consulta === "") {
      setMostrarCascada(false)
      return
    }

    const obtenerRespuesta = async () => {
      const data = await getDatosAPI(API_URL + parametros)
      if (data?.content) {
        setNextPage(data.pageable.nextPage)
        setResultados(data.content)
        setMostrarCascada(true)
      }
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
    if (nextPage === "") return

    const datos = await getDatosAPI(nextPage)
    setNextPage(datos.pageable.nextPage)

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

      {mostrarCascada &&
        <Cascada
          resultados={resultados}
          expandirResultados={expandirResultados}
          agregarJugada={agregarJugada} />}
    </form>
  )
}