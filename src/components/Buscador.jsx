import Cascada from "./Cascada"

export default function Buscador({ resultados }) {
  const handleOnSubmit = (event) => {
    event.preventDefault()

    console.log("hola")
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label>Buscar: </label>
      <input />
      <Cascada resultados={resultados} />
    </form>
  )
}