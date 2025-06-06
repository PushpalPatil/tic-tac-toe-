import { useEffect, useMemo, useState } from 'react'
import { useLoaderData, useParams } from 'react-router'
import { type Game, type indexes } from '../game/game'

export function NewGame(){
    
    const allGames = useLoaderData<{ game: Game }>()
    const params = useParams()
    const gameID = params.gameID

    // const newGame = 
    return (
        <div>
            This should be a new game!
        </div>
    )
}