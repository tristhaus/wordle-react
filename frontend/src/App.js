import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'
import { useState } from 'react'
import Game from './components/Game'

const App = () => {
    const [gameId, setGameId] = useState(null)
    const [gameState, setGameState] = useState(null)
    const [guess, setGuess] = useState('')
    const [allHints, setAllHints] = useState([])
    const [message, setMessage] = useState('')
    const [shareUrl, setShareUrl] = useState('')

    return (
        <Router>
            <Routes>
                <Route path="/:id" element={
                    <Game
                        gameId={gameId} setGameId={setGameId}
                        gameState={gameState} setGameState={setGameState}
                        guess={guess} setGuess={setGuess}
                        allHints={allHints} setAllHints={setAllHints}
                        message={message} setMessage={setMessage}
                        shareUrl={shareUrl} setShareUrl={setShareUrl}
                    />
                } />
                <Route path="/" element={
                    <Game
                        gameId={gameId} setGameId={setGameId}
                        gameState={gameState} setGameState={setGameState}
                        guess={guess} setGuess={setGuess}
                        allHints={allHints} setAllHints={setAllHints}
                        message={message} setMessage={setMessage}
                        shareUrl={shareUrl} setShareUrl={setShareUrl}
                    />
                } />
            </Routes>
        </Router>
    )
}

export default App
