import { useState } from 'react'
import './App.css'
import { initializeGame, move, type indexes } from './game/game'

function App() {
  
  const [game, setGame] = useState(initializeGame())

  // when cell is clicked on, return how the board was previously + the extra move. 
  const clickCell = (i : indexes) => {
    if(game.endState) return
    setGame(prev => move(prev, i))
  }

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
      {game.endState && <div className='result'>{game.endState} wins!</div>}
    
    </div> 
  )

}

export default App
