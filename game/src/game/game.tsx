
export type Board = PlayerCell[][]
export type Player = 'x' |'o'
export type Endstate = Player | 'Tie' | undefined
export type PlayerCell = Player | null
export type PlayerPosition = {
    row: number, 
    col: number
}

export type Game = {
    board: Board,
    currentPlayer: 'x'
}


export const gameState = (): Game =>{
    const game: Game = {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        currentPlayer: 'x'
    }
    return game
}

