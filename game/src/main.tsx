import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, BrowserRouter, RouterProvider} from "react-router";
import { GameView } from './GameView.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "./game/game.tsx/:gameID",
        Component: GameView,
      },
      {
        path: "/",
        Component: GameLobby, 
      }
    ],
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>

  </StrictMode>,
)
