import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { TicTacToeApiToDB } from './src/db/db';

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));

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




// Use httpServer instead of app
const server = app.listen( 3000, () => console.log("Server is listening..."));


const io = new Server(server , {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Socket.io event handlers
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-game', (gameID) => {
        socket.join(gameID);
        console.log(`User ${socket.id} joined game ${gameID}`);
    });

    socket.on('make-move', async (data) => {
        const { gameID, index } = data;
        try {
            const updatedGame = await api.makeMove(gameID, index);
            // Broadcast to all players in the game room
            io.to(gameID).emit('game-updated', updatedGame);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});