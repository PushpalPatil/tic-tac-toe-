import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { TicTacToeClient } from './api'
import { type Game, type indexes } from './game/game'

export function GameView() {

  const api = useMemo(() => new TicTacToeClient(), [])

  const [game, setGame] = useState<Game | undefined>() 

  async function initializeGame(){
    const initialState = await api.createGame()
    setGame(initialState)
  }

  useEffect(()=>{
    initializeGame()
  }, [])

  async function clickCell(i : indexes){
    const ga = await api.makeMove(game!.gameID, i)
    setGame(ga)
  }

  if(!game){
    return(
      <div>Loading ... </div>
    )
  }

  const isTie = (): boolean => {
    return game.endState === 'Tie';
  };

  return(

      <div className='gameboard'> 
        
        <div className='row'>
          <div onClick={ () => clickCell(0)} className='cell'>{game.board[0]}</div>
          <div onClick={ () => clickCell(1)} className='cell'>{game.board[1]}</div>
          <div onClick={ () => clickCell(2)} className='cell'>{game.board[2]}</div>
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
        <div  className='result'>
          {isTie() ? 'Tie!' : `${game.endState} Wins!`} 
        </div>
        }
        
      </div>
  )
}