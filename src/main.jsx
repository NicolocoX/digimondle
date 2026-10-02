import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css"
import { JuegoProvider } from "./contexts/juego";
import { ObjetivoProvider } from "./contexts/objetivo";

const root = createRoot(document.getElementById("app"))
root.render(
  <JuegoProvider>
    <ObjetivoProvider>
      <App />
    </ObjetivoProvider>
  </JuegoProvider>
)