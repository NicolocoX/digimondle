import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css"
import { JugadasProvider } from "./contexts/jugadas";
import { ObjetivoProvider } from "./contexts/objetivo";
import { PartidaProvider } from "./contexts/partida";

const root = createRoot(document.getElementById("app"))
root.render(
  <JugadasProvider>
    <ObjetivoProvider>
      <PartidaProvider>
        <App />
      </PartidaProvider>
    </ObjetivoProvider>
  </JugadasProvider>
)