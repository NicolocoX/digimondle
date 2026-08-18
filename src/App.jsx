import busquedaResultado from "./mocks/busquedaResultados.json"
import busquedaNoResultado from "./mocks/busquedaNoResultados.json"
import Buscador from "./components/Buscador"

const API_URL = "https://digi-api.com/api/v1/digimon/"

export default function App() {
  const resultados = busquedaResultado.content

  return (
    <main>
      <h1>Digimondle</h1>

      <Buscador resultados={resultados} />
    </main>
  )
}