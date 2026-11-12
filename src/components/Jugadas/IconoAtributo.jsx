import "../../styles/jugadas/IconoAtributo.css"
import dataSVG from "../../assets/Data.svg?react"
import vaccineSVG from "../../assets/Vaccine.svg?react"
import virusSVG from "../../assets/Virus.svg?react"
import noDataSVG from "../../assets/NoData.svg?react"
import unknownSVG from "../../assets/Unknown.svg?react"
import variableSVG from "../../assets/Variable.svg?react"
import freeSVG from "../../assets/Free.svg?react"


const iconosAtributo = {
  Data: dataSVG,
  Vaccine: vaccineSVG,
  Virus: virusSVG,
  Free: freeSVG,
  Variable: variableSVG,
  Unknown: unknownSVG,
  "No Data": noDataSVG
}


export default function IconoAtributo({ nombre }) {
  const Icono = iconosAtributo[nombre]

  return (
    <div title={nombre}>
      <Icono
        className="icono-atributo"
        title={nombre} />
    </div>
  )
}