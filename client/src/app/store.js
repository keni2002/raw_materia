import {configureStore} from '@reduxjs/toolkit'
import booleanos from '../features/booleanos.jsx'
import { apiTable } from '../services/apiTable.js'
export const store =  configureStore({

    reducer: {
        booleanos: booleanos,
        [apiTable.reducerPath]: apiTable.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiTable.middleware),
})