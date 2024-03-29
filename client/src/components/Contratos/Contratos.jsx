import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetContratsQuery } from "../../services/apiContratos"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";
import fechaRestante from '../utils/fechaRestante'
import fecha from '../utils/fechaHumana'
//iconeria
import Evalicon from "../Icons/Evalicon";
import Infoicon from "../Icons/Infoicon"
import Againicon from "../Icons/Againicon"
import Deleteicon from "../Icons/Deleteicon"
import Masicon from "../Icons/Masicon"
import SearchFilter from "../SearchFilter";
import vence from '../utils/vence'

export default function Contratos() {
    const [stadoHook, setStadoHook] = useState('-')
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { user: { dep, grupo, materias } } = useSelector(auth_state);
    const id = JSON.parse(sessionStorage.getItem('user'))['id']
    const [filter_data, setfilter_data] = useState([])

    const dispatch = useDispatch()
    const [getContrats, { data, isSuccess }] = useLazyGetContratsQuery()
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
            selector: row => fecha(row.periodo_validez)
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
                {(grupo != 'abogado_group' && vence(row.periodo_validez)) ||
                    (row.estado == '*No aprobado') ?
                    <Link to={`/contratos/renovar/${row.codigo}`}>
                        <button title="Renovar Contrato">
                            <Againicon />
                        </button>
                    </Link>
                    : <></>
                }
                {grupo == 'abogado_group' &&
                    < Link to={`add_informe/${row.codigo}`}>
                        <button title="Gestionar contrato">
                            <Evalicon />
                        </button>
                    </Link>}

                <Link to={`/contratos/info/${row.codigo}`}>
                    <button title="Informacion adicional">
                        <Infoicon />
                    </button>
                </Link>


                {grupo != 'abogado_group' && <Link to={`/contratos/delete/${row.codigo}`}>
                    <button title='Eliminar'>
                        <Deleteicon />
                    </button>
                </Link>
                }




            </div>
        )
    }


    ///---------------------------------------------transformando data
    //Los que esten en pendiente y no hayan vencido
    useEffect(() => {

        setfilter_data(grupo == 'abogado_group' ?
            data?.filter(
                item => item.estado == 'P' && !vence(item.periodo_validez) && materias.includes(item.materia)
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
            modEstado = '*No aprobado'
        }
        else if (estado == 'A') {
            modEstado = 'Aprobado'
        }

        return {
            ...item,
            materia: modifedMateria,
            estado: modEstado
        };
    });
    //FILTER
    const filteredItems = modifiedData?.filter(
        item => item.suministradorName &&
            item.suministradorName.toLowerCase().includes(filterText.toLowerCase()) &&
            item.estado == (stadoHook == '-' ? item.estado : stadoHook)
    );
    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };
    // FILTER

    return (
        <>
            <SearchFilter placeholder={'filtrar por comercial'} setStadoHook={setStadoHook} estado={!(grupo == 'abogado_group')} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            <Tables data={filteredItems} columns={[...columns, actions]}

            />
            {grupo != 'abogado_group' && <Link to='/contratos/add'>
                <button
                    title="Agregar un Contrato"
                    className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                >
                    <Masicon size='40' fill="#fff" />
                </button>
            </Link>}

        </>
    )
}