export default function ResultadoCascada({ resultado }) {
  return (
    <div>
      <img src={resultado.image} />
      <span>{resultado.name}</span>
    </div>
  )
}