import ResultadoCascada from "./ResultadoCascada";
import "./Cascada.css"

// en Brave no hay cascada infinita
export default function Cascada({ resultados, expandirResultados, agregarJugada, limpiarBuscador }) {
  const handleScroll = (event) => {
    const elemento = event.currentTarget
    const enElFinal = elemento.clientHeight + elemento.scrollTop >= elemento.scrollHeight

    if (enElFinal) expandirResultados()
  }


  return (
    <ul className="cascada" onScroll={handleScroll}>
      {resultados.map((resultado, key) => {
        return (
          <ResultadoCascada
            key={key}
            resultado={resultado}
            agregarJugada={agregarJugada}
            limpiarBuscador={limpiarBuscador} />
        )
      })}
    </ul>
  )
}