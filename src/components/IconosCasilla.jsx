import "../styles/IconosCasilla.css"
import dataSVG from "../assets/Data.svg"
import vaccineSVG from "../assets/Vaccine.svg"
import virusSVG from "../assets/Virus.svg"
import noDataSVG from "../assets/NoData.svg"
import unknownSVG from "../assets/Unknown.svg"
import variableSVG from "../assets/Variable.svg"
import freeSVG from "../assets/Free.svg"

const iconosAtributo = {
  Data: dataSVG,
  Vaccine: vaccineSVG,
  Virus: virusSVG,
  Free: freeSVG,
  Variable: variableSVG,
  Unknown: unknownSVG,
  "No Data": noDataSVG
}

export default function IconosCasilla({ listaIconos }) {
  const margen = (listaIconos.length > 9) ? "30" : "0"

  const getColumnas = () => {
    if (listaIconos.length > 2) return "auto auto auto"
    else if (listaIconos.length > 1) return "auto auto"
    else return "auto"
  }
  const cantColumnas = getColumnas()

  return (
    <div className="iconos-campo"
      style={{ marginTop: `${margen}px`, gridTemplateColumns: cantColumnas }}>
      {listaIconos.map((icono, index) => {
        return (
          typeof icono === "string"
            ? <img key={index} src={iconosAtributo[icono]} alt={icono} title={icono} /> // no hay imagen para "sin información"
            : <img key={index} src={icono.url} alt={icono.nombre} title={icono.nombre} />
        )
      })}
    </div>
  )
}