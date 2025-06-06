import { useLoaderData } from 'react-router'
import '../App.css'
import { initializeGame, type Game, type indexes } from '../game/game'
import { TicTacToeClient } from '../api'
import { gamesTable } from '../db/schema'
import { useState } from 'react'

export function GameLobby(){

    const api = new TicTacToeClient()
    
    
    const gamesAr = useLoaderData<{games: Game[]}>()

    const [games, setGames] = useState<Game[]>(gamesAr.games)
    
    let uniqueID = games.gameID

    console.log(uniqueID)

    // make new game object from game.ts and call it's UUID


    // eventually this should be an array of games
    //const games = useLoaderData<{games: []}>()

    async function gameChosen(){
        // const newG = initializeGame()
        // let uniqueID = newG.gameID
        const chosen = await api.getGame(uniqueID)
        return chosen
    }

    return (
    <div className='Lobby' > Lobby

    <div className='GameList'>
        Let's Play TicTacToe! Choose a game
        
        <div className='ChooseGame'>
            <div onClick={()=> gameChosen()} className='gameChosen'>{uniqueID.substring(0,3)}</div>
        </div>

        {/* <div onClick={() => */}
        {/* {games.map((game) => <div key={game.gameID}><a href="/game/081ea5df-afb5-4c98-9136-06b1575a2725">{game}</a></div>)} */}
    </div>

    </div>

)

}




    /* const api = new TicTacToeClient()
    
    const games = api.getGames()

    const loadedLobbyGames = useLoaderData<{games: []}>()

    try {
    // Fetch games from your API
    const response = await fetch('http://localhost:3000/api/games'); // Adjust URL to match your server
    const games = await response.json();
    return games;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return []; // Return empty array on error
  }

  return (
    <div>I am the game lobby
        {games.map(game) => 
        <div key={game}>
            <a href="/game/081ea5df-afb5-4c98-9136-06b1575a2725">
            {game}
            </a>
        </div>)}
    </div>
    ) */
