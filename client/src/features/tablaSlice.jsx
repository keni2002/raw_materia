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
            }
            , {
                name: "Contratos",
                selector: row => row.cntContratos
            }
            , {
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
        ]
    },
    currentTable: 'contratos',
    data: []
};



const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setCurrentTable: (state, action) => {
            state.currentTable = action.payload[0];
            state.data = action.payload[1];
            
        },
    },
});

export const { setCurrentTable } = tableSlice.actions;

export default tableSlice.reducer;