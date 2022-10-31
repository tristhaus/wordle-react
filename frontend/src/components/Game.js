import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OverlayMessageBox from './OverlayMessageBox'
import HelpContent from './HelpContent'
import HintArea from './HintArea'
import MessageArea from './MessageArea'
import KeyboardArea from './KeyboardArea'
import ButtonArea from './ButtonArea'
import { handleToggleShowHelp } from '../reducers/showHelp'
import { fetchGame } from '../reducers/game'

const Game = () => {

    const id = useParams().id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGame(id))
    }, [])

    const showHelp = useSelector(state => state.showHelp.value)

    return (<div className="root">
        <div className="helpButtonArea">
            <button className="helpButton" onClick={() => dispatch(handleToggleShowHelp())}>?</button>
        </div>
        {showHelp && (<OverlayMessageBox label="OK" action={() => dispatch(handleToggleShowHelp())} beModal={false}>
            <HelpContent />
        </OverlayMessageBox>)}
        <HintArea />
        <MessageArea />
        <KeyboardArea />
        <ButtonArea />
    </div>
    )
}

export default Game
