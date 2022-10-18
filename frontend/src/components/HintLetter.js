import { PropTypes } from 'prop-types'

const HintLetter = ({ data, lineType }) => {
    let resultClassName = 'neverGuessed'

    if (lineType === 'hint') {
        if (data.status === 'unused') {
            resultClassName = 'unused'
        }
        else if (data.status === 'elsewhere') {
            resultClassName = 'elsewhere'
        }
        else {
            resultClassName = 'correct'
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