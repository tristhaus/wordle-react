import { createSlice } from '@reduxjs/toolkit'
import { GameState, LetterState } from '../immutable/state'
import gameService from '../services/game'

export const gameSlice = createSlice(
    {
        name: 'game',
        initialState: {
            id: null,
            state: GameState.playing,
            guess: '',
            allHints: [],
            message: null,
            shareUrl: null,
        },
        reducers: {

            setGameId: (state, action) => {
                state.id = action.payload
            },

            setGameState: (state, action) => {
                state.state = action.payload
            },

            setGuess: (state, action) => {
                state.guess = action.payload
            },

            setAllHints: (state, action) => {
                state.allHints = action.payload
            },

            setMessage: (state, action) => {
                state.message = action.payload
            },

            setShareUrl: (state, action) => {
                state.shareUrl = action.payload
            },
        }
    }
)

const { setGameId, setGameState, setGuess, setAllHints, setShareUrl } = gameSlice.actions
export const {  setMessage, } = gameSlice.actions

export default gameSlice.reducer

export const fetchGame = id => {
    return async dispatch => {
        const [success, data] = await gameService.startGame(id)
        if (success) {
            dispatch(setGameId(data.id))
            dispatch(setGameState(GameState.playing))
            dispatch(setMessage('Make your first guess!'))
            dispatch(setShareUrl(`${data.deploymentUrl}/${data.wordId}`))
        }
        else {
            dispatch(setMessage(`Not a known game ID: ${id}`))
        }
    }
}

export const getSolution = () => {
    return async (dispatch, getState) => {

        const state = getState()
        const id = state.game.id
        const [success, data] = await gameService.getSolution(id)

        if (success) {
            dispatch(setMessage(`Solution was: ${data.solution}`))
        }
        else {
            dispatch(setMessage(`error "${data.error}"`))
        }

        dispatch(setGuess(''))
    }
}

export const handleSubmit = () => {
    return async (dispatch, getState) => {

        const state = getState()
        const gameId = state.game.id
        const guess = state.game.guess
        const allHints = state.game.allHints

        const [success, data] = await gameService.makeGuess(gameId, guess)

        if (success) {
            const newAllHints = allHints.concat([data.hints])
            dispatch(setAllHints(newAllHints))

            if (data.hints.every(hint => hint.status === LetterState.correct)) {
                dispatch(setGameState(GameState.solved))
                dispatch(setMessage('Congratulations!'))
            } else if (newAllHints.length === 6) {
                dispatch(setGameState(GameState.ranOut))
                dispatch(getSolution())
            } else {
                dispatch(setMessage(''))
            }
        }
        else {
            if (data.error === 'not a word') {
                dispatch(setMessage(`"${guess}" is not a valid word`))
            }
            else {
                dispatch(setMessage(`error "${data.error}"`))
            }
        }

        dispatch(setGuess(''))
    }
}

export const handleGiveUp = () => {
    return dispatch => {
        dispatch(setGameState(GameState.gaveUp))
        dispatch(getSolution())
    }
}

export const handleNewGame = () => {
    return dispatch => {
        dispatch(setGuess(''))
        dispatch(setAllHints([]))
        dispatch(setMessage(''))
        dispatch(fetchGame(null))
    }
}

export const handleAddGuessLetter = letter => {
    return (dispatch, getState) => {

        const state = getState()
        const gameState = state.game.state
        const guess = state.game.guess

        if (gameState === GameState.playing) {
            dispatch(setMessage(''))
        }

        if (guess.length === 5) {
            return
        }

        dispatch(setGuess(guess + letter))
    }
}

export const handleRemoveGuessLetter = () => {
    return (dispatch, getState) => {

        const state = getState()
        const gameState = state.game.state
        const guess = state.game.guess

        if (gameState === GameState.playing) {
            dispatch(setMessage(''))
        }

        if (guess.length === 0) {
            return
        }

        dispatch(setGuess(guess.substring(0, guess.length - 1)))
    }
}

