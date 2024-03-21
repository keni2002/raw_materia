import Tables from "../Tables";
import { setId, setType } from '../../features/booleanos';
import { useLazyGetAsistsQuery } from "../../services/apiAsistente"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth_state } from "../../features/authSlice";

export default function Asistentes() {
    const { user: { dep } } = useSelector(auth_state);
    const dispatch = useDispatch()
    const [getAsistentes, { data }] = useLazyGetAsistsQuery()
    //restablecer todos los valores
    useEffect(() => {
        dispatch(setId(''));
        // dispatch(setFuncion(''));
        dispatch(setType('Asistentes'));
        getAsistentes()
    }, [])

    const columns = [
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Apellido",
            selector: row => row.apellido,
            sortable: true

        },

        {
            name: "Nivel escolar",
            selector: row => row.nivelEscolar
        },

        {
            name: "Salario",
            selector: row => row.salario,
            sortable: true
        },
        {
            name: "Evaluación",
            selector: row => row.evaluacion
        },
        {
            name: "Slario Final",
            selector: row => row.sfinal
        }
    ]
    //MODIFICAR COLUMNAS ---- actions over 
    const actions = {
        name: 'Acciones',
        cell: row => (

            <div className=' flex  gap-2'>
                <Link to={`/asistentes/evaluar/${row.id}`}>


                    <button title='Evaluar trabajador'>
                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" /></svg>
                    </button>
                </Link>
                <Link to={`/asistentes/info/${row.id}`}>
                    <button title="Informacion adicional">
                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                    </button>
                </Link>
                <Link to={`/asistentes/edit/${row.id}`}>
                    <button title="Editar">

                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm263-224 37-39-37-37-38 38 38 38Z" /></svg>
                    </button>
                </Link>
                <Link to={`/asistentes/delete/${row.id}`}>
                    <button title='Eliminar'>
                        <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" /></svg>
                    </button>
                </Link>
            </div>
        )
    }


    ///---------------------------------------------transformando data
    //here solo dejo pasar a los locos que sean del mismo depa
    const data_filter = data?.filter(entry => entry?.departamento == dep[1])

    //Transformamos los salario y evaluacion
    const modifiedData = data_filter?.map(item => {
        const evaluacion = parseInt(item.evaluacion);

        const nivelEscolar = item.nivelEscolar;
        const salario = parseFloat(item.salario);
        let modifiedEvaluacion = '';
        let modifiedEscolar = '';
        let modifiedSalario = 0;
        if (evaluacion === 5) {
            modifiedEvaluacion = 'Excelente';
            modifiedSalario = salario;
        } else if (evaluacion === 4) {
            modifiedSalario = salario - 50;
            modifiedEvaluacion = 'Bien';
        } else if (evaluacion === 3) {
            modifiedSalario = salario - 100;
            modifiedEvaluacion = 'Regular';
        } else if (evaluacion === 2) {
            modifiedSalario = salario - 150;
            modifiedEvaluacion = 'Mal';
        } else if (evaluacion == 0) {
            modifiedEvaluacion = 'No evaluado'
            modifiedSalario = '-';
        }
        if (nivelEscolar == 'PRIM') {
            modifiedEscolar = 'Primaria';
        } else if (nivelEscolar == 'SEC') {
            modifiedEscolar = 'Secundaria';
        } else if (nivelEscolar == 'BACH') {
            modifiedEscolar = 'Bachillerato'
        } else if (nivelEscolar == 'UNIV') {
            modifiedEscolar = 'Universidad'
        }
        return {
            ...item,
            nivelEscolar: modifiedEscolar,
            evaluacion: modifiedEvaluacion,
            sfinal: '$' + modifiedSalario,
            salario: '$' + salario

        };
    });


    return (
        <>
            <div className="flex flex-col items-center">


                <Tables data={modifiedData} columns={[...columns, actions]}

                />
                <Link to='/asistentes/add'>
                    <button
                        title="Agregar un Asistente"
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