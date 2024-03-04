import { createSlice } from '@reduxjs/toolkit'

// This is an example of creating Redux state (slices) without using RTK Query
// Reducers are functions that handle state updates (not allowed to modify state directly in the redux paradigm)
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token