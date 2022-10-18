import gameService from '../services/game'
import HintArea from './HintArea'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import KeyboardArea from './KeyboardArea'

const state = {
    playing: 'playing',
    gaveUp: 'gaveUp',
    solved: 'solved',
    ranOut: 'ranOut',
}

const Game = ({
    gameId, setGameId,
    gameState, setGameState,
    guess, setGuess,
    allHints, setAllHints,
    message, setMessage,
    shareUrl, setShareUrl }) => {

    const id = useParams().id

    const fetchGame = async id => {
        const [success, data] = await gameService.startGame(id)

        if (success) {
            setGameId(data.id)
            setGameState(state.playing)
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

            if (data.hints.every(hint => hint.status === 'correct')) {
                setGameState(state.solved)
                setMessage('Congratulations!')
            } else if (newAllHints.length === 6) {
                setGameState(state.ranOut)
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
        setGameState(state.gaveUp)
        await getSolution()
    }

    const handleNewGame = async () => {
        setGuess('')
        setAllHints([])
        setMessage('')
        await fetchGame(null)
    }

    const handleAddGuessLetter = letter => {
        if (gameState === state.playing) {
            setMessage('')
        }

        if (guess.length === 5) {
            return
        }

        setGuess(guess + letter)
    }

    const handleRemoveGuessLetter = () => {
        if (gameState === state.playing) {
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

        const result = gameState === state.solved ? allHints.length : '💩'
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

    const submitIsDisabled = guess.length !== 5 || gameState !== state.playing
    const giveUpIsDisabled = gameState !== state.playing
    const hideShareResultsClassName = gameState === state.playing ? 'hidden' : ''

    return (<div className="root">
        <HintArea allHints={allHints} guess={guess} />
        <div id="messageDiv" className="message root-child">{message}</div>
        <KeyboardArea allHints={allHints} addGuessLetter={handleAddGuessLetter} removeGuessLetter={handleRemoveGuessLetter} />
        <div className="buttonArea root-child">
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
