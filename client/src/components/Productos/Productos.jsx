import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetProdsQuery } from "../../services/apiProductos"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";
import Evalicon from '../Icons/Evalicon'
import Infoicon from '../Icons/Infoicon'
import Editicon from '../Icons/Editicon'
import Deleteicon from '../Icons/Deleteicon'
import fecha from '../utils/fechaHumana'
export default function Productos() {
    const { user: { dep } } = useSelector(auth_state);
    const dispatch = useDispatch()
    const [getProds, { data }] = useLazyGetProdsQuery()
    //restablecer todos los valores
    useEffect(() => {

        dispatch(setType('Productos'));
        getProds();
    }, [])

    const columns = [
        {
            name: "Código",
            selector: row => row.codigo,
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Tipo",
            selector: row => row.tipo,
            sortable: true

        },
        {
            name: "Calidad",
            selector: row => row.calidad
        },

        {
            name: "Fecha de Producción",
            selector: row => fecha(row.fecha_produccion),
            sortable: true
        },
    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (
            <div className=' flex  gap-2'>
                <Link to={`/productos/info/${row.id}`}>
                    <button title="Informacion adicional">
                        <Infoicon />
                    </button>
                </Link>
                <Link to={`/productos/edit/${row.id}`}>
                    <button title="Editar">
                        <Editicon size={24} fill={'#646464'} />
                    </button>
                </Link>
                <Link to={`/productos/delete/${row.id}`}>
                    <button title='Eliminar'>
                        <Deleteicon />
                    </button>
                </Link>
            </div>
        )
    }


    ///---------------------------------------------transformando data
    //here solo dejo pasar a los locos que sean del mismo depa


    //Transformamos los salario y evaluacion
    const modifiedData = data?.map(item => {
        let modifedMateria = ''
        const materia = item.tipo
        if (materia == 'VEG') {
            modifedMateria = 'Vegetal'
        } else if (materia == 'ANIM') {
            modifedMateria = 'Animal'
        } else if (materia == 'FOS') {
            modifedMateria = 'Fosil'
        } else {
            modifedMateria = 'Mineral'
        }

        return {
            ...item,
            tipo: modifedMateria
        };
    });


    return (
        <>
            <div className="flex flex-col items-center">

                <Tables data={modifiedData} columns={[...columns, actions]}

                />
                <Link to='/comerciales/add'>
                    <button
                        title="Agregar un comercial"
                        className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                    ><svg fill="#fff" height="40" viewBox="0 0 24 24" width="40">
                            <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        </svg>
                    </button>
                </Link>
            </div>
        </>
    )
}