import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css"
import { JuegoProvider } from "./contexts/juego";

const root = createRoot(document.getElementById("app"))
root.render(
  <JuegoProvider>
    <App />
  </JuegoProvider>
)