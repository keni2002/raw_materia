import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetContratsQuery } from "../../services/apiContratos"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";
import fechaRestante from '../utils/fechaRestante'
export default function Contratos() {
    const { user: { dep, grupo } } = useSelector(auth_state);
    const dispatch = useDispatch()
    const [getContrats, { data }] = useLazyGetContratsQuery()
    //restablecer todos los valores
    useEffect(() => {
        dispatch(setIsopenAdd(false));
        dispatch(setId(''));
        // dispatch(setFuncion(''));
        dispatch(setType('Contratos'));
        getContrats();
    }, [])

    const columns = [
        {
            name: "UID",
            selector: row => row.codigo,
            sortable: false
        },
        // {
        //     name: "Comercial",
        //     selector: row => row.comercial_name,
        //     sortable: true

        // },
        {
            name: "Suministrador",
            selector: row => row.suministradorName,
            sortable: true
        },
        {
            name: "Válido hasta",
            selector: row => row.periodo_validez
        },

        {
            name: "Estado",
            selector: row => row.estado,
            sortable: true
        },
        {
            name: "Materia objetivo",
            selector: row => row.materia,
            sortable: true
        }
    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (

            <div className=' flex  gap-2'>
                <Link to={`/contratos/info/${row.codigo}`}>
                    <button title="Informacion adicional">
                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                    </button>
                </Link>

                {(fechaRestante(row?.periodo_validez).anios < 0 || fechaRestante(row?.periodo_validez).meses < 0 || fechaRestante(row?.periodo_validez).dias < 0) ||
                    (fechaRestante(row?.periodo_validez).anios == 0 && fechaRestante(row?.periodo_validez).meses == 0 && fechaRestante(row?.periodo_validez).dias == 0) || row.estado == 'No aprobado' ?
                    <Link to={`/contratos/renovar/${row.codigo}`}>
                        <button title="Renovar Contrato">
                            <svg height="24" fill='#646464' viewBox="0 -960 960 960" width="24"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" /></svg>
                        </button>
                    </Link>
                    : <></>
                }
                <Link to={`/contratos/delete/${row.codigo}`}>
                    <button title='Eliminar'>
                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" /></svg>
                    </button>
                </Link>





            </div>
        )
    }


    ///---------------------------------------------transformando data
    //here solo dejo pasar a los locos que sean del mismo depa
    const filter_data = grupo == 'abogado_group' ? data.filter(item => item.estado == 'P') : data
    //ROL

    //Transformamos los salario y evaluacion
    const modifiedData = filter_data?.map(item => {
        let modifedCodigo = item.codigo.slice(-10)
        let modifedMateria
        let modEstado
        const estado = item.estado
        const materia = item.materia
        if (materia == 'VEG') {
            modifedMateria = 'Vegetal'
        } else if (materia == 'ANIM') {
            modifedMateria = 'Animal'
        } else if (materia == 'FOS') {
            modifedMateria = 'Fosil'
        } else {
            modifedMateria = 'Mineral'
        }
        if (estado == 'P') {
            modEstado = 'Pendiente'
        }
        else if (estado == 'N') {
            modEstado = 'No aprobado'
        }
        else if (estado == 'A') {
            modEstado = 'Aprobado'
        }

        return {
            ...item,
            // codigo: modifedCodigo,
            materia: modifedMateria,
            estado: modEstado
        };
    });


    return (
        <>
            <div className="flex flex-col items-center">
                <Tables data={modifiedData} columns={[...columns, actions]}

                />
                {<Link to='/contratos/add'>
                    <button
                        title="Agregar un Contrato"
                        className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                    ><svg fill="#fff" height="40" viewBox="0 0 24 24" width="40">
                            <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        </svg>
                    </button>
                </Link>}
            </div>
        </>
    )
}