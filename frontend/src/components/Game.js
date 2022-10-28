import { GameState } from '../immutable/state'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HintArea from './HintArea'
import KeyboardArea from './KeyboardArea'
import OverlayMessageBox from './OverlayMessageBox'
import HelpContent from './HelpContent'
import { handleToggleShowHelp } from '../reducers/showHelp'
import { setMessage, fetchGame, handleSubmit, handleNewGame, handleGiveUp } from '../reducers/game'

const Game = () => {

    const id = useParams().id

    useEffect(() => {
        dispatch(fetchGame(id))
    }, [])

    const dispatch = useDispatch()
    const shareUrl = useSelector(state => state.game.shareUrl)
    const allHints = useSelector(state => state.game.allHints)

    const handleShareLink = () => {
        navigator.clipboard.writeText(shareUrl)
        dispatch(setMessage('Link copied to clipboard!'))
    }

    const handleShareResults = () => {
        const title = 'Wordle (using React/Redux)'

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
        dispatch(setMessage('Results copied to clipboard!'))
    }

    const showHelp = useSelector(state => state.showHelp.value)
    const gameState = useSelector(state => state.game.state)
    const guess = useSelector(state => state.game.guess)
    const message = useSelector(state => state.game.message)

    const submitIsDisabled = guess.length !== 5 || gameState !== GameState.playing
    const giveUpIsDisabled = gameState !== GameState.playing
    const hideShareResultsClassName = gameState === GameState.playing ? 'hidden' : ''

    return (<div className="root">
        <div className="helpButtonArea">
            <button className="helpButton" onClick={() => dispatch(handleToggleShowHelp())}>?</button>
        </div>
        {showHelp && (<OverlayMessageBox label="OK" action={() => dispatch(handleToggleShowHelp())} beModal={false}>
            <HelpContent />
        </OverlayMessageBox>)}
        <HintArea />
        <div id="messageDiv" className="message">{message}</div>
        <KeyboardArea />
        <div className="buttonArea">
            <div>
                <button id="submitButton" disabled={submitIsDisabled} className="button" onClick={() => dispatch(handleSubmit())}>Submit</button>
            </div>
            <div>
                <button id="giveUpButton" disabled={giveUpIsDisabled} className="button" onClick={() => dispatch(handleGiveUp())}>Give up</button>
                <button id="newGameButton" className="button" onClick={() => dispatch(handleNewGame())}>New game</button>
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
