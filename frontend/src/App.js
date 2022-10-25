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
    const [showHelp, setShowHelp] = useState(false)

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
                        showHelp={showHelp} setShowHelp={setShowHelp}
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
                        showHelp={showHelp} setShowHelp={setShowHelp}
                    />
                } />
            </Routes>
        </Router>
    )
}

export default App
