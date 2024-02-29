import { useGetComercialesQuery } from "../services/apiTable";
import Tables from "./Tables";
import Evaluar from "./Evaluar";
import { useState } from "react";
import AddCom from "./AddCom";

export default function Comerciales() {
    // hooks para abrir y cerrar el modal
 
    const [isOpenAdd, setIsopenAdd] = useState(false);
    
    const columns = [
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
            name: "Salario",
            selector: row => row.salario
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

    const { data } = useGetComercialesQuery()
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
        } else if (evaluacion === 0) {
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
            <Tables data={modifiedData} columns={columns}
            name={'Comerciales'}
            mostrarBotonEvaluar={true}
            />

            <button
                title="Agregar un comercial"
                className="fixed bottom-10 right-10  bg-gray-800 rounded-full p-2  shadow-gray-600 shadow-md"
                onClick={() => setIsopenAdd(true)}
            ><svg fill="#fff" height="40" viewBox="0 0 24 24" width="40">
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                </svg>
            </button>

            <Evaluar
                id={id}
                data={data?.filter(t => t.id === id)[0]}
                tipo={'comercial'}
            />
            <AddCom isOpen={isOpenAdd} setIsopen={setIsopenAdd} id={3} data={[]} tipo={'comercial'} />

        </>
    )
}