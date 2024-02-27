import { useGetAsistentesQuery } from "../services/apiTable";
import { useSelector } from "react-redux";
import Tables from "./Tables";
import Evaluar from "./Evaluar";
import { useState } from "react";
export default function Asistentes() {
    // hooks para abrir y cerrar el modal
    const [isOpen, setIsopen] = useState(false);
    const [id, setId] = useState('');
    let getColumns = useSelector(state => state.colTable.columns['asistentes']);
    const actiones = {
        name: 'Acciones',
        cell: row => (

            <div className=' flex  gap-2'>
                <button title='Evaluar trabajador'
                    onClick={
                        () => {
                            setId(row.id);
                            setIsopen(true);
                        }
                    }

                >
                    <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" /></svg>
                </button>
                <button title="Info" className=''  >

                    <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                </button>
                <button title="Editar" className='' onClick={null}>


                    <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm263-224 37-39-37-37-38 38 38 38Z" /></svg>
                </button>
                <button title='Eliminar' className='' onClick={null}>

                    <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" /></svg>
                </button>
                <button>

                </button>
            </div>
        ),


    }
    const columns = [...getColumns, actiones]
    const { data, isSuccess } = useGetAsistentesQuery()
    //Transformamos los salario y evaluacion
    const modifiedData = data?.map(item => {
        const evaluacion = parseInt(item.evaluacion);
        const salario = parseFloat(item.salario);
        let modifiedEvaluacion = '';
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
        }
        else if (evaluacion === 0) {
            modifiedEvaluacion = 'No evaluado'
            modifiedSalario = '-';
        }


        return {
            ...item,
            evaluacion: modifiedEvaluacion,
            sfinal: '$' + modifiedSalario,
            salario: '$' + salario

        };
    });

    return (
        <>
            {
                isSuccess &&
                <Tables data={modifiedData} columns={columns} name={'Asistentes de control'} />
            }
            <button title="agregar nuevo asistente"
                className="fixed bottom-10 right-10  bg-gray-500 rounded-full shadow-gray-600 shadow-md p-2"
                onClick={() => {
                    // Add your logic here
                }}
            >
                <svg
                    fill="#fff"
                    height="40"
                    viewBox="0 0 24 24"
                    width="40"
                >

                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                </svg>
            </button>
            <Evaluar
                isOpen={isOpen}
                setIsopen={setIsopen}
                id={id}
                data={data?.filter(t => t.id === id)[0]}
                tipo={'asistente'}
            />
        </>
    )
}