const API_URL = "https://digi-api.com/api/v1/digimon/"

export default function App() {
  const handleOnSubmit = (event) => {
    event.preventDefault()

    console.log("hola")


  }

  return (
    <main>
      <h1>Digimondle</h1>
      <form onSubmit={handleOnSubmit}>
        <label>Buscar: </label>
        <input></input>
      </form>
    </main>
  )
}