import { useContext } from "react"
import { ObjetivoContext } from "../contexts/objetivo"
import { JugadasContext } from "../contexts/jugadas"
import { PartidaContext } from "../contexts/partida"


export default function useJugar() {
  const {objetivo} = useContext(ObjetivoContext)
  const {agregarJugada} = useContext(JugadasContext)
  const {finPartida, ganar} = useContext(PartidaContext)

    const jugar = async (url) => {
    const newDigimon = await agregarJugada(url)

    if (objetivo && !finPartida && newDigimon.id === objetivo.id) {
      ganar()
    }
  }

  return{jugar}
}