import Tables from "../Tables";
import { setId, setType, setIsopenAdd } from '../../features/booleanos';
import { useLazyGetSumsQuery } from "../../services/apiSumin"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";
import SearchFilter from '../SearchFilter'
import Editicon from '../Icons/Editicon'
import Deleteicon from '../Icons/Deleteicon'

import Masicon from "../Icons/Masicon";

export default function Suministradores() {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { user: { dep } } = useSelector(auth_state);
    const dispatch = useDispatch()
    const [getSums, { data }] = useLazyGetSumsQuery()
    //restablecer todos los valores
    useEffect(() => {

        dispatch(setType('Suministradores'));
        getSums();
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
            name: "Clasificación",
            selector: row => row.tipo,
            sortable: true

        },
        {
            name: "Dirección",
            selector: row => row.addrStr
        },


    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (
            <div className=' flex  gap-2'>

                <Link to={`/suministradores/edit/${row.codigo}`}>
                    <button title="Editar">
                        <Editicon size={24} fill={'#646464'} />
                    </button>
                </Link>
                <Link to={`/suministradores/delete/${row.codigo}`}>
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
    //FILTER
    const filteredItems = modifiedData?.filter(
        item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
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
            {console.log(data)}
            <SearchFilter placeholder={'filtrar suministradores'} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            <div className="flex flex-col items-center">

                <Tables

                    data={filteredItems}

                    columns={[...columns, actions]}

                />
                <Link to='/suministradores/add'>
                    <button
                        title="Agregar un Suministrador"
                        className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                    ><Masicon size='40' fill="#fff" />
                    </button>
                </Link>
            </div>
        </>
    )
}