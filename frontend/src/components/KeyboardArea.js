import { LetterState } from '../immutable/state'
import { useSelector, useDispatch } from 'react-redux'
import { handleAddGuessLetter, handleRemoveGuessLetter } from '../reducers/game'
import KeyboardButton from './KeyboardButton'

const KeyboardArea = () => {

    const dispatch = useDispatch()
    const allHints = useSelector(state => state.game.allHints)

    const getStatus = letter => {
        const evaluation = value => {
            return allHints.some(hintSet => hintSet.some(hint => hint.letter === letter && hint.status === value)) ? value : null
        }

        return evaluation(LetterState.correct) || evaluation(LetterState.elsewhere) || evaluation(LetterState.unused) || LetterState.neverGuessed
    }

    return (
        <div className='keyboardArea'>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardQ" label={'Q'} status={getStatus('q')} action={() => dispatch(handleAddGuessLetter('q'))} />
                <KeyboardButton id="keyboardW" label={'W'} status={getStatus('w')} action={() => dispatch(handleAddGuessLetter('w'))} />
                <KeyboardButton id="keyboardE" label={'E'} status={getStatus('e')} action={() => dispatch(handleAddGuessLetter('e'))} />
                <KeyboardButton id="keyboardR" label={'R'} status={getStatus('r')} action={() => dispatch(handleAddGuessLetter('r'))} />
                <KeyboardButton id="keyboardT" label={'T'} status={getStatus('t')} action={() => dispatch(handleAddGuessLetter('t'))} />
                <KeyboardButton id="keyboardY" label={'Y'} status={getStatus('y')} action={() => dispatch(handleAddGuessLetter('y'))} />
                <KeyboardButton id="keyboardU" label={'U'} status={getStatus('u')} action={() => dispatch(handleAddGuessLetter('u'))} />
                <KeyboardButton id="keyboardI" label={'I'} status={getStatus('i')} action={() => dispatch(handleAddGuessLetter('i'))} />
                <KeyboardButton id="keyboardO" label={'O'} status={getStatus('o')} action={() => dispatch(handleAddGuessLetter('o'))} />
                <KeyboardButton id="keyboardP" label={'P'} status={getStatus('p')} action={() => dispatch(handleAddGuessLetter('p'))} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardA" label={'A'} status={getStatus('a')} action={() => dispatch(handleAddGuessLetter('a'))} />
                <KeyboardButton id="keyboardS" label={'S'} status={getStatus('s')} action={() => dispatch(handleAddGuessLetter('s'))} />
                <KeyboardButton id="keyboardD" label={'D'} status={getStatus('d')} action={() => dispatch(handleAddGuessLetter('d'))} />
                <KeyboardButton id="keyboardF" label={'F'} status={getStatus('f')} action={() => dispatch(handleAddGuessLetter('f'))} />
                <KeyboardButton id="keyboardG" label={'G'} status={getStatus('g')} action={() => dispatch(handleAddGuessLetter('g'))} />
                <KeyboardButton id="keyboardH" label={'H'} status={getStatus('h')} action={() => dispatch(handleAddGuessLetter('h'))} />
                <KeyboardButton id="keyboardJ" label={'J'} status={getStatus('j')} action={() => dispatch(handleAddGuessLetter('j'))} />
                <KeyboardButton id="keyboardK" label={'K'} status={getStatus('k')} action={() => dispatch(handleAddGuessLetter('k'))} />
                <KeyboardButton id="keyboardL" label={'L'} status={getStatus('l')} action={() => dispatch(handleAddGuessLetter('l'))} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardDel" label={'⌫'} status={LetterState.neverGuessed} action={() => dispatch(handleRemoveGuessLetter())} />
                <KeyboardButton id="keyboardZ" label={'Z'} status={getStatus('z')} action={() => dispatch(handleAddGuessLetter('z'))} />
                <KeyboardButton id="keyboardX" label={'X'} status={getStatus('x')} action={() => dispatch(handleAddGuessLetter('x'))} />
                <KeyboardButton id="keyboardC" label={'C'} status={getStatus('c')} action={() => dispatch(handleAddGuessLetter('c'))} />
                <KeyboardButton id="keyboardV" label={'V'} status={getStatus('v')} action={() => dispatch(handleAddGuessLetter('v'))} />
                <KeyboardButton id="keyboardB" label={'B'} status={getStatus('b')} action={() => dispatch(handleAddGuessLetter('b'))} />
                <KeyboardButton id="keyboardN" label={'N'} status={getStatus('n')} action={() => dispatch(handleAddGuessLetter('n'))} />
                <KeyboardButton id="keyboardM" label={'M'} status={getStatus('m')} action={() => dispatch(handleAddGuessLetter('m'))} />
            </div>
        </div>
    )
}

KeyboardArea.displayName = 'KeyboardArea'

export default KeyboardArea
