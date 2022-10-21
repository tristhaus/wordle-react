import { PropTypes } from 'prop-types'
import { LetterState } from '../immutable/state'

const HintLetter = ({ data, lineType }) => {
    let resultClassName = LetterState.neverGuessed

    if (lineType === 'hint') {
        if (data.status === LetterState.unused) {
            resultClassName = LetterState.unused
        }
        else if (data.status === LetterState.elsewhere) {
            resultClassName = LetterState.elsewhere
        }
        else {
            resultClassName = LetterState.correct
        }
    }

    return (
        <div className={`hintLetter ${resultClassName}`}>
            {data.letter.toUpperCase()}
        </div>
    )
}

HintLetter.displayName = 'HintLetter'

HintLetter.propTypes = {
    data: PropTypes.shape({
        letter: PropTypes.string.isRequired,
        status: PropTypes.string
    }),
    lineType: PropTypes.string.isRequired
}

export default HintLetter