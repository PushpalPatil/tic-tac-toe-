import { useState } from 'react'

import './App.css'
import './game/game'

function App() {
  

  const [game, setGame] = useState(gameState())

  return (
    <>
    <div className='App'> </div>
      <div className='gameContainer'>
        <h1 className='title'>Welcome to TicTacToe</h1>
        <h2 className='currentPlayer'>
          Current Player: <span className={`player-indicator player-${game.currentPlayer}`} /> 
        </h2>


        
      </div>
    </>
  )
}

export default App
