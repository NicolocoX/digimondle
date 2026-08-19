import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback, useRef } from "react"
import debounce from "debounce"
import getDatosAPI from "../services/getDatosAPI"

const API_URL = "https://digi-api.com/api/v1/digimon?"


export default function Buscador({ agregarJugada, jugadas }) {
  const [consulta, setConsulta] = useState("")
  const [texto, setTexto] = useState("")
  const [resultados, setResultados] = useState(null)
  const buscadorRef = useRef(null)
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 10,
    page: 0
  })


  const filtrarResultadosUsados = (lista) => {
    return lista.filter(
      elemento => !jugadas.some(
        jugada => jugada.id === elemento.id
      ))
  }


  useEffect(() => { // descarga los datos
    if (consulta === "") {
      setMostrarCascada(false)
      return
    }

    const obtenerRespuesta = async () => {
      const data = await getDatosAPI(API_URL + parametros)
      if (data?.content) {
        const newResultado = filtrarResultadosUsados(data.content)
        setResultados(newResultado)

        setNextPage(data.pageable.nextPage)
        setMostrarCascada(true)
      }
    }

    obtenerRespuesta()
  }, [consulta])


  useEffect(() => { // desactiva cascada al clickear afuera
    if (consulta == "") return

    const clickAfuera = (event) => {
      if (buscadorRef.current &&
        !buscadorRef.current.contains(event.target)) {
        setMostrarCascada(false)

      } else if (resultados) setMostrarCascada(true)
    }

    document.addEventListener("mousedown", clickAfuera)

    return () => {
      document.removeEventListener("mousedown", clickAfuera)
    }
  }
    , [resultados, consulta]
  )


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


  const handleInputChange = (event) => {
    setTexto(event.target.value)
    setConsultaDebounce(event.target.value)
  }


  const limpiarBuscador = () => {
    setMostrarCascada(false)
    setTexto("")
    setConsulta("")
    setResultados(null)
  }


  return (
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>
      <div className="entrada">
        <label>Buscar: </label>
        <input onChange={handleInputChange} value={texto} />
      </div>

      {mostrarCascada &&
        <Cascada
          resultados={resultados}
          expandirResultados={expandirResultados}
          agregarJugada={agregarJugada}
          limpiarBuscador={limpiarBuscador} />}
    </form>
  )
}