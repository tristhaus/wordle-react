import gameService from '../services/game'
import { LetterState, GameState } from '../immutable/state'
import HintArea from './HintArea'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import KeyboardArea from './KeyboardArea'
import OverlayMessageBox from './OverlayMessageBox'
import HelpContent from './HelpContent'

const Game = ({
    gameId, setGameId,
    gameState, setGameState,
    guess, setGuess,
    allHints, setAllHints,
    message, setMessage,
    shareUrl, setShareUrl,
    showHelp, setShowHelp }) => {

    const id = useParams().id

    const fetchGame = async id => {
        const [success, data] = await gameService.startGame(id)

        if (success) {
            setGameId(data.id)
            setGameState(GameState.playing)
            setMessage('Make your first guess!')
            setShareUrl(`${data.deploymentUrl}/${data.wordId}`)
        }
        else {
            setMessage(`Not a known game ID: ${id}`)
        }
    }

    const getSolution = async () => {
        const [success, data] = await gameService.getSolution(gameId)

        if (success) {
            setMessage(`Solution was: ${data.solution}`)
        }
        else {
            setMessage(`error "${data.error}"`)
        }

        setGuess('')
    }

    useEffect(() => {
        fetchGame(id)
    }, [])

    const handleSubmit = async () => {
        const [success, data] = await gameService.makeGuess(gameId, guess)

        if (success) {
            const newAllHints = allHints.concat([data.hints])
            setAllHints(newAllHints)

            if (data.hints.every(hint => hint.status === LetterState.correct)) {
                setGameState(GameState.solved)
                setMessage('Congratulations!')
            } else if (newAllHints.length === 6) {
                setGameState(GameState.ranOut)
                await getSolution()
            } else {
                setMessage('')
            }
        }
        else {
            if (data.error === 'not a word') {
                setMessage(`"${guess}" is not a valid word`)
            }
            else {
                setMessage(`error "${data.error}"`)
            }
        }

        setGuess('')
    }

    const handleGiveUp = async () => {
        setGameState(GameState.gaveUp)
        await getSolution()
    }

    const handleNewGame = async () => {
        setGuess('')
        setAllHints([])
        setMessage('')
        await fetchGame(null)
    }

    const handleAddGuessLetter = letter => {
        if (gameState === GameState.playing) {
            setMessage('')
        }

        if (guess.length === 5) {
            return
        }

        setGuess(guess + letter)
    }

    const handleRemoveGuessLetter = () => {
        if (gameState === GameState.playing) {
            setMessage('')
        }

        if (guess.length === 0) {
            return
        }

        setGuess(guess.substring(0, guess.length - 1))
    }

    const handleShareLink = () => {
        navigator.clipboard.writeText(shareUrl)
        setMessage('Link copied to clipboard!')
    }

    const handleShareResults = () => {

        const title = 'Wordle (using React)'

        const result = gameState === GameState.solved ? allHints.length : '💩'
        const resultLine = `${result}/6`

        const hintLines = allHints.map(line => line.map(data => {
            if (data.status === 'unused') {
                return '⬛'
            }
            else if (data.status === 'elsewhere') {
                return '🟨'
            }
            else {
                return '🟩'
            }
        }).join('')
        ).join('\n')

        const totalContent = [title, resultLine, hintLines, shareUrl].join('\n')
        navigator.clipboard.writeText(totalContent)
        setMessage('Results copied to clipboard!')
    }

    const toggleShowHelp = () => {
        setShowHelp(!showHelp)
    }

    const submitIsDisabled = guess.length !== 5 || gameState !== GameState.playing
    const giveUpIsDisabled = gameState !== GameState.playing
    const hideShareResultsClassName = gameState === GameState.playing ? 'hidden' : ''

    return (<div className="root">
        <div className="helpButtonArea">
            <button className="helpButton" onClick={() => toggleShowHelp()}>?</button>
        </div>
        {showHelp && (<OverlayMessageBox label="OK" action={() => toggleShowHelp()} beModal={false}>
            <HelpContent />
        </OverlayMessageBox>)}
        <HintArea allHints={allHints} guess={guess} />
        <div id="messageDiv" className="message">{message}</div>
        <KeyboardArea allHints={allHints} addGuessLetter={handleAddGuessLetter} removeGuessLetter={handleRemoveGuessLetter} />
        <div className="buttonArea">
            <div>
                <button id="submitButton" disabled={submitIsDisabled} className="button" onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <button id="giveUpButton" disabled={giveUpIsDisabled} className="button" onClick={handleGiveUp}>Give up</button>
                <button id="newGameButton" className="button" onClick={handleNewGame}>New game</button>
            </div>
            <div>
                <button id="shareLinkButton" className="button" onClick={handleShareLink}>Share game</button>
                <button id="shareResultsButton" className={`button ${hideShareResultsClassName}`} onClick={handleShareResults}>Share results</button>
            </div>
        </div>
    </div>
    )
}

export default Game
