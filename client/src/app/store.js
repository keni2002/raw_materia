import {configureStore} from '@reduxjs/toolkit'
import tableReducer from '../features/tablaSlice.jsx'
import { apiTable } from '../services/apiTable.js'
export const store =  configureStore({

    reducer: {
        colTable: tableReducer,
        [apiTable.reducerPath]: apiTable.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiTable.middleware),
})