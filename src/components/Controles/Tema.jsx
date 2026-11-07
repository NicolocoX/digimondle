import solSVG from "../../assets/tema/sol.svg"
import lunaSVG from "../../assets/tema/luna.svg"
import { useEffect, useState } from "react"

export default function Tema() {
  const [iconoSol, setIconoSol] = useState(true)


  useEffect(() => {
    if (iconoSol) {
      delete document.documentElement.dataset.tema
    } else {
      document.documentElement.dataset.tema = "oscuro"
    }
  }, [iconoSol])


  return (
    <button onClick={() => setIconoSol(!iconoSol)}>
      <img style={{ "height": "100%" }} src={iconoSol ? solSVG : lunaSVG} />
    </button>
  )
}