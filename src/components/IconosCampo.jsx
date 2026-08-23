import "./IconosCampo.css"

export default function IconosCampo({ listaIconos }) {
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
          <img key={index} src={icono.url} alt={icono.nombre} title={icono.nombre} />
        )
      })}
    </div>
  )
}