import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './slicers/AuthSlice.js'

const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})

export default store