const supertest = require('supertest')
const app = require('../app')
const Game = require('../models/game')

const api = supertest(app)

beforeEach(async () => {
    await Game.deleteMany({})
})

describe('game API', () => {

    test('POST yields a new game', async () => {
        const response = await api.post('/api/games')

        expect(response.body).toBeDefined()
        expect(response.body.id).toBeDefined()
        expect(response.body.word).not.toBeDefined()
        expect(response.body.wordId).toBeDefined()
    })

    test('POST with ID yields a new game', async () => {
        const response = await api.post('/api/games?wordId=w1lO79SZ7w8kUiyDPOqjAw') // word: about

        expect(response.body).toBeDefined()
        expect(response.body.id).toBeDefined()
        expect(response.body.word).not.toBeDefined()
        expect(response.body.wordId).toBeDefined()
    })

    test('POST with bad ID results in 400', async () => {
        const response = await api.post('/api/games?wordId=w1lO79SZ7w8kUiyDPOq') // word: N/A

        expect(response.status).toBe(400)
    })

    test('POST with ID corresponding to non-existent word results in 400', async () => {
        const response = await api.post('/api/games?wordId=bs8RCf9BQXfd66K4b5ByEw') // word: xxxxx

        expect(response.status).toBe(400)
    })

    test('PUT with a valid guess yields a useful response', async () => {
        const gameResponse = await api.post('/api/games?wordId=w1lO79SZ7w8kUiyDPOqjAw') // word: about

        const id = gameResponse.body.id
        const path = `/api/games/${id}`
        const guessResponse = await api.put(path).send({ word: 'those' })

        expect(guessResponse.body).toBeDefined()
        expect(guessResponse.body.id).toBeDefined()
        expect(guessResponse.body.hints).toEqual([
            { letter: 't', status: 'elsewhere' },
            { letter: 'h', status: 'unused' },
            { letter: 'o', status: 'correct' },
            { letter: 's', status: 'unused' },
            { letter: 'e', status: 'unused' },
        ])
    })

    test('PUT with the correct guess yields a winning response', async () => {
        const gameResponse = await api.post('/api/games?wordId=w1lO79SZ7w8kUiyDPOqjAw') // word: about

        const id = gameResponse.body.id
        const path = `/api/games/${id}`
        const guessResponse = await api.put(path).send({ word: 'about' })

        expect(guessResponse.body).toBeDefined()
        expect(guessResponse.body.id).toBeDefined()
        expect(guessResponse.body.hints).toEqual([
            { letter: 'a', status: 'correct' },
            { letter: 'b', status: 'correct' },
            { letter: 'o', status: 'correct' },
            { letter: 'u', status: 'correct' },
            { letter: 't', status: 'correct' },
        ])
    })

    test.each(['four', 'toomany', 'YELLS', 4])('PUT with invalid guess "%s" yields 400', async (input) => {
        const gameResponse = await api.post('/api/games')

        const id = gameResponse.body.id
        const path = `/api/games/${id}`

        const guessResponse = await api.put(path).send({ word: input })

        expect(guessResponse.status).toBe(400)
        expect(guessResponse.body).toEqual({ error: 'invalid guess' })

    })

    test('PUT with too many attempts yields 400', async () => {
        const gameResponse = await api.post('/api/games')

        const id = gameResponse.body.id
        const path = `/api/games/${id}`

        for (let index = 0; index < 6; index++) {
            const guessResponse = await api.put(path).send({ word: 'those' })
            expect(guessResponse.status).toBe(200)
        }

        const guessResponse = await api.put(path).send({ word: 'those' })
        expect(guessResponse.status).toBe(400)
        expect(guessResponse.body).toEqual({ error: 'too many attempts' })
    })

    test('GET solution yields solution', async () => {
        const gameResponse = await api.post('/api/games')

        const id = gameResponse.body.id
        const path = `/api/games/${id}/solution`
        const solutionResponse = await api.get(path)

        expect(solutionResponse.body).toBeDefined()
        expect(solutionResponse.body.id).toBeDefined()
        expect(solutionResponse.body.word).not.toBeDefined()
        expect(solutionResponse.body.solution).toBeDefined()
    })

    test('DELETE makes game unavailable', async () => {
        const gameResponse = await api.post('/api/games')

        const id = gameResponse.body.id
        const deletePath = `/api/games/${id}`
        const deletionResponse = await api.delete(deletePath)

        expect(deletionResponse.status).toBe(204)

        const solutionPath = `/api/games/${id}/solution`
        const solutionResponse = await api.get(solutionPath)

        console.log(solutionResponse)

        expect(solutionResponse.status).toBe(404)
    })
})
