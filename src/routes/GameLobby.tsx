import { useLoaderData, useNavigate } from 'react-router'
import '../App.css'
import { type Game } from '../game/game'

export function GameLobby() {

    const games = useLoaderData<Game[]>()
    const navigate = useNavigate()

    // make new game object from game.ts and call it's UUID
    console.log("heres my game list:", games)

    return (
        <div className='Lobby' > Lobby

            <div className='GameList'>
                Let's Play TicTacToe! Choose a game

                <div className='ChooseGame'>
                    {games.map((game) => {
                        return (
                            <button onClick={() => navigate("/game/" + game.gameID)} >  {(game.gameID.substring(0, 3))} </button>
                        )
                    })}

                </div>

            </div>

        </div>

    )

}
