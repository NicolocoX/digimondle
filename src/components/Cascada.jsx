import ResultadoCascada from "./ResultadoCascada";

export default function Cascada({ resultados }) {
  return (
    <ul>
      {resultados.map((resultado, key) => {
        return (
          <ResultadoCascada key={key} resultado={resultado} />
        )
      })}
    </ul>
  )
}