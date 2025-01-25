import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    userData: {
        id: null,
        username: null,
        email: null,
    },

    token: null,
    refreshToken: null,
    isAuthenticated: false,

}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.user
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            state.isAuthenticated = true

            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('userData', JSON.stringify(action.payload.user))
            localStorage.setItem('isAuthenticated', 'true')
        },
        logout: (state) => {
            state.userData = null
            state.token = null
            state.refreshToken = null
            state.isAuthenticated = false

            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userData')
            localStorage.removeItem('isAuthenticated')
        },
        // Add refreshToken action
        refreshTokens: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
          },
    }
})

export const { login, logout, refreshTokens } = AuthSlice.actions
export default AuthSlice.reducer