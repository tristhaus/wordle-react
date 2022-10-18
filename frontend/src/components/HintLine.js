import { PropTypes } from 'prop-types'
import HintLetter from './HintLetter'

const HintLine = ({ data, lineType }) => {
    return (
        <div className="hintLine">
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