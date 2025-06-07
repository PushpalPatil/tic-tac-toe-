import { jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import type { Board } from "../game/game";


// export type Game = {
//     gameID: string,
//     board: Board,
//     currentPlayer: Player,
//     endState?: EndState
// }

export const gamesTable = pgTable("games", {
  gameID: varchar({length:255}).primaryKey(),
  board: jsonb().$type<Board>().notNull(),
  currentPlayer: varchar({length:255}).notNull(),
  endState: varchar({ length: 255 }),
});
