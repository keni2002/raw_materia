import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth_state } from "../features/authSlice";
import { useLogoutMutation } from '../services/auth/usecases/logout';
import { useHandleAsyncLogic } from '../hooks/useHandleAsyncLogic';
function HeaderDash({ toggleMenu }) {
    const dispatch = useDispatch();
    const [logout, { isLoading, isError, error, isSuccess }] = useLogoutMutation();
    const { user: { nombre, apellido, email } } = useSelector(auth_state);

    useHandleAsyncLogic({ isError, isLoading, isSuccess, error, customURL: '/login', successMesaage: "Sayonara baby" })

    // ----------------------------------------para abajo se acabo la porqueria
    const [showMenu, setShowMenu] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const loginMenuToggle = () => {
        setShowMenu(!showMenu);
    }
    const searchMenuToggle = () => {
        setShowSearch(!showSearch);
    }

    return (
        <div className="py-2 px-6  bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <button type="button" className="text-lg text-gray-600 sidebar-toggle" onClick={toggleMenu}>
                <svg fill="#1b1b1b" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </button>
            {/* <h1 className="text-2xl font-bold text-gray-900 ml-4">{`${tipo == 'Admin' ? 'Administración Central' : `Departamento ${tipo}`}`}</h1> */}
            <ul className="ml-auto flex items-center">

                <li className="dropdown relative ml-3">

                    <div type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="bg-gray-200 w-10 h-10 rounded-full cursor-pointer"><p className="text-center align-text-bottom">{nombre?.charAt(0).toUpperCase() + apellido?.charAt(0).toUpperCase()}</p></div>
                    {/* <!-- Dropdown menu --> */}
                    <div id="userDropdown" class="z-10 hidden  cursor-pointer bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{`${nombre} ${apellido}`}</div>
                            <div class="font-medium truncate">{email}</div>
                        </div>

                        <div class="py-1">
                            <button onClick={logout} class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    )
}

export default HeaderDash