import Cascada from "./Cascada"
import "./Buscador.css"

export default function Buscador({ resultados }) {
  const handleOnSubmit = (event) => {
    event.preventDefault()

    console.log("hola")
  }

  return (
    <form className="buscador" onSubmit={handleOnSubmit}>
      <div className="entrada">
        <label>Buscar: </label>
        <input />
      </div>

      <Cascada resultados={resultados} />
    </form>
  )
}