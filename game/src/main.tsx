import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css';
import Layout from './Layout';
import { GameView } from './routes/Game';
import { GameLobby } from './routes/GameLobby';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: GameLobby,
        loader: async () => {
          // WHAT THE FUCK DOES THIS DO??? HOW DOES THE ROUTE GET THE DATA?????
          const games = Array(9).fill(null).map((obj, idx) => `Game${idx}`)
          return games
        }
      },
      {
        path: "/easteregg",
        Component: () => <div>Hello from the easter egg component</div>,
      },
      {
        path: "/game/:gameID",
        Component: GameView,
      },
    ],
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
