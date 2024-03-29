// import styled from 'styled-components';

// const TextField = styled.input`
// 	height: 32px;
// 	width: 200px;
// 	border-radius: 3px;
// 	border-top-left-radius: 5px;
// 	border-bottom-left-radius: 5px;
// 	border-top-right-radius: 0;
// 	border-bottom-right-radius: 0;
// 	border: 1px solid #e5e5e5;
// 	padding: 0 32px 0 16px;

// 	&:hover {
// 		cursor: pointer;
// 	}
// `;


// export const SearchFilter = ({ filterText, onFilter, onClear }) => (
// 	<>
// 		<TextField
// 			id="search"
// 			type="text"
// 			placeholder="Filter By Name"
// 			aria-label="Search Input"
// 			value={filterText}
// 			onChange={onFilter}
// 		/>
// 		<button type="button" onClick={onClear}>
// 			X
// 		</button>
// 	</>
// );

import Cruz from "./Icons/Cruz"
export default function SearchFilter({ placeholder, filterText, onFilter, onClear, estado, setStadoHook }) {
	return (
		<form class="max-w-md pt-5 mx-auto">
			<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
			<div className="flex flex-col">
				<div class="relative">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
						</svg>
					</div>
					<input type="search" value={filterText} onChange={onFilter} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder={placeholder} />
					<button type="button" onClick={onClear} className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
						<Cruz size={20} fill={'white'} />
					</button>

				</div>
				<div className="flex pt-2 justify-center">


					{estado && <>

						<button type="button" onClick={() => setStadoHook('Aprobado')} className="bg-green-100 hover:bg-green-200 text-green-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 inline-flex items-center justify-center">aprobados</button>
						<button type="button" onClick={() => setStadoHook('No aprobado')} className="bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 inline-flex items-center justify-center">no aprobados</button>
						<button type="button" onClick={() => setStadoHook('Pendiente')} className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-orange-400 border border-orange-400 inline-flex items-center justify-center">pendiente</button>
						<button type="button" onClick={() => setStadoHook('-')} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">todos</button>

					</>
					}
				</div>
			</div>
		</form>
	)
}