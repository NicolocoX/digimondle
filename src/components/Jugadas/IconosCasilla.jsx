import "../../styles/jugadas/IconosCasilla.css"
import IconoAtributo from "./IconoAtributo"


const getColumnas = (cantIconos) => {
  if (cantIconos > 2) return "auto auto auto"
  else if (cantIconos > 1) return "auto auto"
  else return "auto"
}


export default function IconosCasilla({ listaIconos }) {
  const margen = (listaIconos.length > 9) ? "30" : "0"
  const cantColumnas = getColumnas(listaIconos.length)
  const esAtributo = typeof listaIconos[0] === "string"

  return (
    <div className={esAtributo ? "iconos-casilla atributo" : "iconos-casilla"}
      style={{ marginTop: `${margen}px`, gridTemplateColumns: cantColumnas }}>
      {listaIconos.map((icono, index) => {
        return (
          esAtributo
            ? <IconoAtributo nombre={icono} />
            : <img key={index} src={icono.url} alt={icono.nombre} title={icono.nombre} />
        )
      })}
    </div>
  )
}