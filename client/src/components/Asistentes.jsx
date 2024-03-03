import { useGetComercialesQuery } from "../services/apiTable";
import Tables from "./Tables";
import Evaluar from "./Evaluar";
import { useState } from "react";
import AddPersona from "./AddPersona";
import Info from "./Info";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "./ModalConfirm";
import { setFuncion, setType,setIsopenAdd } from "../features/booleanos";
import { useEffect } from "react";
export default function Asistentes() {
    const dispatch = useDispatch()
    // hooks para abrir y cerrar el modal

    //Las tablas cambian://////
    useEffect(() => {
        dispatch(setType('comerciales'))
    }, [])
    //////////////////////////
    
    
    
    const {iD:id, isOpenAdd,funcion} = useSelector(state => state.booleanos);
    
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
            name: "Contratos",
            selector: row => row.cntContratos
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
                onClick={() => {dispatch(setIsopenAdd(true));dispatch(setFuncion('add'))}}
            ><svg fill="#fff" height="40" viewBox="0 0 24 24" width="40">
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                </svg>
            </button>

            <Evaluar
                data={data?.filter(t => t.id === id)[0]}
            />
            <Info/>
            <AddPersona id={id}  />
            <ModalConfirm/>
        </>
    )
}