import Sugerencia from "./Sugerencia";
import "../styles/Cascada.css"


export default function Cascada({ sugerencias, expandirSugerencias, limpiarBuscador }) {
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
            limpiarBuscador={limpiarBuscador} />
        )
      })}
    </ul>
  )
}