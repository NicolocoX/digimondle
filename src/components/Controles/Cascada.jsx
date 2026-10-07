import Sugerencia from "./Sugerencia";
import "../../styles/controles/Cascada.css"
import { useEffect, useRef } from "react";


export default function Cascada({
  sugerencias,
  expandirSugerencias,
  limpiarBuscador,
  indiceEnfocado
}) {
  const sugerenciaRef = useRef(null)



  useEffect(() => { // Autoscroll a la sugerencia enfocada
    sugerenciaRef.current?.scrollIntoView({
      block: "nearest"
    })
  }, [indiceEnfocado])



  const handleScroll = (event) => {
    const elemento = event.currentTarget
    const enElFinal = elemento.clientHeight + elemento.scrollTop >= elemento.scrollHeight - 1

    if (enElFinal) expandirSugerencias()
  }



  return (
    <ul className="cascada" onScroll={handleScroll}>
      {sugerencias.map((sugerencia, key) => {
        return (
          <Sugerencia
            key={key}
            sugerencia={sugerencia}
            limpiarBuscador={limpiarBuscador}
            sugerenciaRef={key === indiceEnfocado ? sugerenciaRef : null} />
        )
      })}
    </ul>
  )
}