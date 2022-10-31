import { LetterState } from '../immutable/state'
import { useSelector, useDispatch } from 'react-redux'
import { addLetterToGuess, removeLastLetterFromGuess } from '../reducers/game'
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
                <KeyboardButton id="keyboardQ" label={'Q'} status={getStatus('q')} action={() => dispatch(addLetterToGuess('q'))} />
                <KeyboardButton id="keyboardW" label={'W'} status={getStatus('w')} action={() => dispatch(addLetterToGuess('w'))} />
                <KeyboardButton id="keyboardE" label={'E'} status={getStatus('e')} action={() => dispatch(addLetterToGuess('e'))} />
                <KeyboardButton id="keyboardR" label={'R'} status={getStatus('r')} action={() => dispatch(addLetterToGuess('r'))} />
                <KeyboardButton id="keyboardT" label={'T'} status={getStatus('t')} action={() => dispatch(addLetterToGuess('t'))} />
                <KeyboardButton id="keyboardY" label={'Y'} status={getStatus('y')} action={() => dispatch(addLetterToGuess('y'))} />
                <KeyboardButton id="keyboardU" label={'U'} status={getStatus('u')} action={() => dispatch(addLetterToGuess('u'))} />
                <KeyboardButton id="keyboardI" label={'I'} status={getStatus('i')} action={() => dispatch(addLetterToGuess('i'))} />
                <KeyboardButton id="keyboardO" label={'O'} status={getStatus('o')} action={() => dispatch(addLetterToGuess('o'))} />
                <KeyboardButton id="keyboardP" label={'P'} status={getStatus('p')} action={() => dispatch(addLetterToGuess('p'))} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardA" label={'A'} status={getStatus('a')} action={() => dispatch(addLetterToGuess('a'))} />
                <KeyboardButton id="keyboardS" label={'S'} status={getStatus('s')} action={() => dispatch(addLetterToGuess('s'))} />
                <KeyboardButton id="keyboardD" label={'D'} status={getStatus('d')} action={() => dispatch(addLetterToGuess('d'))} />
                <KeyboardButton id="keyboardF" label={'F'} status={getStatus('f')} action={() => dispatch(addLetterToGuess('f'))} />
                <KeyboardButton id="keyboardG" label={'G'} status={getStatus('g')} action={() => dispatch(addLetterToGuess('g'))} />
                <KeyboardButton id="keyboardH" label={'H'} status={getStatus('h')} action={() => dispatch(addLetterToGuess('h'))} />
                <KeyboardButton id="keyboardJ" label={'J'} status={getStatus('j')} action={() => dispatch(addLetterToGuess('j'))} />
                <KeyboardButton id="keyboardK" label={'K'} status={getStatus('k')} action={() => dispatch(addLetterToGuess('k'))} />
                <KeyboardButton id="keyboardL" label={'L'} status={getStatus('l')} action={() => dispatch(addLetterToGuess('l'))} />
            </div>
            <div className='keyboardLine'>
                <KeyboardButton id="keyboardDel" label={'⌫'} status={LetterState.neverGuessed} action={() => dispatch(removeLastLetterFromGuess())} />
                <KeyboardButton id="keyboardZ" label={'Z'} status={getStatus('z')} action={() => dispatch(addLetterToGuess('z'))} />
                <KeyboardButton id="keyboardX" label={'X'} status={getStatus('x')} action={() => dispatch(addLetterToGuess('x'))} />
                <KeyboardButton id="keyboardC" label={'C'} status={getStatus('c')} action={() => dispatch(addLetterToGuess('c'))} />
                <KeyboardButton id="keyboardV" label={'V'} status={getStatus('v')} action={() => dispatch(addLetterToGuess('v'))} />
                <KeyboardButton id="keyboardB" label={'B'} status={getStatus('b')} action={() => dispatch(addLetterToGuess('b'))} />
                <KeyboardButton id="keyboardN" label={'N'} status={getStatus('n')} action={() => dispatch(addLetterToGuess('n'))} />
                <KeyboardButton id="keyboardM" label={'M'} status={getStatus('m')} action={() => dispatch(addLetterToGuess('m'))} />
            </div>
        </div>
    )
}

KeyboardArea.displayName = 'KeyboardArea'

export default KeyboardArea
