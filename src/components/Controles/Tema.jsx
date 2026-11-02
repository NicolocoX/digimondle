import solSVG from "../../assets/tema/sol.svg"
import lunaSVG from "../../assets/tema/luna.svg"
import { useState } from "react"

export default function Tema() {
  const [iconoSol, setIconoSol] = useState(true)

  return (
    <img src={iconoSol ? solSVG : lunaSVG} onClick={() => setIconoSol(!iconoSol)} />
  )
}