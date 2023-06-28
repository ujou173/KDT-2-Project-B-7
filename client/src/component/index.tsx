import React from "react";
import { createRoot, Root } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import { io, Socket } from "socket.io-client";
import './index.css'

const serverSocket: Socket = io();
const chatSocket: Socket = io('/chat');
const moveSocket: Socket = io('/character-move');

export const SocketContext = React.createContext({chatSocket, moveSocket, serverSocket});

const rootElement: Root = createRoot(document.getElementById("root") as HTMLElement)
rootElement.render(
  <SocketContext.Provider value={{chatSocket, moveSocket, serverSocket}}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </SocketContext.Provider>
  )