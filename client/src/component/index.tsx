import React from "react";
import { createRoot, Root } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import './index.css'




const rootElement: Root = createRoot(document.getElementById("root") as HTMLElement)
rootElement.render(
    <Router>
      <App />
    </Router>
  )