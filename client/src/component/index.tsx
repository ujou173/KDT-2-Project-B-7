import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App"

const rootElement = createRoot(document.getElementById("root") as HTMLElement)
rootElement.render(<App />)