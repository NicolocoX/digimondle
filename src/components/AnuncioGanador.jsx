import "./AnuncioGanador.css"

export default function AnuncioGanador({ nombre, imagen, setMostrarModal, partidaGanada }) {
  return (
    <div className="anuncio-ganador" onClick={() => setMostrarModal(false)}>
      <div className="anuncio-ganador-modal">
        <h1>{partidaGanada ? "¡HAS GANADO!" : "Perdiste"}</h1>
        <img src={imagen} alt={nombre} />
        <span>{partidaGanada ? "Encontraste a " : "Tu objetivo era "}{nombre}</span>
      </div>
    </div>
  )
}