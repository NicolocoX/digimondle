import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css"
import { JuegoProvider } from "./contexts/juego";
import { ObjetivoProvider } from "./contexts/objetivo";
import { PartidaProvider } from "./contexts/partida";

const root = createRoot(document.getElementById("app"))
root.render(
  <JuegoProvider>
    <ObjetivoProvider>
      <PartidaProvider>
        <App />
      </PartidaProvider>
    </ObjetivoProvider>
  </JuegoProvider>
)