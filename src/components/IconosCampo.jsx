export default function IconosCampo({ listaIconos }) {
  return (
    <div>
      {listaIconos.map((icono, index) => {
        return (
          <img key={index} src={icono} />
        )
      })}
    </div>
  )
}