import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetFactsQuery } from "../../services/apiFactura"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";
import SearchFilter from '../SearchFilter'
import Infoicon from '../Icons/Infoicon'
import Editicon from '../Icons/Editicon'
import Deleteicon from '../Icons/Deleteicon'
import fecha from '../utils/fechaHumana'
import Masicon from "../Icons/Masicon";
import toast from "react-hot-toast";
export default function Factura() {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { user: { grupo } } = useSelector(auth_state);
    const dispatch = useDispatch()
    const [getFacts, { data }] = useLazyGetFactsQuery()
    //restablecer todos los valores
    useEffect(() => {

        dispatch(setType('Facturas de Compras'));
        getFacts().unwrap().then(() => {

        }).catch((err) => {
            toast.error(err.data)
        })
    }, [])

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
        },
        {
            name: "Productos",
            selector: row => row.productStr,
            sortable: true
        },
        {
            name: "Importe",
            selector: row => row.importe,
            sortable: true

        },
        {
            name: "Fecha de factura",
            selector: row => fecha(row.fecha_compra)
        },
        grupo != 'comercial_group' && {
            name: "Comercial",
            selector: row => row.comercialName
        }
    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (
            <div className=' flex  gap-2'>

                <Link to={`/facturas/edit/${row.id}`}>
                    <button title="Editar">
                        <Editicon size={24} fill={'#646464'} />
                    </button>
                </Link>
                <Link to={`/facturas/delete/${row.id}`}>
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
    console.log(data)
    //FILTER
    const filteredItems = modifiedData?.filter(
        item => item.productStr && item.productStr.toLowerCase().includes(filterText.toLowerCase()) ||
            item.id && item.id.toLowerCase().includes(filterText.toLowerCase()),
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
            <SearchFilter placeholder={'filtrar Facturas, por facturas y por ID'} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            <div className="flex flex-col items-center">

                <Tables

                    data={filteredItems}

                    columns={[...columns, actions]}

                />
                <Link to='/facturas/add'>
                    <button
                        title="Agregar un producto"
                        className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                    ><Masicon size='40' fill="#fff" />
                    </button>
                </Link>
            </div>
        </>
    )
}