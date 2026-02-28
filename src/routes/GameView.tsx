import { useEffect, useMemo, useState, useCallback } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router'
import io from 'socket.io-client'
import { TicTacToeClient } from '../api'
import '../App.css'
import { type Game, type indexes, type Player } from '../game/game'
import { SERVER_URL } from '../utils/constants'


export function GameView() {
  const params = useParams()
  const gameID = params.gameID
  const nav = useNavigate()

  const api = useMemo(() => new TicTacToeClient(), [])
  const loadedGameData = useLoaderData<{ game: Game }>()

  const [game, setGame] = useState<Game>(loadedGameData.game)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [pressedCell, setPressedCell] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAnimationEnd = useCallback((index: number) => {
    if (pressedCell === index) {
      setPressedCell(null)
    }
  }, [pressedCell])

  async function clickCell(i: indexes) {
    if (!selectedPlayer) return
    if (game.currentPlayer !== selectedPlayer) return
    if (game.board[i] !== null) return
    if (game.endState) return

    setPressedCell(i)
    const ga = await api.makeMove(game.gameID, i)
    setGame(ga)
  }

  useEffect(() => {
    setGame(loadedGameData.game)
    const socket = io(SERVER_URL)

    if (!socket || !gameID) return;

    socket.on("connect", () => {
      socket.emit("join-game", gameID);

      socket.on("user-joined", (userID: string) => {
        console.log(`user ${userID} joined`)
      });

      socket.on("game-updated", (game: Game) => {
        setGame(game);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [gameID]);

  if (!game) {
    return (
      <div className='text-warm-gray text-xl'>Loading...</div>
    )
  }

  const isTie = (): boolean => {
    return game.endState === 'Tie';
  };

  async function newGame() {
    const createdGame = await api.createGame()
    nav("/game/" + createdGame.gameID)
  }

  function getCellClasses(index: number) {
    const value = game.board[index]
    const base = 'w-24 h-24 flex items-center justify-center text-4xl font-bold keycap'

    if (value) {
      const markClass = value === 'X' ? 'keycap-x' : 'keycap-o'
      return `${base} keycap-played ${markClass}`
    }

    const pressed = pressedCell === index ? 'keycap-pressed' : ''
    return `${base} ${pressed}`
  }

  const isMyTurn = selectedPlayer === game.currentPlayer

  return (
    <div className='flex flex-col items-center max-w-md mx-auto w-full'>

      {/* Top bar */}
      <div className='fixed top-10 left-20 right-20 flex justify-between items-center z-10'>
        <button
          onClick={() => nav("/")}
          className='keycap px-5 py-3 text-md text-matcha-dark font-semibold flex items-center gap-1'
        >
          <span>&#8592;</span> Lobby
        </button>
        <button
          onClick={copyLink}
          className='keycap px-5 py-3 text-md text-matcha-dark font-semibold'
        >
          {copied ? 'Copied!' : 'Share Link'}
        </button>
      </div>

      {/* Turn Indicator */}
      <div className='mb-4 text-lg font-semibold text-matcha-dark'>
        {game.endState
          ? ''
          : selectedPlayer
            ? isMyTurn
              ? "Your turn!"
              : "Waiting for opponent..."
            : "Select your player"
        }
      </div>

      {/* Game Board */}
      <div className='board-perspective mb-8'>
      <div className='board-inner grid grid-cols-3 gap-3 p-5 bg-matcha-light rounded-2xl'>
        {([0, 1, 2, 3, 4, 5, 6, 7, 8] as indexes[]).map((i) => (
          <div
            key={i}
            onClick={() => clickCell(i)}
            onAnimationEnd={() => handleAnimationEnd(i)}
            className={getCellClasses(i)}
          >
            {game.board[i]}
          </div>
        ))}
      </div>
      </div>

      {/* Game Result */}
      {game.endState && (
        <div className='text-2xl font-bold mb-6 text-center text-matcha-dark'>
          {isTie() ? "It's a tie!" : (
            <span>
              <span className={game.endState === 'X' ? 'text-strawberry' : 'text-matcha-text'}>
                {game.endState}
              </span>
              {' '}wins!
            </span>
          )}
        </div>
      )}

      {/* Player Selection Keys */}
      <div className='flex gap-6 mb-6'>
        <button
          onClick={() => setSelectedPlayer('X')}
          className={`w-20 h-20 player-key ${
            selectedPlayer === 'X'
              ? 'player-key-selected-x'
              : selectedPlayer === 'O'
                ? 'player-key-dimmed'
                : game.currentPlayer === 'X' && !selectedPlayer
                  ? 'player-key-active-turn'
                  : ''
          } ${selectedPlayer === 'X' && isMyTurn ? 'player-key-active-turn' : ''}`}
        >
          X
        </button>
        <button
          onClick={() => setSelectedPlayer('O')}
          className={`w-20 h-20 player-key ${
            selectedPlayer === 'O'
              ? 'player-key-selected-o'
              : selectedPlayer === 'X'
                ? 'player-key-dimmed'
                : game.currentPlayer === 'O' && !selectedPlayer
                  ? 'player-key-active-turn'
                  : ''
          } ${selectedPlayer === 'O' && isMyTurn ? 'player-key-active-turn' : ''}`}
        >
          O
        </button>
      </div>

      {/* New Game Button */}
      <div className='flex justify-center'>
        <button
          className='px-12 py-3 spacebar-key text-lg'
          onClick={() => newGame()}
        >
          New Game
        </button>
      </div>
    </div>
  )
}
