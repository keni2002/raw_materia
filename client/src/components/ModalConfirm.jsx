import { useDispatch, useSelector } from "react-redux";
import { useDeleteComercialMutation } from "../services/apiTable";
import toast from "react-hot-toast";
import { setIsOpenModalConfirm } from "../features/booleanos";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ModalConfirm() {
    const { iD: id } = useSelector(state => state.booleanos);
    console.log(id)
    const [deleteComercial, { isSuccess }] = useDeleteComercialMutation();
    const [text, setText] = useState('');
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const { isOpenModalConfirm } = useSelector(state => state.booleanos);
    useEffect(() => {
        if (text === 'voy a Eliminar un usuario') {
            setDisabled(false)
        } else {
            setDisabled(true)

        }
    }, [text])

    const deleteHandler = async () => {
        try {
            const result = await deleteComercial(id);
            unwrapResult(result);
            toast.success('Se ha eliminado el comercial');
            dispatch(setIsOpenModalConfirm(false));
            setText('')
        }catch(err){
            toast.error('Error al eliminar')
        }
        
        
    }
    const handleText = (e) => {
        setText(e.target.value)
    }
    return (
        <>
            {isOpenModalConfirm && <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center '>


                <div class="relative  shadow dark:bg-gray-700   w-full max-w-md max-h-full  bg-white p-5 rounded flex flex-col justify-center items-center gap-5 lg:w-96 md:w-80 sm:w-10/12">
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Quieres eliminar esto?</h3>
                        <div className="pb-3">
                            <label htmlFor="confirm">Escriba: voy a Eliminar un usuario</label>
                            <input type="text" onChange={handleText} value={text} id="confirm" name="confirm" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" required />
                        </div>
                        {!disabled && <button onClick={deleteHandler} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Sí, estoy seguro
                        </button>}
                        <button onClick={() => dispatch(setIsOpenModalConfirm(false))} type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancelar</button>
                    </div>
                </div>
            </div>

            }
        </>
    )
}