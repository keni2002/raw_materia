import { configureStore } from '@reduxjs/toolkit'
import booleanos from '../features/booleanos.jsx'
import { apiTable } from '../services/apiTable.js'
import { apiDpCom } from '../services/apiDepCom.js'
import { apiCom } from '../services/apiComercial.js'
import { apiEval } from '../services/apiEval.js'
import { apiEvalsOf } from '../services/apiEvalsOf.js'
import { apiAuth } from '../services/auth/views/apiAuth.js'
import authSlice, { userSlice } from '../features/authSlice.js'
import { apiAsist } from '../services/apiAsistente.js'
export const store = configureStore({

    reducer: {
        booleanos: booleanos,
        [userSlice.name]: authSlice,
        [apiTable.reducerPath]: apiTable.reducer,
        //Departamentos
        [apiDpCom.reducerPath]: apiDpCom.reducer,
        //Personal
        [apiCom.reducerPath]: apiCom.reducer,
        [apiAsist.reducerPath]: apiAsist.reducer,

        //Evals
        [apiEval.reducerPath]: apiEval.reducer,
        [apiEvalsOf.reducerPath]: apiEvalsOf.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            apiTable.middleware,
            apiDpCom.middleware,
            apiCom.middleware,
            apiEval.middleware,
            apiEvalsOf.middleware,
            apiAuth.middleware,
            apiAsist.middleware

        ])
})

