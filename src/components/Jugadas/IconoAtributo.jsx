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


export default function IconoAtributo({ nombre }) {
  return (
    <img src={iconosAtributo[nombre]} alt={nombre} title={nombre} />
  )
}