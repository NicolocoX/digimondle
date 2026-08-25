export default function AnuncioGanador({ nombre, imagen }) {
  return (
    <div>
      <h1>¡HAS GANADO!</h1>
      <img src={imagen} alt={nombre} />
      <span>Encontraste a {nombre}</span>
    </div>
  )
}