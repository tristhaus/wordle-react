import { configureStore } from '@reduxjs/toolkit'
import showHelpReducer from './reducers/showHelp'
import gameReducer from './reducers/game'

export default configureStore({
    reducer: {
        showHelp: showHelpReducer,
        game: gameReducer,
    },
})