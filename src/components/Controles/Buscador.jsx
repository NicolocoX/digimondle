import Cascada from "./Cascada"
import "../../styles/controles/Buscador.css"
import { useEffect, useCallback, useRef, useContext } from "react"
import { JugadasContext } from "../../contexts/jugadas"
import useInput from "../../hooks/useInput"
import useSugerencias from "../../hooks/useSugerencias"
import { ObjetivoContext } from "../../contexts/objetivo"
import useJugar from "../../hooks/useJugar"


const API_URL = "https://digi-api.com/api/v1/digimon?"



export default function Buscador() {
  const { jugadas } = useContext(JugadasContext)
  const { cargandoObjetivo } = useContext(ObjetivoContext)
  const { jugar } = useJugar()

  const {
    consulta,
    texto,
    inputRef,
    indiceEnfocado,
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



  useEffect(() => { // Descarga los datos
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



  useEffect(() => { // EvListener: elige sugerencia con Enter
    const enterPresionado = event => {
      const elemento = document.activeElement

      if (
        elemento === inputRef.current &&
        event.key === 'Enter' &&
        sugerencias.length > 0 &&
        consulta.toLowerCase() === sugerencias[0].name.toLowerCase()
      ) {
        jugar(sugerencias[0].href)
        limpiarBuscador()
      }
    }

    window.addEventListener("keydown", enterPresionado)

    return () => {
      window.removeEventListener("keydown", enterPresionado)
    }
  }, [inputRef, sugerencias, consulta])



  const limpiarBuscador = useCallback(() => {
    limpiarSugerencias()
    limpiarInput()
  }, [limpiarSugerencias, limpiarInput])



  return (
    <form className="buscador"
      onSubmit={(event) => event.preventDefault()}
      ref={buscadorRef}>

      <input
        ref={inputRef}
        onChange={handleInputChange}
        value={texto}
        placeholder="Agumon, Growmon, Beelzebumon..."
        disabled={cargandoObjetivo} />

      {mostrarCascada &&
        <Cascada
          sugerencias={sugerencias}
          expandirSugerencias={expandirSugerencias}
          limpiarBuscador={limpiarBuscador}
          indiceEnfocado={indiceEnfocado} />}
    </form>
  )
}