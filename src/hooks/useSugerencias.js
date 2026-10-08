import { useCallback, useEffect, useState } from "react"
import restarListas from "../logic/restarListas"
import getDatosAPI from "../services/getDatosAPI"


export default function useSugerencias({ jugadas }) {
  const [sugerencias, setSugerencias] = useState([])
  const [nextPage, setNextPage] = useState("")
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const tamanoBatch = 7
  const [indiceEnfocado, setIndiceEnfocado] = useState(3)
  const [cargandoSugerencias, setCargandoSugerencias] = useState(false)



  useEffect(()=>{ // Navegación por teclado
    const navegacion = event => {
      if ( event.key === "ArrowUp" && indiceEnfocado > 0) {
        setIndiceEnfocado(prevState => prevState - 1)
      }

      if ( event.key === "ArrowDown") {
        if (indiceEnfocado < sugerencias.length - 1) {
          setIndiceEnfocado(prevState => prevState + 1)
        }
        if (
          indiceEnfocado === sugerencias.length - 1 &&
          nextPage !== "" &&
          !cargandoSugerencias
        ) {
          expandirSugerencias()
        }
      }
    }

    window.addEventListener("keydown", navegacion)

    return () => {
      window.removeEventListener("keydown", navegacion)
    }
  }, [sugerencias, indiceEnfocado, nextPage, cargandoSugerencias]) 



  const agregarSugerencias = (sugerencias, newNextPage) => {
    setSugerencias(prevState => [...prevState, ...sugerencias])
    setNextPage(newNextPage)
    setMostrarCascada(true)
  }



  const getDatosSugerencias = async (url, sugerenciasIni) => {
    const data = await getDatosAPI(url)

    if (data?.content) {
      const sugerenciasFiltradas = restarListas(data.content, jugadas)
      let newSugerencias = [...sugerenciasIni, ...sugerenciasFiltradas]
      let newNextPage = data.pageable.nextPage

      if (newSugerencias.length < tamanoBatch && newNextPage) {
        [newNextPage, newSugerencias] = await getDatosSugerencias(newNextPage, newSugerencias)
      }

      return [newNextPage, newSugerencias]
    }

    return ["", []]
  }



  const expandirSugerencias = async () => {
    if (nextPage === "" || cargandoSugerencias) return

    setCargandoSugerencias(true)
    const [newNextPage, newSugerencias] = await getDatosSugerencias(nextPage, [])
    agregarSugerencias(newSugerencias, newNextPage)
    setCargandoSugerencias(false)
  }



  const limpiarSugerencias = useCallback(() => {
    setIndiceEnfocado(0)
    setMostrarCascada(false)
    setSugerencias([])
  }, [])



  return {
    sugerencias,
    mostrarCascada,
    tamanoBatch,
    indiceEnfocado,
    agregarSugerencias,
    getDatosSugerencias,
    expandirSugerencias,
    limpiarSugerencias,
    cargandoSugerencias
  }
}
