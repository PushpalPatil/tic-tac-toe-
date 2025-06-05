import { useLoaderData } from 'react-router'
import '../App.css'


export function GameLobby(){

    // eventually this should be an array of games
    const games = useLoaderData<string[]>()

    return (
    <div>I am the game lobby
        {games.map((game) => <div key={game}><a href="/game/081ea5df-afb5-4c98-9136-06b1575a2725">{game}</a></div>)}
    </div>)

}