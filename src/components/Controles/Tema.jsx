import solSVG from "../../assets/tema/sol.svg"
import lunaSVG from "../../assets/tema/luna.svg"
import { useEffect, useState } from "react"

export default function Tema() {
  const [iconoSol, setIconoSol] = useState(true)


  useEffect(() => {
    document.documentElement.dataset.tema = "oscuro"
  }, [])


  return (
    <button onClick={() => setIconoSol(!iconoSol)}>
      <img src={iconoSol ? solSVG : lunaSVG} />
    </button>
  )
}