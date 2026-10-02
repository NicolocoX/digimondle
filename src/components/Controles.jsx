import Buscador from "./Buscador";
import '../styles/Controles.css'
import { useContext } from "react";
import { PartidaContext } from "../contexts/partida";
import { ObjetivoContext } from "../contexts/objetivo";
import { JugadasContext } from "../contexts/jugadas";

export default function Controles() {
  const {
    rendirse,
    finPartida,
    partidaGanada,
    reiniciarPartida
  } = useContext(PartidaContext)

  const {
    cargandoObjetivo,
    cambiarObjetivo
  } = useContext(ObjetivoContext)

  const {
    limpiarJugadas
  } = useContext(JugadasContext)


  const reiniciar = async () => {
    await cambiarObjetivo()
    limpiarJugadas()
    reiniciarPartida()
  }


  return (
    <div className="controles">
      <Buscador />

      <button
        onClick={rendirse}
        type="button"
        disabled={finPartida || partidaGanada || cargandoObjetivo}>
        Rendirse
      </button>

      <button
        onClick={reiniciar}
        type="button"
        disabled={cargandoObjetivo}>
        Reiniciar
      </button>
    </div>
  )
}