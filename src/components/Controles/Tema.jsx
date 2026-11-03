import solSVG from "../../assets/tema/sol.svg"
import lunaSVG from "../../assets/tema/luna.svg"
import { useState } from "react"

export default function Tema() {
  const [iconoSol, setIconoSol] = useState(true)

  return (
    <button onClick={() => setIconoSol(!iconoSol)}>
      <img src={iconoSol ? solSVG : lunaSVG} />
    </button>
  )
}