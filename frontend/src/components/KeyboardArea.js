import { PropTypes } from 'prop-types'
import KeyboardButton from './KeyboardButton'

const unused = 'unused'
const elsewhere = 'elsewhere'
const correct = 'correct'
const neverGuessed = 'neverGuessed'

const KeyboardArea = ({ allHints, addGuessLetter, removeGuessLetter }) => {

    const getStatus = letter => {
        const evaluation = value => {
            return allHints.some(hintSet => hintSet.some(hint => hint.letter === letter && hint.status === value)) ? value : null
        }

        return evaluation(correct) || evaluation(elsewhere) || evaluation(unused) || neverGuessed
    }

    return (
        <div className='keyboardArea'>
            <div>
                <KeyboardButton id="keyboardQ" label={'q'} status={getStatus('q')} action={() => { addGuessLetter('q') }} />
                <KeyboardButton id="keyboardW" label={'w'} status={getStatus('w')} action={() => { addGuessLetter('w') }} />
                <KeyboardButton id="keyboardE" label={'e'} status={getStatus('e')} action={() => { addGuessLetter('e') }} />
                <KeyboardButton id="keyboardR" label={'r'} status={getStatus('r')} action={() => { addGuessLetter('r') }} />
                <KeyboardButton id="keyboardT" label={'t'} status={getStatus('t')} action={() => { addGuessLetter('t') }} />
                <KeyboardButton id="keyboardY" label={'y'} status={getStatus('y')} action={() => { addGuessLetter('y') }} />
                <KeyboardButton id="keyboardU" label={'u'} status={getStatus('u')} action={() => { addGuessLetter('u') }} />
                <KeyboardButton id="keyboardI" label={'i'} status={getStatus('i')} action={() => { addGuessLetter('i') }} />
                <KeyboardButton id="keyboardO" label={'o'} status={getStatus('o')} action={() => { addGuessLetter('o') }} />
                <KeyboardButton id="keyboardP" label={'p'} status={getStatus('p')} action={() => { addGuessLetter('p') }} />
            </div>
            <div>
                <KeyboardButton id="keyboardA" label={'a'} status={getStatus('a')} action={() => { addGuessLetter('a') }} />
                <KeyboardButton id="keyboardS" label={'s'} status={getStatus('s')} action={() => { addGuessLetter('s') }} />
                <KeyboardButton id="keyboardD" label={'d'} status={getStatus('d')} action={() => { addGuessLetter('d') }} />
                <KeyboardButton id="keyboardF" label={'f'} status={getStatus('f')} action={() => { addGuessLetter('f') }} />
                <KeyboardButton id="keyboardG" label={'g'} status={getStatus('g')} action={() => { addGuessLetter('g') }} />
                <KeyboardButton id="keyboardH" label={'h'} status={getStatus('h')} action={() => { addGuessLetter('h') }} />
                <KeyboardButton id="keyboardJ" label={'j'} status={getStatus('j')} action={() => { addGuessLetter('j') }} />
                <KeyboardButton id="keyboardK" label={'k'} status={getStatus('k')} action={() => { addGuessLetter('k') }} />
                <KeyboardButton id="keyboardL" label={'l'} status={getStatus('l')} action={() => { addGuessLetter('l') }} />
            </div>
            <div>
                <KeyboardButton id="keyboardDel" label={'⌫'} status={neverGuessed} action={removeGuessLetter} />
                <KeyboardButton id="keyboardZ" label={'z'} status={getStatus('z')} action={() => { addGuessLetter('z') }} />
                <KeyboardButton id="keyboardX" label={'x'} status={getStatus('x')} action={() => { addGuessLetter('x') }} />
                <KeyboardButton id="keyboardC" label={'c'} status={getStatus('c')} action={() => { addGuessLetter('c') }} />
                <KeyboardButton id="keyboardV" label={'v'} status={getStatus('v')} action={() => { addGuessLetter('v') }} />
                <KeyboardButton id="keyboardB" label={'b'} status={getStatus('b')} action={() => { addGuessLetter('b') }} />
                <KeyboardButton id="keyboardN" label={'n'} status={getStatus('n')} action={() => { addGuessLetter('n') }} />
                <KeyboardButton id="keyboardM" label={'m'} status={getStatus('m')} action={() => { addGuessLetter('m') }} />
            </div>
        </div>
    )
}

KeyboardArea.displayName = 'KeyboardArea'

KeyboardArea.propTypes = {
    allHints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        letter: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }))),
    addGuessLetter: PropTypes.func.isRequired,
    removeGuessLetter: PropTypes.func.isRequired,
}

export default KeyboardArea
