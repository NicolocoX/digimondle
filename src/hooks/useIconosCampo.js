import { useEffect, useState } from "react"
import getDatosAPI from "../services/getDatosAPI"



export default function useIconosCampo({ campo }) {
  const [iconosCampo, setIconosCampo] = useState([])


  useEffect(() => {
    const getIconos = async () => {
      if (campo.length !== 0) {
        let newIconosCampo = []
        for (const elemento of campo) {
          const data = await getDatosAPI(`https://digi-api.com/api/v1/field/${elemento}`)
          newIconosCampo.push({ nombre: data.name, url: data.href })
        }
        setIconosCampo(newIconosCampo)
      }
    }

    getIconos()
  }, [])


  return { iconosCampo }
}