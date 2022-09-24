const unused = 'unused'
const elsewhere = 'elsewhere'
const correct = 'correct'

/**
 * Evaluates a guess against the reference
 * @param {string} guess - The guess made by the player
 * @param {string} reference - The word that should be guessed
 * @returns {Array} An array of objects describing the letter and its status: 'unused', 'elsewhere', 'correct'
 */
const evaluate = (guess, reference) => {
    if (typeof (guess) !== 'string' || typeof (reference) !== 'string' || guess.length !== reference.length) {
        throw { message: 'input must be strings of equal length' }
    }

    let g = [...guess]
    let r = [...reference]

    const result = g.map(value => { return { letter: value, status: unused } })

    // reversed to prevent index mismatch with result
    for (let i = g.length - 1; i >= 0; i--) {
        if (g[i] === r[i]) {
            result[i].status = correct
            // remove letter
            g = g.filter((value, index) => index !== i)
            r = r.filter((value, index) => index !== i)
        }
    }

    g.forEach(value => {
        const rIndex = r.indexOf(value)

        // reference contains the letter
        if (rIndex !== -1) {
            // take first element not yet otherwise denoted
            const resultElement = result.find(element => element.letter === value && element.status === unused)
            resultElement.status = elsewhere
            // remove letter
            r = r.filter((value, index) => index !== rIndex)
        }
    })

    return result
}

module.exports = { evaluate }
