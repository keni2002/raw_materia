import { useEffect, useState } from "react";

import { useUpdateComercialMutation, useUpdateAsistenteMutation } from "../services/apiTable";
import toast from "react-hot-toast";

export default function AddCom({ setIsopen, isOpen, id, data, tipo }) {
    const [updateComercial] = useUpdateComercialMutation();
    const [updateAsistente] = useUpdateAsistenteMutation();
    const [selectEval, setSelectEval] = useState("0");

    useEffect(() => {
        setSelectEval(data?.evaluacion);
    }, [isOpen])//solo si se abre cargamos los datos mongos
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Evaluación realizada')
        setIsopen(false)
    }
    const onChange = (e) => {
        setSelectEval(e.target.value)
    }
    return (
        <>
            {isOpen && <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                <div className='  bg-white p-5 rounded flex flex-col justify-center items-center gap-5 lg:w-96 md:w-80 sm:w-full '>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-2xl lg:text-3xl'>Agregar Comercial</h2>
                        <button onClick={() => setIsopen(false)}>

                            <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </button>
                    </div>
                    <form class="max-w-sm w-full sm:h-full lg:h-96 overflow-auto pr-3">
                        <div class="mb-5">
                            <label htmlFor="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Jhon" required />
                        </div>
                        <div class="mb-5">
                            <label htmlFor="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                            <input type="text" id="apellido" name="apellido" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Gomez" required />
                        </div>
                        <div class="mb-5">
                            <label htmlFor="direccion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                            <input type="txt" id="direccion" name="direccion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Gomez" required />
                        </div>
                        <div class="mb-5">
                            <label htmlFor="fechanac" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Nacimiento</label>
                            <input type="date" id="fechanac" name="fechanac" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="flex gap-1">
                            <div class="mb-5">
                                <label htmlFor="edad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edad</label>
                                <input type="number" id="edad" name="edad" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Edad" required />
                            </div>
                            <div class="mb-5">
                                <label htmlFor="anioExperiencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Años de Experiencia</label>
                                <input type="number" id="anioExperiencia" name="anioExperiencia" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Experiencia" required />
                            </div>
                        </div>
                        {/* Moni */}
                        <div class="mb-5">
                            <label htmlFor="salario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salario</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 ps-2 top-5 flex items-center pointer-events-none">

                                    <svg  height="24" fill="gray" viewBox="0 -960 960 960" width="24"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" /></svg>

                                </div>
                            </div>
                            <input type="number" id="salario" name="salario" class=" pl-8 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="CUP" required />
                        </div>

                        <div class="mb-5">
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="name@rowmateria.com" required />
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5">
                            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir Contraseña</label>
                            <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" required />
                        </div>

                        <button type="submit" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Registrar nuevo Comercial</button>
                    </form>

                </div>
            </div>
            }
        </>
    )
}