import React from "react";
import { createRoot, Root } from "react-dom/client"
import App from "./App"

const rootElement: Root = createRoot(document.getElementById("root") as HTMLElement)
rootElement.render(<App />)