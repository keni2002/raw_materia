
import { Link, useNavigate } from "react-router-dom";

export default function Forbidden() {
    const navigate = useNavigate()
    return (
        <div className="h-screen overflow-hidden flex items-center justify-center">


            <div className="flex items-center justify-center min-h-screen bg-white py-48">
                <div className="flex flex-col">

                    <span className="text-center font-bold my-10 opacity-30">
                        Empresa Nacional de Materias Primas

                        <hr className="my-4" />

                        <Link to="/home">
                            <p className='text-slate-500'></p>
                            Raw Materia
                        </Link>
                    </span>


                    <div className="flex flex-col items-center">
                        <div className="text-red-500 font-bold text-7xl">
                            403
                        </div>

                        <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                            Acceso Prohibido
                        </div>

                        <div className="text-gray-400 mb-4 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                            No tiene permisos para acceder a esta URL eso es todo lo que sabemos
                        </div>
                        <button onClick={() => navigate(-1)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Regresar</button>
                    </div>


                </div>
            </div>
        </div>
    )
}