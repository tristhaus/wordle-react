import { PropTypes } from 'prop-types'

const unused = 'unused'
const elsewhere = 'elsewhere'
const correct = 'correct'

const KeyboardButton = ({ id, label, status, action }) => {
    const style = {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white',
        fontFamily: 'sans-serif'
    }

    if (status === unused) {
        style.backgroundColor = 'gray'
    } else if (status === elsewhere) {
        style.backgroundColor = 'yellow'
    }
    else if (status === correct) {
        style.backgroundColor = 'green'
    }

    return (
        <button id={id} className="keyboardButton" style={style} onClick={action}>{label}</button>
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
