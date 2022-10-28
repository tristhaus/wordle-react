import { createSlice } from '@reduxjs/toolkit'

export const showHelpSlice = createSlice({
    name: 'showHelp',
    initialState: {
        value: false,
    },
    reducers: {
        toggleShowHelp: (state) => {
            state.value = !state.value
        },
    },
})

const { toggleShowHelp } = showHelpSlice.actions

export const handleToggleShowHelp = () => {
    return async (dispatch) => {
        dispatch(toggleShowHelp())
    }
}

export default showHelpSlice.reducer