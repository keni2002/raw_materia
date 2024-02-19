import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Numero de Contrato',
		selector: row => row.numberC,
	},
	{
		name: 'Fecha de Creación',
		selector: row => row.createAt,
	},
  {
    name: 'Fecha de Validez',
    selector: row => row.valid,
  },
  {
    name: 'Estado',
    selector: row => row.state
  },
  {
    name: 'Acciones',
    cell: row => (
      <div className=' flex  gap-2'>
        <button   className= ' lg:bg-blue-900 lg:text-white lg:p-2 lg:rounded-lg' onClick={null}>detalles</button>
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
    numberC: 'contrato0001',
    createAt: '2021-10-10',
    valid: '2021-10-10',
    state: 'Pendiente'

  },
  {
    numberC: 'contrato0002',
    createAt: '2021-10-10',
    valid: '2021-10-10',
    state: 'Aprobado'
  },
  {
    numberC: 'contrato0003',
    createAt: '2021-10-10',
    valid: '2021-10-10',
    state: 'Pendiente'
  }
]


function Contratos() {

    return (
        <>
        <h1 className="text-2xl font-bold pt-6">Todos los Contratos</h1>  
        <div className=' lg:w-10/12 w-11/12 shadow-md bg-gray-300 '>
        <DataTable

			columns={columns}
			data={data}
      />
        </div>
        </>
        
    )
}

export default Contratos