import "./Casilla.css"

export default function Casilla({ children, tipo = "" }) {
  const esLista = Array.isArray(children)
  let texto = esLista ? children.join("\n") : children


  if (esLista && children.length > 5) {
    texto = "\n" + texto
  }

  return (
    <div className={`casilla${tipo}`}>
      {texto}
    </div>
  )
}