import { useContext } from "react"
import confetti from "@hiseb/confetti"
import { ObjetivoContext } from "../contexts/objetivo"


export default function Debugueador() {
  const { objetivo } = useContext(ObjetivoContext)

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