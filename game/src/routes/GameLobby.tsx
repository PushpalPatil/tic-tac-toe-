import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import '../App.css'
import { type Game } from '../game/game'

export function GameLobby() {

    const gamesAr = useLoaderData<Game[]>()
    const navigate = useNavigate()

    const [games, setGames] = useState<Game[]>(gamesAr)
    // make new game object from game.ts and call it's UUID
    console.log("heres my game list:", games)

    // eventually this should be an array of games
    //const games = useLoaderData<{games: []}>()]
    function gameChosen(game: Game) {
        navigate("/game/" + game.gameID)
    }

    return (
        <div className='Lobby' > Lobby

            <div className='GameList'>
                Let's Play TicTacToe! Choose a game

                <div className='ChooseGame'>
                    {games.map((game) => {
                        return (
                            <button onClick={() => gameChosen(game)} >  {(game.gameID.substring(0, 3))} </button>
                        )
                    })}

                </div>

            </div>

        </div>

    )

}
