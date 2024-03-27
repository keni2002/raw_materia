import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Icons/Logo'
import Contratoicon from '../components/Icons/Contratoicon'
import Compraicon from '../components/Icons/Compraicon'
import Personalicon from '../components/Icons/Personalicon'
import { auth_state } from '../features/authSlice';
import { Provider, useSelector } from 'react-redux';
import Producicon from '../components/Icons/Producticon'
import Informeicon from '../components/Icons/Informeicon'
import Suppliericon from '../components/Icons/Suppliericon'
const SidebarDash = ({ closeMenu, menuVisible }) => {
    const { user: { grupo } } = useSelector(auth_state);
    const [dropdowns, setDropdowns] = useState({});

    const toggleDropdown = (id) => {
        setDropdowns({
            ...dropdowns,
            [id]: !dropdowns[id]
        });
    };


    return (
        <>
            <div className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${menuVisible ? '' : '-translate-x-full'}`}>

                <Link to={'/'}>
                    <div className="flex items-center pb-4 border-b border-b-gray-800">
                        <Logo size={50} fill={'white'} />
                        <span className="text-lg font-bold text-white ml-3">Raw Materia</span>
                    </div>
                </Link>

                <ul className="mt-4">
                    <li className="mb-1 group">
                        <Link to='/contratos' >
                            <div className="flex items-center gap-2 py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                <Contratoicon size={'24'} fill={'white'} />
                                <span className="text-sm">Contratos</span>
                            </div>
                        </Link>
                    </li>
                    <li className="mb-1 group">
                        <Link to='/informes' >
                            <div className="flex items-center gap-2 py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                <Informeicon size={'24'} fill={'white'} />
                                <span className="text-sm">Informes</span>
                            </div>
                        </Link>
                    </li>
                    {grupo != 'abogado_group' && <>

                        <li className="mb-1 group">
                            <Link to='/facturas' >
                                <div className="flex items-center gap-2 py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                    <Compraicon size={'24'} fill={'white'} />
                                    <span className="text-sm">Factura</span>
                                </div>
                            </Link>
                        </li>
                        <li className="mb-1 group">
                            <Link to='/productos'>
                                <div className="flex gap-2 items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                    <Producicon size={'24'} fill={'white'} />
                                    <span className="text-sm">Productos</span>
                                </div>


                            </Link>
                        </li>
                        <li className="mb-1 group">
                            <Link to='/suministradores'>
                                <a href="#" className="flex gap-2 items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                    <Suppliericon size={'24'} fill={'white'} />
                                    <span className="text-sm">Suministradores</span>
                                </a>
                            </Link>
                        </li>



                        <li className="mb-1 group">
                            <a href="#" className="flex gap-2 items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                                onClick={() => toggleDropdown('dropdown1')} >
                                <Personalicon />
                                <span className="text-sm">Personal</span>
                                <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                            </a>
                            {dropdowns['dropdown1'] &&
                                <ul className="pl-7 mt-2 group-[.selected]:block">

                                    <li className="mb-4">
                                        <Link to='/comerciales'>
                                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Comerciales</a>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link to='/asistentes'>
                                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Asistentes de Control</a>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link to='/abogados'>
                                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Abogados</a>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link to='/directores'>
                                            <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Directores</a>
                                        </Link>
                                    </li>
                                </ul>
                            }

                        </li>
                    </>
                    }
                </ul>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${menuVisible ? '' : 'hidden'}`} onClick={closeMenu} ></div>

        </>
    )
};

export default SidebarDash;
