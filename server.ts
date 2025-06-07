import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { TicTacToeApiToDB } from './src/db/db';
import { Game } from "./src/game/game";


const app = express();
app.use(express.json())
app.use(cors());

const server = app.listen(3000, () => console.log("Server is listening..."));
const makeRoomID = (gameRoom: Game) => `${gameRoom.gameID}`;


// Fix: Create HTTP server properly
//const httpServer = createServer(app);

const api = new TicTacToeApiToDB()
// Your existing REST endpoints
app.get("/api/game/:gameID", async (req, res) => {
    const game = await api.getGame(req.params.gameID)
    res.json(game)
})

app.post("/api/game/", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})
app.post("/api/game/:gameID/move", async (req, res) => {
    const game = await api.makeMove(req.params.gameID, req.body.index)
    io.to(makeRoomID(game)).emit("game-updated", game)
    res.json(game)
})

// GAME LOBBY
app.get("/api/games", async (req, res) => {
    const games = await api.getGames()
    res.json(games)
})


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io event handlers
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-game', async (gameID: string) => {
        const joined = await api.getGame(gameID);
        if (!joined) {
            console.error(`Couldn't join game: ${gameID}`);
            return;
        }


        const roomID = makeRoomID(joined)
        socket.join(roomID);
        console.log(`User ${socket.id} joined game ${gameID}`);
        io.to(roomID).emit("user-joined", socket.id)

    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});