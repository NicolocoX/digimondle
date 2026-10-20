import "../styles/Bienvenida.css"

export default function Bienvenida() {
  return (
    <div className="bienvenida">
      <p>¡Bienvenido a Digimondle! Un juego de navegador inspirado en Wordle y basado en Digimon.</p>
      <p>Tu objetivo es encontrar al Digimon secreto en la menor cantidad de intentos posible. Para comenzar, selecciona
        cualquier Digimon en el buscador. A continuación, se mostrarán sus características en casillas de colores que te
        darán pistas sobre cuánto coincide con el Digimon secreto.</p>
      <ul>
        <li>
          <span style={{ color: "var(--color-correcto)", fontWeight: "bold" }}>Verde</span>: la característica coincide.
        </li>
        <li>
          <span style={{ color: "var(--color-semicorrecto)", fontWeight: "bold" }}>Amarillo</span>: la coincidencia es parcial.
        </li>
        <li>
          <span style={{ color: "var(--color-incorrecto)", fontWeight: "bold" }}>Rojo</span>: la característica no coincide.
        </li>
      </ul>
      <p>¡Utiliza las pistas de cada intento para descubrir al Digimon secreto!</p>
    </div>
  )
}