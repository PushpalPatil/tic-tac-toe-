
export type Board = PlayerCell[][]
export type Player = 'x' |'o'
export type EndState = Player | 'Tie' | undefined
export type PlayerCell = Player | null
export type PlayerPosition = {
    row: number, 
    col: number
}

export type Game = {
    board: Board,
    currentPlayer : Player,
    endState?: EndState
}

export type CellCoordinate = {
    row: number,
    col: number
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

function changePlayer(currentPlayer:Player){
    if(currentPlayer === 'x') return 'o'
    else return 'x'
}


export function move(game: Game, selectedCellsCoords: CellCoordinate):Game{

    const nextGame = structuredClone(game)
    let selectedCell = nextGame.board[selectedCellsCoords.row][selectedCellsCoords.col]
    if(selectedCell) return nextGame
    nextGame.board[selectedCellsCoords.row][selectedCellsCoords.col] = game.currentPlayer
    selectedCell = nextGame.currentPlayer
    return {...nextGame, currentPlayer: changePlayer(nextGame.currentPlayer), endState: calculateWin(nextGame)}
    
}




function calculateWin(game:Game) : EndState {
    const {board} = game;

    for(let i = 0; i<3; i++){
        
        if(board[i][0] 
            && board[i][1] === board[i][0]
            && board[i][1] === board[i][2]
        ){
            
            return board[i][0] as Player
        }
        if(board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            
            return board[0][i] as Player
        }

    }
    if(board[0][0] && board[1][1] === board[0][0] && board[1][1] === board[2][2]){
        return board[0][0] as Player
    }

    if(board[0][2] && board[0][2] === board[1][1] && board[2][0]){
        return board[0][2]
        
    }
    

    //let isBoardFull = false

    const rowsFull = board.every(row => row != null )
    const colFull = board.every(col => col!= null )

    if(rowsFull === true && colFull === true){
        
        return 'Tie';
    }

    return undefined
}