//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { TicTacToeMemory } from "./src/api";

const app = express();
app.use(express.json())
const api = new TicTacToeMemory()

app.get("/message", (_, res) => res.send("Hello from express!"));

app.get("/api/game/:gameID", async (req, res) =>{
    const game = await api.getGame(req.params.gameID)
    res.json(game)
})

app.post("/api/game/", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})

app.post("/api/game/:gameID/move", async(req, res) =>{
    const game = await api.makeMove(req.params.gameID, req.body.index)
    res.json(game)
})


ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));