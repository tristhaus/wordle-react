const { getRandom, isValid } = require('../logic/dictionary')

describe('dictionary logic', () => {

    test('getRandom gets a random word', () => {
        const word1 = getRandom()
        const word2 = getRandom()

        expect(typeof (word1)).toBe('string')
        expect(typeof (word2)).toBe('string')
        expect(word1).not.toStrictEqual(word2)
    })

    test.each([{ word: 'yells', isValid: true }, { word: 'xxxxx', isValid: false }])('Words are correctly identified as valid: $word, $isValid', (input) => {
        const result = isValid(input.word)

        expect(result).toStrictEqual(input.isValid)
    })
})