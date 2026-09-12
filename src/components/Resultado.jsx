import "../styles/Resultado.css"

export default function Resultado({ partidaGanada, imagen, nombre }) {
  return (
    <div className="resultado">
      <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>
      <img src={imagen} alt={nombre} />
      <span>{partidaGanada ? "Encontraste a " : "Tu objetivo era "}{nombre}</span>
    </div>
  )
}