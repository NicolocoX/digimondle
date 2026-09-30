import Cascada from "./Cascada"
import "../styles/Buscador.css"
import { useState, useEffect, useCallback, useRef, useContext } from "react"
import getDatosAPI from "../services/getDatosAPI"
import { JuegoContext } from "../contexts/juego"
import useInput from "../hooks/useInput"

const API_URL = "https://digi-api.com/api/v1/digimon?"


export default function Buscador() {
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

  const buscadorRef = useRef(null)

  const [sugerencias, setSugerencias] = useState([])
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")
  const tamanoBatch = 7
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: tamanoBatch,
    page: 0
  })


  const limpiarBuscador = useCallback(() => {
    setMostrarCascada(false)
    setSugerencias([])
    limpiarInput()
  }, [])


  const filtrarSugerenciasUsadas = (lista) => {
    return lista.filter(
      elemento => !jugadas.some(
        jugada => jugada.id === elemento.id
      ))
  }


  const getBatchSugerencias = async (url, sugerenciasIni) => {
    const data = await getDatosAPI(url)

    if (data?.content) {
      const sugerenciasFiltradas = filtrarSugerenciasUsadas(data.content)
      let newSugerencias = [...sugerenciasIni, ...sugerenciasFiltradas]
      let newNextPage = data.pageable.nextPage

      if (newSugerencias.length < tamanoBatch && newNextPage) {
        [newNextPage, newSugerencias] = await getBatchSugerencias(newNextPage, newSugerencias)
      }

      return [newNextPage, newSugerencias]
    }

    return ["", []]
  }


  const getDatosSugerencias = async (url, sugerenciasIni) => {
    const [newNextPage, newSugerencias] = await getBatchSugerencias(url, sugerenciasIni)

    setSugerencias(prevState => [...prevState, ...newSugerencias])
    setNextPage(newNextPage)
    setMostrarCascada(true)
  }


  useEffect(() => { // descarga los datos
    if (consulta === "") {
      setMostrarCascada(false)
      return
    }

    setSugerencias([])
    getDatosSugerencias(API_URL + parametros, [])
  }, [consulta])


  const expandirSugerencias = async () => { // debería ejecutar getDatosSugerencias desde el segundo batch
    if (nextPage === "") return

    const datos = await getDatosAPI(nextPage)
    setNextPage(datos.pageable.nextPage)

    const sigSugerencias = filtrarSugerenciasUsadas(datos.content)
    setSugerencias(estadoAnt => [...estadoAnt, ...sigSugerencias])
  }


  useEffect(() => { // EventListener que desactiva cascada al clickear afuera
    const clickAfuera = (event) => {
      if (buscadorRef.current &&
        !buscadorRef.current.contains(event.target)) {
        setMostrarCascada(false)
        setSugerencias([])
      }
    }

    document.addEventListener("mousedown", clickAfuera)

    return () => {
      document.removeEventListener("mousedown", clickAfuera)
    }
  }, [])


  return (
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>

      <div className="buscador-input">
        <input ref={inputRef} onChange={handleInputChange} value={texto} placeholder="Agumon, Growmon, Beelzebumon..." />
        {mostrarCascada &&
          <Cascada
            sugerencias={sugerencias}
            expandirSugerencias={expandirSugerencias}
            limpiarBuscador={limpiarBuscador} />}
      </div>

      <button onClick={rendirse} type="button" disabled={finPartida || partidaGanada}>Rendirse</button>
      <button onClick={reiniciar} type="button">Reiniciar</button>
    </form>
  )
}