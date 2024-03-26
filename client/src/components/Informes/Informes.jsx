import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetInformesQuery } from "../../services/apiInforme"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";

import fecha from '../utils/fechaHumana'
//iconeria
import Evalicon from "../Icons/Evalicon";
import Infoicon from "../Icons/Infoicon"
import Againicon from "../Icons/Againicon"
import Deleteicon from "../Icons/Deleteicon"
import Masicon from "../Icons/Masicon"

import vence from '../utils/vence'
import Editicon from "../Icons/Editicon";


export default function Informes() {
    const { user: { dep, grupo, materias } } = useSelector(auth_state);
    const id = JSON.parse(sessionStorage.getItem('user'))['id']
    const [filter_data, setfilter_data] = useState([])

    const dispatch = useDispatch()
    const [getInformes, { data, isSuccess }] = useLazyGetInformesQuery()
    //restablecer todos los valores
    useEffect(() => {
        dispatch(setType('Contratos'));
        getInformes();

    }, [])

    const columns = [
        {
            name: "ID",
            selector: row => row.codigo,
            sortable: false
        },
        {
            name: "(contrato) - Comercial",
            selector: row => row.comercialyId,
            sortable: true
        },
        {
            name: "Estado",
            selector: row => row.estado,
            sortable: true
        },

        {
            name: "Fecha de Creación",
            selector: row => fecha(row.fecha)
        }

    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (
            <div className=' flex  gap-2'>
                <Link to={`/informes/edit/${row.codigo}`}>
                    <button title="Editar Informe">
                        <Editicon size={24} fill={'#646464'} />
                    </button>
                </Link>

                <Link to={`/informes/info/${row.codigo}`}>
                    <button title="Informacion adicional">
                        <Infoicon />
                    </button>
                </Link>
            </div>
        )
    }
    useEffect(() => {
        setfilter_data(grupo == 'abogado_group' ?
            data?.filter(
                item => item.abogado == id
            ) :
            grupo == 'comercial_group' ?
                data?.filter(
                    item => item.comercial == id
                ) : grupo == 'asistente_group' ?
                    null : data)


    }, [isSuccess])



    //ROL

    //Transformamos los salario y evaluacion
    const modifiedData = filter_data?.map(item => {
        let modEstado
        const estado = item.estado
        if (estado == 'P') {
            modEstado = 'Pendiente'
        }
        else if (estado == 'N') {
            modEstado = '*No aprobado'
        }
        else if (estado == 'A') {
            modEstado = 'Aprobado'
        }
        return {
            ...item,
            estado: modEstado
        };
    });


    return (
        <>
            <div className="flex flex-col items-center">
                <Tables data={modifiedData} columns={[...columns, actions]}
                />
            </div>
        </>
    )
}