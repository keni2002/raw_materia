export default function Home() {
    return (
        <>


            <div className="min-h-screen flex flex-col justify-between">


                <div id="default-carousel" className="z-0 relative w-full" data-carousel="slide">

                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="carrousel/dos.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>

                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="carrousel/tres.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>

                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="carrousel/cuatro.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>

                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="carrousel/cinco.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>

                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                    </div>

                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>

                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>

                <h1 className="mt-4  text-3xl  text-center">Empresa Nacional de materias Primas</h1>
                <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mb-16 m-4">
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                <svg fill='gray' height="50" viewBox="0 -960 960 960" width="50"><path d="m426.999-175.348-182.477-105.39q-24.652-14.392-38.827-38.827-14.174-24.435-14.174-52.783V-583.13q0-28.348 14.174-52.783 14.175-24.435 38.827-38.827l182.477-105.39q24.653-14.392 53.001-14.392t53.001 14.392l182.477 105.39q24.652 14.392 38.827 38.827 14.174 24.435 14.174 52.783v210.782q0 28.348-14.174 52.783-14.175 24.435-38.827 38.827l-182.477 105.39Q508.348-160.956 480-160.956t-53.001-14.392ZM60.782-681.696v-111.521q0-44.305 30.848-75.153 30.848-30.848 75.153-30.848h111.521v97.522h-120v1  20H60.782ZM278.304-60.782H166.783q-44.305 0-75.153-30.848-30.848-30.848-30.848-75.153v-111.521h97.522v120h120v97.522Zm403.392 0v-97.522h120v-120h97.522v111.521q0 44.305-30.848 75.153-30.848 30.848-75.153 30.848H681.696Zm120-620.914v-120h-120v-97.522h111.521q44.305 0 75.153 30.848 30.848 30.848 30.848 75.153v111.521h-97.522ZM338.392-607.13l-40.869 23.435v46.13L440-454.174v163.651l40 23.566 40-23.566v-163.651l142.477-83.391v-46.13l-40.869-23.435L480-523.739 338.392-607.13Z" /></svg>
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Raw Materia</span>
                            </a>
                            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                <li>
                                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"> &copy; {new Date().getFullYear()} <a href="" className="hover:underline">Raw Materia™</a>. All Rights Reserved.</span>
                    </div>
                </footer>
            </div>

        </>
    )
}