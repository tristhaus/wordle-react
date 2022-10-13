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
        if(gameState === state.playing)
        {
            setMessage('')
        }

        if (guess.length === 5) {
            return
        }

        setGuess(guess + letter)
    }

    const handleRemoveGuessLetter = () => {
        if(gameState === state.playing)
        {
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

    const submitIsDisabled = guess.length !== 5 || gameState !== state.playing
    const giveUpIsDisabled = gameState !== state.playing

    return (<div style={{ marginRight: 'auto', marginLeft: 'auto', width: '400px' }}>
        <div style={{ textAlign: 'center' }}>
            <HintArea allHints={allHints} guess={guess} />
        </div>
        <div id="messageDiv" style={{ minHeight: '1.2em', margin: '0.5em', textAlign: 'center' }} >{message}</div>
        <div style={{ textAlign: 'center' }}>
            <KeyboardArea allHints={allHints} addGuessLetter={handleAddGuessLetter} removeGuessLetter={handleRemoveGuessLetter} />
            <br />
            <button id="submitButton" disabled={submitIsDisabled} style={{ margin: '0.5em' }} onClick={handleSubmit}>Submit</button>
            <br />
            <button id="giveUpButton" disabled={giveUpIsDisabled} style={{ margin: '0.5em' }} onClick={handleGiveUp}>Give up</button>
            <button id="newGameButton" style={{ margin: '0.5em' }} onClick={handleNewGame}>New game</button>
            <br />
            <button id="shareLinkButton" style={{ margin: '0.5em' }} onClick={handleShareLink}>Share game</button>
        </div>
    </div>
    )
}

export default Game
