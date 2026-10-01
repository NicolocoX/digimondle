import debounce from "debounce"
import { useCallback, useEffect, useRef, useState } from "react"


export default function useInput() {
  const [consulta, setConsulta] = useState("")
  const [texto, setTexto] = useState("")
  const inputRef = useRef(null)


  useEffect(() => {// Enfoca en el input al presionar una tecla
    const teclaPresionada = event => {
      const elemento = document.activeElement
      if (
        elemento.tagName === "INPUT" ||
        elemento.tagName === "TEXTAREA" ||
        elemento.isContentEditable ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      ) {
        return
      }

      if (event.key.length === 1) {
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", teclaPresionada)

    return () => {
      window.removeEventListener("keydown", teclaPresionada)
    }
  }, [])


  const setConsultaDebounce = useCallback(
    debounce(valor => setConsulta(valor), 300),
    []
  )


  const handleInputChange = (event) => {
    setTexto(event.target.value)
    setConsultaDebounce(event.target.value)
  }


  const limpiarInput = useCallback(() => {
    setTexto("")
    setConsulta("")
  }, [])


  return {
    consulta,
    texto,
    inputRef,
    handleInputChange,
    limpiarInput
  }
}