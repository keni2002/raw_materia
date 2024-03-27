import { configureStore } from '@reduxjs/toolkit'
import booleanos from '../features/booleanos.jsx'
import { apiDpCom } from '../services/apiDepCom.js'
import { apiCom } from '../services/apiComercial.js'
import { apiEval } from '../services/apiEval.js'
import { apiEvalsOf } from '../services/apiEvalsOf.js'
import { apiAuth } from '../services/auth/views/apiAuth.js'
import authSlice, { userSlice } from '../features/authSlice.js'
import { apiAsist } from '../services/apiAsistente.js'
import { apiSum } from '../services/apiSumin.js'
import { apiAddress } from '../services/apiAddress.js'
import { apiContra } from '../services/apiContratos.js'
import { apinForme } from '../services/apiInforme.js'
import { apiProd } from '../services/apiProductos.js'
export const store = configureStore({

    reducer: {
        booleanos: booleanos,
        [userSlice.name]: authSlice,
        //Departamentos
        [apiDpCom.reducerPath]: apiDpCom.reducer,
        //Personal
        [apiCom.reducerPath]: apiCom.reducer,
        [apiAsist.reducerPath]: apiAsist.reducer,
        [apiSum.reducerPath]: apiSum.reducer,

        //Evals
        [apiEval.reducerPath]: apiEval.reducer,
        [apiEvalsOf.reducerPath]: apiEvalsOf.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,

        //Productos
        [apiProd.reducerPath]: apiProd.reducer,


        //Miscelaneos
        [apiAddress.reducerPath]: apiAddress.reducer,
        [apiContra.reducerPath]: apiContra.reducer,
        [apinForme.reducerPath]: apinForme.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([

            apiDpCom.middleware,
            apiCom.middleware,
            apiEval.middleware,
            apiEvalsOf.middleware,
            apiAuth.middleware,
            apiAsist.middleware,
            apiAddress.middleware,
            apiSum.middleware,
            apiContra.middleware,
            apinForme.middleware,
            apiProd.middleware
        ])
})

