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

            resetGuess: state => {
                state.guess = ''
            },

            addLetterToGuess: (state, action) => {

                if (state.state === GameState.playing) {
                    state.message = ''
                }

                if (state.guess.length < 5) {
                    state.guess = state.guess + action.payload
                }
            },

            removeLastLetterFromGuess: state => {

                if (state.state === GameState.playing) {
                    state.message = ''
                }

                if (state.guess.length > 0) {
                    state.guess = state.guess.substring(0, state.guess.length - 1)
                }
            },

            resetAllHints: state => {
                state.allHints = []
            },

            pushToAllHints: (state, action) => {
                const newAllHints = state.allHints.concat(action.payload)
                state.allHints = newAllHints
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

const { setGameId, setGameState, setShareUrl, resetGuess, resetAllHints, pushToAllHints } = gameSlice.actions
export const { setMessage, addLetterToGuess, removeLastLetterFromGuess, } = gameSlice.actions

export default gameSlice.reducer

const getSolution = () => {
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

        dispatch(resetGuess())
    }
}

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

export const handleSubmit = () => {
    return async (dispatch, getState) => {

        const state = getState()
        const gameId = state.game.id
        const guess = state.game.guess

        const [success, data] = await gameService.makeGuess(gameId, guess)

        if (success) {
            dispatch(pushToAllHints([data.hints]))
            const newState = getState()
            const allHints = newState.game.allHints

            if (data.hints.every(hint => hint.status === LetterState.correct)) {
                dispatch(setGameState(GameState.solved))
                dispatch(setMessage('Congratulations!'))
            } else if (allHints.length === 6) {
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

        dispatch(resetGuess())
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
        dispatch(resetGuess())
        dispatch(resetAllHints([]))
        dispatch(setMessage(''))
        dispatch(fetchGame(null))
    }
}

