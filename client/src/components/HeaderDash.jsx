import { useState } from "react";

function HeaderDash({ toggleMenu }) {
    const [showMenu, setShowMenu] = useState(false);
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
            {/* <ul className="flex items-center text-sm ml-4">
                <li className="mr-2">
                    <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">AreaComercial</a>
                </li>
                <li className="text-gray-600 mr-2 font-medium">/</li>
                <li className="mr-2">
                    <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">Admin</a>
                </li>
                <li className="text-gray-600 mr-2 font-medium">/</li>
                <li className="text-gray-600 mr-2 font-medium">Contratos</li>
            </ul> */}
            <ul className="ml-auto flex items-center">
                {/* <li className="mr-1 dropdown relative" >
                    <button type="button" className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"  onClick={searchMenuToggle}>

                        <svg fill="black" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    </button>
                    <div className={`${showSearch ? '': 'hidden'} dropdown-menu shadow-md shadow-black/5 z-30 absolute right-6 w-48 bg-slate-200  rounded-md border border-gray-100`}>
                        <form action="" className="p-4 border-b border-b-gray-100">
                            <div className="relative w-full">
                                <input type="text" className=" py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..." />
                                
                                <svg fill="gray" className="absolute top-1/2 left-4 -translate-y-1/2" height="20" viewBox="0 -960 960 960" width="20"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                            </div>
                        </form>

                    </div>
                </li> */}
            
                <li className="dropdown relative ml-3">
                    
<div id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="bg-gray-200 w-10 h-10 rounded-full cursor-pointer"><p className="text-center align-text-bottom">LK</p></div>

{/* <!-- Dropdown menu --> */}
<div id="userDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>Bonnie Green</div>
      <div class="font-medium truncate">name@flowbite.com</div>
    </div>
    {/* <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
    </ul> */}
    <div class="py-1">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</div>

                </li>
            </ul>
        </div>
    )
}

export default HeaderDash