import { PropTypes } from 'prop-types'

const HintLetter = ({ data, lineType }) => {
    const style = {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        border: 'solid',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    }

    if (lineType === 'hint') {
        if (data.status === 'unused') {
            style.backgroundColor = 'gray'
        }
        else if (data.status === 'elsewhere') {
            style.backgroundColor = 'yellow'
        }
        else {
            style.backgroundColor = 'green'
        }
    }
    else {
        style.backgroundColor = 'white'
    }

    return (
        <span style={style} className='hintLetter'>{data.letter}</span>
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