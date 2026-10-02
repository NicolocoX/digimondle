import Cascada from "./Cascada"
import "../styles/Buscador.css"
import { useEffect, useCallback, useRef, useContext } from "react"
import { JugadasContext } from "../contexts/juego"
import useInput from "../hooks/useInput"
import useSugerencias from "../hooks/useSugerencias"


const API_URL = "https://digi-api.com/api/v1/digimon?"


export default function Buscador() {
  const { jugadas } = useContext(JugadasContext)

  const {
    consulta,
    texto,
    inputRef,
    handleInputChange,
    limpiarInput
  } = useInput()

  const {
    sugerencias,
    mostrarCascada,
    tamanoBatch,
    agregarSugerencias,
    getDatosSugerencias,
    expandirSugerencias,
    limpiarSugerencias
  } = useSugerencias({ jugadas })

  const buscadorRef = useRef()
  const parametros = new URLSearchParams({
    name: consulta,
    pageSize: tamanoBatch,
    page: 0
  })


  useEffect(() => { // descarga los datos
    limpiarSugerencias()

    if (consulta === "") return

    let consultaCancelada = false

    const getConsultaSugerencias = async (url) => {
      const [newNextPage, newSugerencias] = await getDatosSugerencias(url, [])

      if (consultaCancelada) return

      agregarSugerencias(newSugerencias, newNextPage)
    }

    getConsultaSugerencias(API_URL + parametros)

    return () => {
      consultaCancelada = true
    }
  }, [consulta])


  useEffect(() => { // EventListener que desactiva cascada al clickear afuera
    const clickAfuera = (event) => {
      if (buscadorRef.current &&
        !buscadorRef.current.contains(event.target)) {
        limpiarSugerencias()
      }
    }

    document.addEventListener("mousedown", clickAfuera)

    return () => {
      document.removeEventListener("mousedown", clickAfuera)
    }
  }, [limpiarSugerencias])


  const limpiarBuscador = useCallback(() => {
    limpiarSugerencias()
    limpiarInput()
  }, [limpiarSugerencias, limpiarInput])


  return (
    <form className="buscador-input"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>

      <input ref={inputRef} onChange={handleInputChange} value={texto} placeholder="Agumon, Growmon, Beelzebumon..." />

      {mostrarCascada &&
        <Cascada
          sugerencias={sugerencias}
          expandirSugerencias={expandirSugerencias}
          limpiarBuscador={limpiarBuscador} />}
    </form>
  )
}