const { evaluate } = require('../logic/game')

describe.only('game logic', () => {

    test('guess equals reference', async () => {

        const guess = 'abcde'
        const reference = 'abcde'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'correct' },
            { letter: 'b', status: 'correct' },
            { letter: 'c', status: 'correct' },
            { letter: 'd', status: 'correct' },
            { letter: 'e', status: 'correct' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess is completely off', async () => {

        const guess = 'abcde'
        const reference = 'zyxwv'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'unused' },
            { letter: 'b', status: 'unused' },
            { letter: 'c', status: 'unused' },
            { letter: 'd', status: 'unused' },
            { letter: 'e', status: 'unused' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has all letters', async () => {

        const guess = 'abcde'
        const reference = 'bcdea'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'elsewhere' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
            { letter: 'd', status: 'elsewhere' },
            { letter: 'e', status: 'elsewhere' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has duplicate letter, only once is correct', async () => {

        const guess = 'aabcd'
        const reference = 'abcde'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'correct' },
            { letter: 'a', status: 'unused' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
            { letter: 'd', status: 'elsewhere' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has duplicate letter, only once is correct - exchanged', async () => {

        const guess = 'abcde'
        const reference = 'aabcd'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'correct' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
            { letter: 'd', status: 'elsewhere' },
            { letter: 'e', status: 'unused' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has duplicate letter, only one is in correct place', async () => {

        const guess = 'aabcd'
        const reference = 'abcda'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'correct' },
            { letter: 'a', status: 'elsewhere' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
            { letter: 'd', status: 'elsewhere' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has triplicate letter, only one in correct place, one elsewhere, one not used', async () => {

        const guess = 'aaabc'
        const reference = 'abcda'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'correct' },
            { letter: 'a', status: 'elsewhere' },
            { letter: 'a', status: 'unused' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has triplicate letter, only one in correct place, one elsewhere, one not used - permutation', async () => {

        const guess = 'aaabc'
        const reference = 'bcada'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'elsewhere' },
            { letter: 'a', status: 'unused' },
            { letter: 'a', status: 'correct' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'c', status: 'elsewhere' },
        ]

        expect(result).toStrictEqual(expected)
    })

    test('guess has two duplicate letters, one is in correct place, one is used elsewhere', async () => {

        const guess = 'aabbd'
        const reference = 'xayyb'

        const result = evaluate(guess, reference)

        const expected = [
            { letter: 'a', status: 'unused' },
            { letter: 'a', status: 'correct' },
            { letter: 'b', status: 'elsewhere' },
            { letter: 'b', status: 'unused' },
            { letter: 'd', status: 'unused' },
        ]

        expect(result).toStrictEqual(expected)
    })
})
