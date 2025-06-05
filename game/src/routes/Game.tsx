import { useEffect, useMemo, useState } from 'react'
import { redirect, useParams } from 'react-router'
import { TicTacToeClient } from '../api'
import '../App.css'
import { type Game, type indexes } from '../game/game'

export function GameView() {
  // const gameID = useLoaderData<string>()
  const params = useParams()
  const gameID = params.gameID

  const api = useMemo(() => new TicTacToeClient(), [])
  const [game, setGame] = useState<Game | undefined>()

  // instead of initializing a game, i need to GET the :gameID game from the database
  async function getGame(gameId: string) {
    const gameState = await api.getGame(gameId)
    setGame(gameState)
  }

  useEffect(() => {
    if (!gameID) redirect("/")
    else {
      getGame(gameID)
    }
  }, [gameID])

  async function clickCell(i: indexes) {
    const ga = await api.makeMove(game!.gameID, i)
    setGame(ga)
  }

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

    </div>
  )
}