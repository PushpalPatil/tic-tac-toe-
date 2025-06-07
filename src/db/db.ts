import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { TicTacToeApi } from '../api';
import { type Board, type EndState, type Game, type Player, type indexes, initializeGame, move } from '../game/game';
import { gamesTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!);



export class TicTacToeApiToDB implements TicTacToeApi {
    async createGame(): Promise<Game> {

        const game = initializeGame()
        const vals: typeof gamesTable.$inferInsert = game
        await db.insert(gamesTable).values(vals)

        return game

    }

    async makeMove(gameID: string, index: number): Promise<Game> {

        const game = await this.getGame(gameID)
        const newGame = move(game, index as indexes)
        const vals: typeof gamesTable.$inferInsert = newGame

        await db.update(gamesTable).set(vals).where(eq(gamesTable.gameID, gameID))

        return newGame
    }




    async getGame(gameID: string): Promise<Game> {

        const result = await db.select().from(gamesTable).where(eq(gamesTable.gameID, gameID))

        if (result.length === 0) {
            throw new Error("Game not found");

        }

        const game = result[0]

        return {
            gameID: game.gameID,
            board: game.board as Board,
            currentPlayer: game.currentPlayer as Player,
            endState: game.endState as EndState,
        }

    }

    async getGames(): Promise<Game[]> {
        const games = await db.select().from(gamesTable).limit(10)
        return games.map((game) => {
            return {
                gameID: game.gameID,
                board: game.board as Board,
                currentPlayer: game.currentPlayer as Player,
                endState: game.endState as EndState,
            }
        })
    }

}