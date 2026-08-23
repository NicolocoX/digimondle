import "./IconosCampo.css"

export default function IconosCampo({ listaIconos }) {
  const margen = (listaIconos.length > 9) ? "30" : "0"


  return (
    <div className="iconos-campo" style={{ marginTop: `${margen}px` }}>
      {listaIconos.map((icono, index) => {
        return (
          <img key={index} src={icono} />
        )
      })}
    </div>
  )
}