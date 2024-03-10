import {configureStore} from '@reduxjs/toolkit'
import booleanos from '../features/booleanos.jsx'
import { apiTable } from '../services/apiTable.js'
import { apiDpCom } from '../services/apiDepCom.js'
import { apiCom } from '../services/apiComercial.js'
import { apiEval } from '../services/apiEval.js'
import { apiEvalsOf } from '../services/apiEvalsOf.js'
export const store =  configureStore({

    reducer: {
        booleanos: booleanos,
        [apiTable.reducerPath]: apiTable.reducer,
        //Departamentos
        [apiDpCom.reducerPath]: apiDpCom.reducer,
        //Personal
        [apiCom.reducerPath]: apiCom.reducer,

        //Evals
        [apiEval.reducerPath]: apiEval.reducer,
        [apiEvalsOf.reducerPath]: apiEvalsOf.reducer
        
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({}).concat([
            apiTable.middleware,
            apiDpCom.middleware,
            apiCom.middleware,
            apiEval.middleware,
            apiEvalsOf.middleware


        ])
})

