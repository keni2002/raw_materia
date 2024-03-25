import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { auth_state } from "../features/authSlice";
import { useLogoutMutation } from '../services/auth/usecases/logout';
import { useHandleAsyncLogic } from '../hooks/useHandleAsyncLogic';

import Editicon from "./Icons/Editicon";
// eslint-disable-next-line react/prop-types
function HeaderDash({ toggleMenu }) {

    const [logout, { isLoading, isError, error, isSuccess }] = useLogoutMutation();
    const { user: { nombre, apellido, email, grupo, is_staff, dep, materias, divisiones } } = useSelector(auth_state);



    useEffect(() => {

    }, [])



    useHandleAsyncLogic({ isError, isLoading, isSuccess, error, customURL: '/login', successMesaage: "Sayonara baby" })

    // ----------------------------------------para abajo se acabo la porqueria
    const [showMenu, setShowMenu] = useState(false);
    // const [showSearch, setShowSearch] = useState(false);
    const loginMenuToggle = () => {
        setShowMenu(!showMenu);
    }
    // const searchMenuToggle = () => {
    //     setShowSearch(!showSearch);
    // }

    return (
        <div className="py-2 px-6  bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <button type="button" className="text-lg text-gray-600 sidebar-toggle" onClick={toggleMenu}>
                <svg fill="#1b1b1b" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
                {is_staff && <>Administración</>}
                {grupo == 'comercial_group' && <>{`Dp. Comercial: ${dep[0]}`}</>}
                {grupo == 'asistente_group' && <>{`Dp. Comercial: ${dep}`}</>}
                {grupo == 'director_group' && <>{`Dp. Comercial: ${dep[0]}`}</>}
                {/* legales */}
                {grupo == 'abogado_group' && <>{`Dp.Legal: ${dep[0]}`}</>}
            </h1>
            <ul className="ml-auto flex items-center">
                <h1 className="text-xl  text-gray-900 ml-4">
                    Rol: {grupo.split('_')[0]}


                </h1>
                <li className="dropdown relative ml-3">

                    <div onClick={loginMenuToggle} type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="bg-gray-200 w-10 h-10 rounded-full cursor-pointer"><p className="text-center align-text-bottom">{nombre?.charAt(0).toUpperCase() + apellido?.charAt(0).toUpperCase()}</p></div>
                    {/* <!-- Dropdown menu --> */}
                    <div onClick={loginMenuToggle} className={`fixed ${showMenu || 'hidden'}  inset-0 transition-opacity`}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    {showMenu && <div id="userDropdown" className="z-10 absolute right-3 cursor-pointer bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="flex gap-3">
                                <div className=" flex flex-col">
                                    <div>{`${nombre} ${apellido}`}</div>
                                    <div className="font-medium mt-3 text-xs truncate">Email: {email}</div>
                                </div>
                                <Editicon size={30} fill={'#646464'} />
                            </div>
                        </div>
                        {grupo == 'abogado_group' && <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>Divisiones:</div>
                            <ul className="list-disc list-inside ml-3">
                                {
                                    divisiones &&
                                    divisiones.map(element => <li>{element}</li>)
                                }
                            </ul>

                        </div>}

                        <div className="py-1">
                            <button onClick={logout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar Sesión</button>
                        </div>
                    </div>}

                </li>

            </ul>
        </div>
    )
}

export default HeaderDash