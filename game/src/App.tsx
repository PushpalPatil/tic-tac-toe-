import { useState } from 'react'
import './App.css'
import './gameAlgo/game'
import { gameState } from './gameAlgo/game'

function App() {
  

  const [game, setGame] = useState(gameState())
  // let [player, setPlayer] = useState('')

  // function assignPlayerX(){
  //   setPlayer = 'X'
  // }
  return (
    <>
    <div className='app'> </div>
      <div className='gameContainer'>
        <h1 className='title'>Welcome to TicTacToe </h1>

        <div className='info'>

          <div className='currentPlayer'>
            Current Player: <span className={`player-indicator player-${game.currentPlayer}`}>{game.currentPlayer.toUpperCase()}</span>
          </div>
          {/* <div>
            <button style = {{marginRight:'10px', marginTop: '1rem'}} onClick={assignPlayerX}> X</button>
            <button style = {{marginLeft:'10px', marginTop: '1rem'}}> O </button>

          </div> */}

            
          
          {game.endState && (
            <div className='gameResult'>
              {game.endState === 'Tie' ? 'TIE' : `Player ${game.endState.toUpperCase()} wins!`}
            </div>
          )}
        </div>
        <div className='board'>
          {game.board.map((row, rowIndex) =>
            row.map((cell, colIndex) =>(
              <div
                key = {`${rowIndex} - ${colIndex}`}
                className= {`cell ${cell ? `cell-${cell}` : ''}`}
                onClick={() => {
                  setGame(prev => move(prev, {row: rowIndex, col: colIndex}))
                }}
              > 
                {cell ? cell.toUpperCase():''}
              </div>
            ))
          
          )}

        </div>
      </div>
    </>
  )
}

export default App
