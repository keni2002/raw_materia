import React from 'react';
import { Link } from 'react-router-dom';
export const columns = [
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
    
   
  }
];

export const data = [
  	{
    materia: 'Materia Prima',
    createAt: '2021-10-10', 
    suministrador: 'Microsoft',
    comercial: 'Bill Gates'	
    }
]
