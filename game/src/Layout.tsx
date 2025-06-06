import { Outlet } from 'react-router'
import './App.css'

function Layout() {
  
  //const [game, setGame] = useState(initializeGame())

  // when cell is clicked on, return how the board was previously + the extra move. 
  // const clickCell = (i : indexes) => {

  //   if(game.endState) return
  //   setGame(prev => move(prev, i))
  // }

  return(
    <>
    <div className='wrap'>
      <h1 className='title'> Welcome to TicTacToe! </h1>
      <Outlet />
    </div>
    </>
  )

}

export default Layout
