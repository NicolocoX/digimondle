import "../../styles/jugadas/IconosCasilla.css"
import dataSVG from "../../assets/Data.svg"
import vaccineSVG from "../../assets/Vaccine.svg"
import virusSVG from "../../assets/Virus.svg"
import noDataSVG from "../../assets/NoData.svg"
import unknownSVG from "../../assets/Unknown.svg"
import variableSVG from "../../assets/Variable.svg"
import freeSVG from "../../assets/Free.svg"


const iconosAtributo = {
  Data: dataSVG,
  Vaccine: vaccineSVG,
  Virus: virusSVG,
  Free: freeSVG,
  Variable: variableSVG,
  Unknown: unknownSVG,
  "No Data": noDataSVG
}


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
            ? <img key={index} src={iconosAtributo[icono]} alt={icono} title={icono} />
            : <img key={index} src={icono.url} alt={icono.nombre} title={icono.nombre} />
        )
      })}
    </div>
  )
}