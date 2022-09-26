import gameService from '../services/game'
import HintArea from './HintArea'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const state = {
    playing: 'playing',
    gaveUp: 'gaveUp',
    solved: 'solved',
    ranOut: 'randOut',
}

const Game = ({
    gameId, setGameId,
    gameState, setGameState,
    guess, setGuess,
    allHints, setAllHints,
    message, setMessage }) => {

    const id = useParams().id

    const fetchGame = async id => {
        const [success, data] = await gameService.startGame(id)

        if (success) {
            setGameId(data.id)
            setGameState(state.playing)
            setMessage('')
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

    const submitIsDisabled = guess.length !== 5 || gameState !== state.playing
    const giveUpIsDisabled = gameState !== state.playing

    return (<div style={{ marginRight: 'auto', marginLeft: 'auto', width: '200px' }}>
        <div>
            <HintArea allHints={allHints} guess={guess} />
        </div>
        <div id="messageDiv" style={{ minHeight: '1em', margin: '0.5em' }} >{message}</div>
        <div>
            <input type="text" id="guessText" maxLength={5} value={guess} name="Input" style={{ margin: '0.5em' }} onChange={({ target }) => setGuess(target.value)} />
            <br />
            <button id="submitButton" disabled={submitIsDisabled} style={{ margin: '0.5em' }} onClick={handleSubmit}>Submit</button>
            <br />
            <button id="giveUpButton" disabled={giveUpIsDisabled} style={{ margin: '0.5em' }} onClick={handleGiveUp}>Give up</button>
        </div>
    </div>
    )
}

export default Game
