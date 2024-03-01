import { Link } from 'react-router-dom';
import { createSlice } from '@reduxjs/toolkit';
//Los datos que quiero cargarme en tabla
const initialState = {
    columns: {
        compras: [
            {
                name: 'Materia',
                selector: row => row.materia,
            },
            {
                name: 'Fecha de Compra',
                selector: row => row.createAt,
            },
            {
                name: 'Comercial',
                cell: row => (
                    <div>
                        <Link to={`/comercial/${row.id}`}>
                            <p className='text-blue-800'>
                                {row.comercial}
                            </p>
                        </Link>
                    </div>

                ),
            },
            {
                name: 'Suministrador',
                cell: row => (
                    <div>
                        <Link to={`/suministrador/${row.id}`}>
                            <p className='text-blue-800'>
                                {row.suministrador}
                            </p>
                        </Link>
                    </div>

                ),


            }
        ],
        contratos: [
            {
                name: 'Numero de Contrato',
                selector: row => row.numberC,
            },
            {
                name: 'Fecha de Creación',
                selector: row => row.createAt,
            },
            {
                name: 'Fecha de Validez',
                selector: row => row.valid,
            },
            {
                name: 'Estado',
                selector: row => row.state
            },
        ],
        comerciales: [
            
        ],
        asistentes: [
            {
                name: "Nombre",
                selector: row => row.nombre
            },
            {
                name: "Apellido",
                selector: row => row.apellido

            },
            {
                name: "Dirección",
                selector: row => row.direccion
            },
            {
                name: "Exp",
                selector: row => row.anioExperiencia
            },
            {
                name: "nivel escolar",
                selector: row => row.nivelEscolar
            },
            {
                name: "Salario",
                selector: row => row.salario
            },
            {
                name: "Evaluación",
                selector: row => row.evaluacion
            },
            {
                name: "Salario Final",
                selector: row => row.sfinal
            }
        ],
        suministradores:   [
            {
                name: "Nombre",
                selector: row => row.nombre
            },
            {
                name: "Dirección",
                selector: row => row.direccion
            },
            {
                name: "Clasificación",
                selector: row => row.clasificacion
            }
        ]
    },
    //urrentTable: 'contratos'
};



const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setCurrentTable: (state, action) => {
            // state.currentTable = action.payload;
        },
    },
});
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
        setIsopenAdd : (state, action) => {
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