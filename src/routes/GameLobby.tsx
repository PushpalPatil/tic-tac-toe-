import { useMemo } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { TicTacToeClient } from '../api'
import '../App.css'
import { type Game } from '../game/game'

export function GameLobby() {

    const games = useLoaderData<Game[]>()
    const navigate = useNavigate()
    const api = useMemo(() => new TicTacToeClient(), [])

    async function createGame() {
        const game = await api.createGame()
        navigate("/game/" + game.gameID)
    }

    return (
        <div className='flex flex-col items-center max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-matcha-dark mb-8'>Game Lobby</h2>

            <div className='bg-white rounded-2xl p-8 w-full shadow-lg border border-matcha-light'>
                <p className='text-xl text-semibold text-matcha-dark  mb-10 text-center'>
                    Let's play! Choose a game, then share the link with your friend!
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {games.map((game, index) => {
                        return (
                            <button
                                key={game.gameID}
                                onClick={() => navigate("/game/" + game.gameID)}
                                className='keycap px-4 py-3 text-warm-gray font-semibold'
                            >
                                Game #{index + 1}
                            </button>
                        )
                    })}
                </div>

                <div className='flex justify-center mt-6'>
                    <button
                        onClick={createGame}
                        className='px-12 py-3 spacebar-key text-lg'
                    >
                        Create New Game
                    </button>
                </div>
            </div>
        </div>
    )
}
