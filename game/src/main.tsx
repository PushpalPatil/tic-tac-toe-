import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import { TicTacToeClient } from './api';
import './index.css';
import Layout from './Layout';
import { GameLobby } from './routes/GameLobby';
import { GameView } from './routes/GameView';

const api = new TicTacToeClient()
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
          const gamesArray = await api.getGames()
          console.log("Games Received")
          //const games =   Array(9).fill(null).map((obj, idx) => `Game${idx}`)
          return gamesArray
        }
      },
      {
        path: "/easteregg",
        Component: () => <div>Hello from the easter egg component</div>,
      },
      {
        path: "/game/:gameID",
        Component: GameView,
        loader: async (loaderData) => {
          if (!loaderData.params.gameID) {
            throw new Error("no game id specified.")
          }
          const gLoaded = await api.getGame(loaderData.params.gameID)
          const result = { game: gLoaded }
          return result

          // looks like { game: { ... a Game object here... }}
        }
      },

    ],
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
