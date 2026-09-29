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
  const [sugerencias, setSugerencias] = useState(null)
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const [nextPage, setNextPage] = useState("")
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: 7,
    page: 0
  })


  const limpiarBuscador = useCallback(() => {
    setMostrarCascada(false)
    setSugerencias(null)
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

      if (newSugerencias.length < 7 && newNextPage) {
        [newSugerencias, newNextPage] = await getBatchSugerencias(newNextPage, newSugerencias)
      }

      setSugerencias(newSugerencias)
      setNextPage(newNextPage)
      setMostrarCascada(true)
      return [newSugerencias, newNextPage]
    }

    return ["", []]
  }


  useEffect(() => { // descarga los datos
    if (consulta === "") {
      setMostrarCascada(false)
      return
    }

    getBatchSugerencias(API_URL + parametros, [])
  }, [consulta])


  const expandirSugerencias = async () => {
    if (nextPage === "") return

    const datos = await getDatosAPI(nextPage)
    setNextPage(datos.pageable.nextPage)

    const sigSugerencias = filtrarSugerenciasUsadas(datos.content)
    setSugerencias(estadoAnt => [...estadoAnt, ...sigSugerencias])
  }


  useEffect(() => { // desactiva cascada al clickear afuera
    if (consulta == "") return

    const clickAfuera = (event) => {
      if (buscadorRef.current &&
        !buscadorRef.current.contains(event.target)) {
        setMostrarCascada(false)

      } else if (sugerencias) setMostrarCascada(true)
    }

    document.addEventListener("mousedown", clickAfuera)

    return () => {
      document.removeEventListener("mousedown", clickAfuera)
    }
  }
    , [sugerencias, consulta]
  )


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