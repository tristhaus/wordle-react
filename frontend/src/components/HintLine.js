import { PropTypes } from 'prop-types'
import HintLetter from './HintLetter'

const HintLine = ({ data, lineType }) => {
    const style = {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    }

    return (
        <div style={style} className='hintLine'>
            <HintLetter data={data[0]} lineType={lineType}/>
            <HintLetter data={data[1]} lineType={lineType}/>
            <HintLetter data={data[2]} lineType={lineType}/>
            <HintLetter data={data[3]} lineType={lineType}/>
            <HintLetter data={data[4]} lineType={lineType}/>
        </div>
    )
}

HintLine.displayName = 'HintLine'

HintLine.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        letter: PropTypes.string.isRequired,
        status: PropTypes.string
    })),
    lineType: PropTypes.string.isRequired
}

export default HintLine