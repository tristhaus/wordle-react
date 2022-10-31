import { GameState } from '../immutable/state'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, handleSubmit, handleGiveUp, handleNewGame } from '../reducers/game'

const ButtonArea = () => {

    const dispatch = useDispatch()
    const shareUrl = useSelector(state => state.game.shareUrl)
    const allHints = useSelector(state => state.game.allHints)
    const gameState = useSelector(state => state.game.state)
    const guess = useSelector(state => state.game.guess)

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

    const gameIsOver = gameState !== GameState.playing
    const submitIsDisabled = guess.length !== 5 || gameIsOver
    const giveUpIsDisabled = gameIsOver
    const showShareResults = gameIsOver

    return (<div className="buttonArea">
        <div>
            <button id="submitButton" disabled={submitIsDisabled} className="button" onClick={() => dispatch(handleSubmit())}>Submit</button>
        </div>
        <div>
            <button id="giveUpButton" disabled={giveUpIsDisabled} className="button" onClick={() => dispatch(handleGiveUp())}>Give up</button>
            <button id="newGameButton" className="button" onClick={() => dispatch(handleNewGame())}>New game</button>
        </div>
        <div>
            <button id="shareLinkButton" className="button" onClick={handleShareLink}>Share game</button>
            {showShareResults && (<button id="shareResultsButton" className="button" onClick={handleShareResults}>Share results</button>)}
        </div>
    </div>)
}

ButtonArea.displayName = 'ButtonArea'

export default ButtonArea
