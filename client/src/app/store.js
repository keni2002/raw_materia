import {configureStore} from '@reduxjs/toolkit'
import booleanos from '../features/booleanos.jsx'
import { apiTable } from '../services/apiTable.js'
import { apiDpCom } from '../services/apiDepCom.js'
export const store =  configureStore({

    reducer: {
        booleanos: booleanos,
        [apiTable.reducerPath]: apiTable.reducer,
        [apiDpCom.reducerPath]: apiDpCom.reducer
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({}).concat([
            apiTable.middleware,
            apiDpCom.middleware

        ])
})

