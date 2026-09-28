import ResultadoCascada from "./ResultadoCascada";
import "../styles/Cascada.css"


export default function Cascada({ resultados, expandirResultados, manejarJugada, limpiarBuscador }) {
  const handleScroll = (event) => {
    const elemento = event.currentTarget
    const enElFinal = elemento.clientHeight + elemento.scrollTop >= elemento.scrollHeight - 1

    if (enElFinal) expandirResultados()
  }


  return (
    <ul className="cascada" onScroll={handleScroll}>
      {resultados.map((resultado, key) => {
        return (
          <ResultadoCascada
            key={key}
            resultado={resultado}
            manejarJugada={manejarJugada}
            limpiarBuscador={limpiarBuscador} />
        )
      })}
    </ul>
  )
}