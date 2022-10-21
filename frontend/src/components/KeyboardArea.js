import { PropTypes } from 'prop-types'
import { LetterState } from '../immutable/state'
import KeyboardButton from './KeyboardButton'

const KeyboardArea = ({ allHints, addGuessLetter, removeGuessLetter }) => {

    const getStatus = letter => {
        const evaluation = value => {
            return allHints.some(hintSet => hintSet.some(hint => hint.letter === letter && hint.status === value)) ? value : null
        }

        return evaluation(LetterState.correct) || evaluation(LetterState.elsewhere) || evaluation(LetterState.unused) || LetterState.neverGuessed
    }

    return (
        <div className='keyboardArea'>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardQ" label={'Q'} status={getStatus('q')} action={() => { addGuessLetter('q') }} />
                <KeyboardButton id="keyboardW" label={'W'} status={getStatus('w')} action={() => { addGuessLetter('w') }} />
                <KeyboardButton id="keyboardE" label={'E'} status={getStatus('e')} action={() => { addGuessLetter('e') }} />
                <KeyboardButton id="keyboardR" label={'R'} status={getStatus('r')} action={() => { addGuessLetter('r') }} />
                <KeyboardButton id="keyboardT" label={'T'} status={getStatus('t')} action={() => { addGuessLetter('t') }} />
                <KeyboardButton id="keyboardY" label={'Y'} status={getStatus('y')} action={() => { addGuessLetter('y') }} />
                <KeyboardButton id="keyboardU" label={'U'} status={getStatus('u')} action={() => { addGuessLetter('u') }} />
                <KeyboardButton id="keyboardI" label={'I'} status={getStatus('i')} action={() => { addGuessLetter('i') }} />
                <KeyboardButton id="keyboardO" label={'O'} status={getStatus('o')} action={() => { addGuessLetter('o') }} />
                <KeyboardButton id="keyboardP" label={'P'} status={getStatus('p')} action={() => { addGuessLetter('p') }} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardA" label={'A'} status={getStatus('a')} action={() => { addGuessLetter('a') }} />
                <KeyboardButton id="keyboardS" label={'S'} status={getStatus('s')} action={() => { addGuessLetter('s') }} />
                <KeyboardButton id="keyboardD" label={'D'} status={getStatus('d')} action={() => { addGuessLetter('d') }} />
                <KeyboardButton id="keyboardF" label={'F'} status={getStatus('f')} action={() => { addGuessLetter('f') }} />
                <KeyboardButton id="keyboardG" label={'G'} status={getStatus('g')} action={() => { addGuessLetter('g') }} />
                <KeyboardButton id="keyboardH" label={'H'} status={getStatus('h')} action={() => { addGuessLetter('h') }} />
                <KeyboardButton id="keyboardJ" label={'J'} status={getStatus('j')} action={() => { addGuessLetter('j') }} />
                <KeyboardButton id="keyboardK" label={'K'} status={getStatus('k')} action={() => { addGuessLetter('k') }} />
                <KeyboardButton id="keyboardL" label={'L'} status={getStatus('l')} action={() => { addGuessLetter('l') }} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardDel" label={'⌫'} status={LetterState.neverGuessed} action={removeGuessLetter} />
                <KeyboardButton id="keyboardZ" label={'Z'} status={getStatus('z')} action={() => { addGuessLetter('z') }} />
                <KeyboardButton id="keyboardX" label={'X'} status={getStatus('x')} action={() => { addGuessLetter('x') }} />
                <KeyboardButton id="keyboardC" label={'C'} status={getStatus('c')} action={() => { addGuessLetter('c') }} />
                <KeyboardButton id="keyboardV" label={'V'} status={getStatus('v')} action={() => { addGuessLetter('v') }} />
                <KeyboardButton id="keyboardB" label={'B'} status={getStatus('b')} action={() => { addGuessLetter('b') }} />
                <KeyboardButton id="keyboardN" label={'N'} status={getStatus('n')} action={() => { addGuessLetter('n') }} />
                <KeyboardButton id="keyboardM" label={'M'} status={getStatus('m')} action={() => { addGuessLetter('m') }} />
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
