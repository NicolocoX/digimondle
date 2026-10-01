import { useCallback, useState } from "react"
import restarListas from "../logic/restarListas"
import getDatosAPI from "../services/getDatosAPI"


export default function useSugerencias({ jugadas }) {
  const [sugerencias, setSugerencias] = useState([])
  const [nextPage, setNextPage] = useState("")
  const [mostrarCascada, setMostrarCascada] = useState(false)
  const tamanoBatch = 7


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
    if (nextPage === "") return

    const [newNextPage, newSugerencias] = await getDatosSugerencias(nextPage, [])
    agregarSugerencias(newSugerencias, newNextPage)
  }


  const limpiarSugerencias = useCallback(() => {
    setMostrarCascada(false)
    setSugerencias([])
  }, [])


  return {
    sugerencias,
    mostrarCascada,
    tamanoBatch,
    agregarSugerencias,
    getDatosSugerencias,
    expandirSugerencias,
    limpiarSugerencias
  }
}
