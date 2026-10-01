import { useState, useEffect } from "react"
import getDatosAPI from "../services/getDatosAPI"
import infoRelevante from "../logic/infoRelevante"

export default function useObjetivo() {
  const [objetivo, setObjetivo] = useState(null)


  useEffect(() => { //Obtiene al digimon objetivo
    cambiarObjetivo()
  }, [])


  const cambiarObjetivo = async () => {
    const data = await getDatosAPI("https://digi-api.com/api/v1/digimon?pageSize=1")
    const total = data.pageable.totalElements

    const idRandom = Math.floor(Math.random() * total) + 1
    const digimon = await getDatosAPI(`https://digi-api.com/api/v1/digimon/${idRandom}`)
    setObjetivo(infoRelevante(digimon))
  }


  return { objetivo, cambiarObjetivo }
}