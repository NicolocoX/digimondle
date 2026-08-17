import ResultadoCascada from "./ResultadoCascada";

export default function Cascada({ resultados }) {
  return (
    <div>
      {resultados.map((resultado, key) => {
        return (
          <ResultadoCascada key={key} resultado={resultado} />
        )
      })}
    </div>
  )
}