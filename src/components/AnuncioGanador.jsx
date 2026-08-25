import "./AnuncioGanador.css"

export default function AnuncioGanador({ nombre, imagen, setFinPartida }) {
  return (
    <div className="anuncio-ganador" onClick={() => setFinPartida(false)}>
      <div className="anuncio-ganador-modal">
        <h1>¡HAS GANADO!</h1>
        <img src={imagen} alt={nombre} />
        <span>Encontraste a {nombre}</span>
      </div>
    </div>
  )
}