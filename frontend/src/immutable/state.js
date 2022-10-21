const LetterState = {
    neverGuessed: 'neverGuessed',
    unused: 'unused',
    elsewhere: 'elsewhere',
    correct: 'correct'
}

const GameState = {
    playing: 'playing',
    gaveUp: 'gaveUp',
    solved: 'solved',
    ranOut: 'ranOut'
}

module.exports = { LetterState, GameState }
