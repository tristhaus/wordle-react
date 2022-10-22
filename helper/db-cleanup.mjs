import mongoose from 'mongoose'
import mng from 'mongoose'
import { MONGODB_URI } from './env.mjs'

const gameSchema = new mongoose.Schema({
  word: String,
  wordId: String,
  attempts: Number,
  creationDate: Number,
})

const Game = mongoose.model('Game', gameSchema)

console.log(Date.now())

console.log('connecting')

mongoose.connect(MONGODB_URI).then(async () => {

  console.log('connected, executing')
  // go to deleteMany eventually - for undefined and creationDate lt (a week ago) 168 * 60 * 60 * 1000
  //var result = await Game.find({ creationDate: undefined }).exec()
  //console.log(result)
  console.log('done')

  mongoose.connection.close();
}
)