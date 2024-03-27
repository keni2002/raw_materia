
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useLazyGetProdQuery } from '../../services/apiProductos';

import fechaHumana from '../utils/fechaHumana';
export default function InfoProductos() {

    const { id } = useParams();

    const [getProductById, { data }] = useLazyGetProdQuery()

    useEffect(() => {
        getProductById(id)
    }, [])

    return (
        <>
            {console.log(data)}
            <header className='flex justify-between pb-10'>
                <Link to='/productos'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>
                <h3 className=' text-lg  text-center'>Detalles del Producto</h3>
            </header>
            <div className='p-4 mb-3 bg-gray-100 rounded-md'>
                <p className='mt-4'><span className='font-bold'>Descripcion del producto: </span> </p>
                <div className='p-4  bg-slate-200 rounded-md'>
                    <p><span className='font-bold'>Codigo: </span>{data?.codigo}</p>
                    <p><span className='font-bold'>Nombre: </span> {data?.nombre}</p>

                    <p><span className='font-bold'>Fecha de Producción: </span> {fechaHumana(data?.fecha_produccion)}</p>
                    <p><span className='font-bold'>Fecha de Vencimiento: </span> {fechaHumana(data?.fecha_vencimiento)}</p>

                    <p><span className='font-bold'>Tipo: </span>{data?.tipo}</p>
                    <p><span className='font-bold'>Suministrador: </span>{data?.suministradorName}</p>
                    <p><span className='font-bold'>Calidad: </span>{data?.calidad}</p>
                    <p><span className='font-bold'>Descripción: </span>{data?.descripcion}</p>
                </div>
            </div >
        </>
    )
}