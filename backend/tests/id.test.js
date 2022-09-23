const { getId, getWord } = require('../logic/id')

describe.only('id logic', () => {

    test('known ID yields correct word', async () => {

        const word = 'about'

        const result = getId(word)

        const expectedId = 'w1lO79SZ7w8kUiyDPOqjAw'

        expect(result).toStrictEqual(expectedId)
    })

    test('word yields known ID', async () => {

        const id = 'w1lO79SZ7w8kUiyDPOqjAw'

        const result = getWord(id)

        const expectedWord = 'about'

        expect(result).toStrictEqual(expectedWord)
    })

    test('roundtrip works', async () => {

        const word = 'facts'

        const result = getWord(getId(word))

        expect(result).toStrictEqual(word)
    })
})
