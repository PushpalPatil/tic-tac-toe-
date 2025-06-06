import { useEffect, useMemo, useState } from 'react'
import { useLoaderData, useParams } from 'react-router'
import { TicTacToeClient } from '../api'
import '../App.css'
import { type Game, type indexes } from '../game/game'
import io from 'socket.io-client';
import { NewGame } from './NewGame'


export function GameView() {
  // const gameID = useLoaderData<string>()

  const params = useParams()
  const gameID = params.gameID

  const api = useMemo(() => new TicTacToeClient(), [])
  const loadedGameData = useLoaderData<{ game: Game }>()
  console.log("loaded game data: ", loadedGameData)
  const [game, setGame] = useState<Game>(loadedGameData.game)
  //const [game, setGame] = useState<Game | undefined>()

  async function clickCell(i: indexes) {
    const ga = await api.makeMove(game!.gameID, i)
    setGame(ga)
  }
  // get pre-loaded data by router loader function - destructuring it and renaming it to initialGame



  // instead of initializing a game, i need to GET the :gameID game from the database
  // async function getGame(gameId: string) {
  //   const gameState = await api.getGame(gameId)
  //   setGame(gameState)
  // }

  useEffect(() => {

    const socket = io("http://localhost:3000")
    socket.on("connect", () => {
      console.log("connected to socket");
      socket.emit("join-game", gameID);
      socket.on("user-joined", (userID: string) => {
        console.log(`user ${userID} joined`)
      });
      socket.on("game-updated", (game: string) => {
        console.log("game updated", game)
      })
    });

    return () => {
      socket.disconnect();
    };
    // if (!gameID) redirect("/")

    // else {
    //   getGame(gameID)
    // }
  }, [gameID]);



  if (!game) {
    return (
      <div>Loading ... </div>
    )
  }

  const isTie = (): boolean => {
    return game.endState === 'Tie';
  };

  return (

    <div className='gameboard'>

      <div className='row'>
        <div onClick={() => clickCell(0)} className='cell'>{game.board[0]}</div>
        <div onClick={() => clickCell(1)} className='cell'>{game.board[1]}</div>
        <div onClick={() => clickCell(2)} className='cell'>{game.board[2]}</div>
      </div>
      <div className="row">
        <div onClick={() => clickCell(3)} className="cell">{game.board[3]}</div>
        <div onClick={() => clickCell(4)} className="cell">{game.board[4]}</div>
        <div onClick={() => clickCell(5)} className="cell">{game.board[5]}</div>
      </div>
      <div className="row">
        <div onClick={() => clickCell(6)} className="cell">{game.board[6]}</div>
        <div onClick={() => clickCell(7)} className="cell">{game.board[7]}</div>
        <div onClick={() => clickCell(8)} className="cell">{game.board[8]}</div>
      </div>

      {
        game.endState &&
        <div className='result'>
          {isTie() ? 'Tie!' : `${game.endState} Wins!`}
        </div>
      }
    <div className='newClass'>
      <button className='newGame' onClick={() => NewGame}>New Game</button>
    </div>
    </div>
  )
}