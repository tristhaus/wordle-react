import { PropTypes } from 'prop-types'

const KeyboardButton = ({ id, label, status, action }) => {

    const resultClassName = status

    return (
        <button id={id} className={`keyboardButton ${resultClassName}`} onClick={action}>{label}</button>
    )
}

KeyboardButton.displayName = 'KeyboardButton'

KeyboardButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
}

export default KeyboardButton
