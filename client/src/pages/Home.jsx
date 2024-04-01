import { Link } from "react-router-dom"
import Logo from "../components/Icons/Logo"
export default function Home() {
    return (
        <>


            <div className="min-h-screen flex flex-col">


                <div className="flex items-center justify-center">
                    <img src="dashlogo.svg" alt="" className="w-full" srcset="" />

                </div>

                <h1 className="mt-4  text-3xl  text-center">Empresa Nacional de materias Primas</h1>
                <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mb-16 m-4">
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center flex items-center  sm:justify-between">
                            <Link to={'/'}>
                                <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                    <Logo size={50} fill={'gray'} />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Raw Materia</span>

                                </div>
                            </Link>


                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"> &copy; {new Date().getFullYear()} <a href="" className="hover:underline">Raw Materia™</a>. Todos los derechos reservados</span>
                    </div>
                </footer>
            </div>

        </>
    )
}