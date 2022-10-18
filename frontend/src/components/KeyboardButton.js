import { PropTypes } from 'prop-types'

const unused = 'unused'
const elsewhere = 'elsewhere'
const correct = 'correct'

const KeyboardButton = ({ id, label, status, action }) => {

    let resultClassName = 'neverGuessed'

    if (status === unused) {
        resultClassName = 'unused'
    }
    else if (status === elsewhere) {
        resultClassName = 'elsewhere'
    }
    else if (status === correct) {
        resultClassName = 'correct'
    }

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
