
export type Board =  [cell, cell, cell, cell, cell, cell, cell, cell, cell]
export type Player = 'X' |'O'
export type EndState = 'X' |'O' | 'Tie' | undefined
export type cell = Player | null

export type indexes =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Game = {
    gameID: string,
    board: Board,
    currentPlayer: Player,
    endState?: EndState
}

const xWon = (game:Game) => playerWins(game, 'X')

const oWon = (game:Game) => playerWins(game, 'O')


export const initializeGame = (): Game =>{
    
    return{
        gameID: crypto.randomUUID(),
        board: [null, null, null, null, null, null, null, null, null],
        currentPlayer: 'X',
        endState: undefined,
    }
}

// define all wins
const wins: indexes[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

function playerWins(game:Game, player:Player):boolean{
    
    for(let i = 0; i<wins.length; i++){
        const winState = wins[i];
        let cellsInWinState = true;

        for(let j = 0; j<winState.length; j++){
            const indexOfCell = winState[j];

            if(game.board[indexOfCell] != player){
                cellsInWinState = false;
                break;
            }
        }

        if(cellsInWinState) return true;

    }

    return false;
}

function calculateEndState(game: Game) : EndState{
    if(game.board.every((cell) => cell !== null)) return 'Tie'
    if(xWon(game)) return 'X'
    if(oWon(game)) return 'O'

    return undefined
}

export function move(game: Game, position: indexes): Game{
    if(game.board[position] != null){
        return game
    }

    const next = structuredClone(game)
    next.board[position] = game.currentPlayer
    next.currentPlayer = next.currentPlayer === 'X' ? 'O' : 'X'
    next.endState = calculateEndState(next)

    return next
}