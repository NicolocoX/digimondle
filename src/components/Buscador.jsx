import Cascada from "./Cascada"
import "../styles/Buscador.css"
import { useState, useEffect, useCallback, useRef, useContext } from "react"
import getDatosAPI from "../services/getDatosAPI"
import { JuegoContext } from "../contexts/juego"
import useInput from "../hooks/useInput"

const API_URL = "https://digi-api.com/api/v1/digimon?"


export default function Buscador() {
  const [resultados, setResultados] = useState(null)
  const buscadorRef = useRef(null)
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")

  const {
    jugadas,
    partidaGanada,
    finPartida,
    rendirse,
    reiniciar
  } = useContext(JuegoContext)

  const {
    consulta,
    texto,
    inputRef,
    handleInputChange,
    limpiarInput
  } = useInput()

  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 7,
    page: 0
  })


  const limpiarBuscador = useCallback(() => {
    setMostrarCascada(false)
    setResultados(null)
    limpiarInput()
  }, [])


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


  return (
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>

      <div className="buscador-input">
        <input ref={inputRef} onChange={handleInputChange} value={texto} placeholder="Agumon, Growmon, Beelzebumon..." />
        {mostrarCascada &&
          <Cascada
            resultados={resultados}
            expandirResultados={expandirResultados}
            limpiarBuscador={limpiarBuscador} />}
      </div>

      <button onClick={rendirse} type="button" disabled={finPartida || partidaGanada}>Rendirse</button>
      <button onClick={reiniciar} type="button">Reiniciar</button>
    </form>
  )
}