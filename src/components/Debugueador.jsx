import { useContext } from "react"
import { JuegoContext } from "../contexts/juego"
import confetti from "@hiseb/confetti"


export default function Debugueador() {
  const { objetivo } = useContext(JuegoContext)

  const onClickBoton = () => {
    confetti()
  }

  return (
    <div>
      {objetivo && <span>{objetivo.nombre}</span>}
      <button onClick={onClickBoton}>prueba</button>
    </div>
  )
}