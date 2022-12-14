import { useSelector } from 'react-redux'
import HintLine from './HintLine'

const HintArea = () => {
    const guess = useSelector(state => state.game.guess)
    const allHints = useSelector(state => state.game.allHints)

    const transformedGuess = guess.split('').map(char => { return { letter: char } })

    const filledInput = transformedGuess
        .concat(Array(Math.max(5 - transformedGuess.length)).fill({ letter: '' }))

    const data = allHints.map(value => value)
        .concat([filledInput])
        .concat(Array(Math.max(5 - allHints.length, 0)).fill(Array(5).fill({ letter: '' })))

    const lineType = allHints.map(() => 'hint')
        .concat('guess')
        .concat(Array(Math.max(5 - allHints.length, 0)).fill('free'))

    return (
        <div className="hintArea">
            <HintLine data={data[0]} lineType={lineType[0]} />
            <HintLine data={data[1]} lineType={lineType[1]} />
            <HintLine data={data[2]} lineType={lineType[2]} />
            <HintLine data={data[3]} lineType={lineType[3]} />
            <HintLine data={data[4]} lineType={lineType[4]} />
            <HintLine data={data[5]} lineType={lineType[5]} />
        </div>
    )
}

HintArea.displayName = 'HintArea'

export default HintArea