import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { 
    useUpdateComercialMutation,
    useUpdateAsistenteMutation 

} from "../services/apiTable";


import toast from "react-hot-toast";
import { setIsOpenModalEvaluar } from "../features/booleanos";

export default function Evaluar({data, tipo }) {
    const dispatch = useDispatch();
    const {isOpenModalEvaluar,iD:id} = useSelector(state => state.booleanos);
    
    const [updateComercial] = useUpdateComercialMutation();
    const [updateAsistente] = useUpdateAsistenteMutation();
    const [selectEval, setSelectEval] = useState("0");
    const [nombre, setNombre] = useState()
    useEffect(() => {
        
        setSelectEval(data?.evaluacion);
        
        setNombre(data?.nombre)
    }, [isOpenModalEvaluar])//solo si se abre cargamos los datos mongos
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectEval == '0')
            return toast.error('Seleccione una evaluación')

        if (tipo === 'asistente')
            updateAsistente({ id, evaluacion: parseInt(selectEval) })
        else if (tipo === 'comercial')
            updateComercial({ id, evaluacion: parseInt(selectEval) })
        toast.success('Evaluación realizada')


        dispatch(setIsOpenModalEvaluar(false))
    }
    const onChange = (e) => {
        setSelectEval(e.target.value)
    }
    return (
        <>
            {isOpenModalEvaluar && <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center '>
                <div className='  bg-white p-5 rounded flex flex-col justify-center items-center gap-5 lg:w-96 md:w-80 sm:w-10/12'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-2xl lg:text-3xl'>Evaluar a {nombre}</h2>
                        <button onClick={() => dispatch(setIsOpenModalEvaluar(false))}>
                            <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </button>
                    </div>
                    <form action="" onSubmit={handleSubmit} className='w-full' >
                        <div className=" pt-4 col-span-2 sm:col-span-1 flex items-center justify-between w-10/12 gap-6">
                            <label htmlFor="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evaluación</label>
                            <select id="category" onChange={onChange} value={selectEval} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="" value="0">Seleccione</option>
                                <option value="5">Exelente</option>
                                <option value="4">Bien</option>
                                <option value="3">Regular</option>
                                <option value="2">Mal</option>
                            </select>
                        </div>
                        <div className='mt-9 flex w-full justify-end'>
                            <button type="submit" className=" text-white inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Evaluar
                            </button>
                        </div>

                    </form>

                </div>
            </div>}
        </>
    )
}