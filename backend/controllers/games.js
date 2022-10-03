const { evaluate } = require('../logic/game')
const { getRandom, isValid } = require('../logic/dictionary')
const { getId, getWord } = require('../logic/id')
const Game = require('../models/game')

const gamesRouter = require('express').Router()

const maxAttempts = 6

gamesRouter.post('/', async (request, response, next) => {
    try {
        let word = ''
        const wordId = request.query.wordId

        if (wordId !== undefined) {
            try {
                word = getWord(wordId)

                if (!isValid(word)) {
                    response.status(400).send({ error: `invalid word: ${word}` })
                    return
                }
            } catch (idError) {
                throw { name: 'IdError', message: 'bad id' }
            }
        }
        else {
            word = getRandom()
        }

        const game = new Game({ word: word, wordId: getId(word), attempts: 0 })

        const result = await game.save()

        response.json(result)
    } catch (error) {
        next(error)
    }
})

gamesRouter.put('/:id', async (request, response, next) => {
    try {
        const guess = request.body

        if (typeof (guess.word) !== 'string' || !/^[a-z]{5}$/.test(guess.word)) {
            response.status(400).json({ error: 'invalid guess' })
            return
        }

        if (!isValid(guess.word)) {
            response.status(400).json({ error: 'not a word' })
            return
        }

        const game = await Game.findById(request.params.id)

        if (game.attempts >= maxAttempts) {
            response.status(400).json({ error: 'too many attempts' })
            return
        }

        const result = await Game.findByIdAndUpdate(
            request.params.id,
            { attempts: game.attempts + 1 },
            { new: true, runValidators: true, context: 'query' })

        if (result === null) {
            response.status(404).json({ error: 'not found' })
            return
        }

        const refinedResult = {
            id: result._id.toString(),
            wordId: result.wordId,
            hints: evaluate(guess.word, result.word)
        }

        response.json(refinedResult)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get('/:id/solution', async (request, response, next) => {
    try {
        const result = await Game.findByIdAndUpdate(
            request.params.id,
            { attempts: maxAttempts + 1 },
            { new: true, runValidators: true, context: 'query' })

        if (result === null) {
            response.status(404).json({ error: 'not found' })
            return
        }

        const refinedResult = {
            id: result._id.toString(),
            wordId: result.wordId,
            solution: result.word
        }

        response.json(refinedResult)
    } catch (error) {
        next(error)
    }
})

gamesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Game.findByIdAndDelete(request.params.id)

        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = gamesRouter
