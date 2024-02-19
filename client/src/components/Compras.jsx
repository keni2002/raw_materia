import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
const columns = [
	{
		name: 'Materia',
		selector: row => row.materia,
	},
	{
		name: 'Fecha de Compra',
		selector: row => row.createAt,
	},
  {
    name: 'Comercial',
    cell: row => (
      <div>
        <Link to={`/ruta/${row.id}`}>
          <p className='text-blue-800'>
            {row.comercial}
          </p>
          </Link>
      </div>

    ),
  },
  {
    name: 'Suministrador',
    cell: row => (
      <div>
        <Link to={`/ruta/${row.id}`}>
          <p className='text-blue-800'>
            {row.suministrador}
          </p>
          </Link>
      </div>

    ),
    
   
  },
  {
    name: 'Acciones',
    cell: row => (
      <div className=' flex gap-2'>
        <button   className= ' bg-blue-900 text-white p-2 rounded-lg' onClick={null}>detalles</button>
        <button   className= ' bg-green-800 text-white p-2 rounded-lg' onClick={null}>editar</button>
        <button className='bg-red-900 text-white p-2 rounded-lg' onClick={null}>Delete</button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
  
  },
];

const data = [
  	{
    materia: 'Materia Prima',
    createAt: '2021-10-10', 
    suministrador: 'Microsoft',
    comercial: 'Bill Gates'	
    }
]


function Compras() {

    return (
        <>
        <h1 className="text-2xl font-bold pt-6">Todos los Compras</h1>  
        <div className=' lg:w-10/12 w-11/12 shadow-md bg-gray-300 '>
        <DataTable

			columns={columns}
			data={data}
      />
        </div>
        </>
        
    )
}

export default Compras