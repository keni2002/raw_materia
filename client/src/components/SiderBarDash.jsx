import React, { useState } from 'react';

const SidebarDash = ({ closeMenu, menuVisible }) => {



    return (
        <>
            <div className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${menuVisible ? '' : '-translate-x-full'}`}>
                <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">

                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="50" viewBox="0 -960 960 960" width="50"><path d="m426.999-175.348-182.477-105.39q-24.652-14.392-38.827-38.827-14.174-24.435-14.174-52.783V-583.13q0-28.348 14.174-52.783 14.175-24.435 38.827-38.827l182.477-105.39q24.653-14.392 53.001-14.392t53.001 14.392l182.477 105.39q24.652 14.392 38.827 38.827 14.174 24.435 14.174 52.783v210.782q0 28.348-14.174 52.783-14.175 24.435-38.827 38.827l-182.477 105.39Q508.348-160.956 480-160.956t-53.001-14.392ZM60.782-681.696v-111.521q0-44.305 30.848-75.153 30.848-30.848 75.153-30.848h111.521v97.522h-120v120H60.782ZM278.304-60.782H166.783q-44.305 0-75.153-30.848-30.848-30.848-30.848-75.153v-111.521h97.522v120h120v97.522Zm403.392 0v-97.522h120v-120h97.522v111.521q0 44.305-30.848 75.153-30.848 30.848-75.153 30.848H681.696Zm120-620.914v-120h-120v-97.522h111.521q44.305 0 75.153 30.848 30.848 30.848 30.848 75.153v111.521h-97.522ZM338.392-607.13l-40.869 23.435v46.13L440-454.174v163.651l40 23.566 40-23.566v-163.651l142.477-83.391v-46.13l-40.869-23.435L480-523.739 338.392-607.13Z" /></svg>


                    {/* <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover"/> */}
                    <span className="text-lg font-bold text-white ml-3">Raw Materia</span>
                </a>
                <ul className="mt-4">
                    <li className="mb-1 group active">
                        <a href="#" className="flex items-center gap-2 py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">


                            <svg fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360Zm0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z" /></svg>

                            <span className="text-sm"> Ver Contratos</span>
                        </a>
                    </li>
                    <li className="mb-1 group">
                        <a href="#" className="flex gap-2 items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle" >

                            <svg fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" /></svg>
                            <span className="text-sm">Evualar</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Active order</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Completed order</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Canceled order</a>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-1 group">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle" >
                            <i className="ri-flashlight-line mr-3 text-lg"></i>
                            <span className="text-sm">Services</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-1 group">
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                            <i className="ri-settings-2-line mr-3 text-lg"></i>
                            <span className="text-sm">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${menuVisible ? '' : 'hidden'}`} onClick={closeMenu} ></div>

        </>
    )
};

export default SidebarDash;
