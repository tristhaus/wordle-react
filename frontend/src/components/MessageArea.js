import { useSelector } from 'react-redux'

const MessageArea = () => {

    const message = useSelector(state => state.game.message)

    return (<div id="messageDiv" className="message">{message}</div>)
}

MessageArea.displayName = 'MessageArea'

export default MessageArea