const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    word: String,
    wordId: String,
    attempts: Number,
    creationDate: Number,
})

gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.word
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
