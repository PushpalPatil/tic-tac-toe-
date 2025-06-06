import { type Game, type indexes, initializeGame, move } from './game/game'

export interface TicTacToeApi {
    // contract between client & server
    createGame(): Promise<Game>
    makeMove(gameID: string, index: number): Promise<Game>
    getGame(gameID: string): Promise<Game>
}

export class TicTacToeMemory implements TicTacToeApi {

    /*
    - Store games in memory (likely using a Map or object)
    - Generate unique game IDs
    - Validate moves and update game state
    - Handle game retrieval

    An async function implicitly returns a promise and can, in its body, 
    await other promises in a way that looks synchronous.
    */

    private gamesMap: Map<string, Game> = new Map()


    async createGame(): Promise<Game> {
        const version = initializeGame()
        // key = version.gameID
        // value = version
        this.gamesMap.set(version.gameID, version)

        return version;
    }
    async makeMove(gameID: string, index: number): Promise<Game> {
        // returns the new game after a move has been made. 
        const game = await this.getGame(gameID)

        const newGame = move(game, index as indexes)
        this.gamesMap.set(gameID, newGame)

        return newGame;
    }
    async getGame(gameID: string): Promise<Game> {
        /*  Await can be put in front of an expression to wait for a promise to resolve 
        and ONLY THEN continue executing the function.

        If promise rejects, then an exception raised at the point of the await. */

        const game = this.gamesMap.get(gameID)
        if (!game) throw new Error("Game not found")

        return game
    }

}


const BASE_URL = "http://localhost:3000"

export class TicTacToeClient implements TicTacToeApi {
    async createGame(): Promise<Game> {

        const response = await fetch(`${BASE_URL}/api/game/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const game = await response.json()
        return game
    }

    async getGames(): Promise<Game[]> {
        const response = await fetch(`${BASE_URL}/api/games`)
        const games = await response.json()
        return games
    }
    async makeMove(gameID: string, index: number): Promise<Game> {
        const response = await fetch(`${BASE_URL}/api/game/${gameID}/move`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ index })
            }
        )

        const game = await response.json()
        return game
    }
    async getGame(gameID: string): Promise<Game> {

        const response = await fetch(`${BASE_URL}/api/game/${gameID}`)
        const game = await response.json()
        return game
    }

}