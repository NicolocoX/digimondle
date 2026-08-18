import ResultadoCascada from "./ResultadoCascada";
import "./Cascada.css"

export default function Cascada({ resultados }) {
  return (
    <ul className="cascada">
      {resultados.map((resultado, key) => {
        return (
          <ResultadoCascada key={key} resultado={resultado} />
        )
      })}
    </ul>
  )
}