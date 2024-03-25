import { Link } from 'react-router-dom';
import { createSlice } from '@reduxjs/toolkit';
//Los datos que quiero cargarme en tabla
const booleanos = createSlice({
    name: 'booleanos',
    initialState: {
        iD: '',
        tipo: '', //tipo de tabla
        isOpenModalEvaluar: false,
        isOpenInfo: false,
        isOpenAdd: false,
        isOpenModalConfirm: false,
        funcion: ''

    },
    reducers: {
        setIsOpenModalEvaluar: (state, action) => {
            state.isOpenModalEvaluar = action.payload;
        },
        setType: (state, action) => {
            state.tipo = action.payload;
        },

        setIsOpenInfo: (state, action) => {
            state.isOpenInfo = action.payload;
        },
        setIsOpenModalConfirm: (state, action) => {
            state.isOpenModalConfirm = action.payload;
        },
        setId: (state, action) => {
            state.iD = action.payload;
        },
        setFuncion: (state, action) => {
            state.funcion = action.payload;
        },
        setIsopenAdd: (state, action) => {
            state.isOpenAdd = action.payload;
        }
    },
});


export const {
    setIsOpenModalEvaluar,
    setId,
    setIsOpenInfo,
    setType,
    setIsOpenModalConfirm,
    setFuncion,
    setIsopenAdd
} = booleanos.actions;
export default booleanos.reducer;