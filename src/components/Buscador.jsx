import Cascada from "./Cascada"
import "./Buscador.css"
import { useState, useEffect, useCallback, useRef } from "react"
import debounce from "debounce"
import getDatosAPI from "../services/getDatosAPI"

const API_URL = "https://digi-api.com/api/v1/digimon?"


// idea: al apretar enter y el nombre escrito existe, se selecciona el digimon
export default function Buscador({ agregarJugada, jugadas, reiniciar }) {
  const [consulta, setConsulta] = useState("")
  const [texto, setTexto] = useState("")
  const [resultados, setResultados] = useState(null)
  const buscadorRef = useRef(null)
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 7,
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

    const obtenerRespuesta = async (url, lista) => {
      const data = await getDatosAPI(url)
      if (data?.content) {
        const resultadosFiltrados = filtrarResultadosUsados(data.content)
        let newResultado = [...lista, ...resultadosFiltrados]
        let newNextPage = data.pageable.nextPage

        if (newResultado.length < 7 && newNextPage) {
          [newResultado, newNextPage] = await obtenerRespuesta(newNextPage, newResultado)
        }

        setResultados(newResultado)
        setNextPage(newNextPage)
        setMostrarCascada(true)
        return [newResultado, newNextPage]
      }

      return ["", []]
    }

    obtenerRespuesta(API_URL + parametros, [])
  }, [consulta])


  const expandirResultados = async () => {
    if (nextPage === "") return

    const datos = await getDatosAPI(nextPage)
    setNextPage(datos.pageable.nextPage)

    const sigResultados = datos.content
    setResultados(estadoAnt => [...estadoAnt, ...sigResultados])
  }


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


  const setConsultaDebounce = useCallback(
    debounce(valor => setConsulta(valor), 300),
    []
  )


  const handleInputChange = (event) => {
    setTexto(event.target.value)
    setConsultaDebounce(event.target.value)
  }


  const limpiarBuscador = useCallback(() => {
    setMostrarCascada(false)
    setTexto("")
    setConsulta("")
    setResultados(null)
  }, [])


  return (
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>

      <label>Buscar: </label>

      <div className="buscador-input">
        <input onChange={handleInputChange} value={texto} />
        {mostrarCascada &&
          <Cascada
            resultados={resultados}
            expandirResultados={expandirResultados}
            agregarJugada={agregarJugada}
            limpiarBuscador={limpiarBuscador} />}
      </div>

      <button onClick={reiniciar}>Reiniciar</button>

    </form>
  )
}