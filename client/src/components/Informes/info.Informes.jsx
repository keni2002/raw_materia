
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useLazyGetInformeQuery } from '../../services/apiInforme';

import fechaHumana from '../utils/fechaHumana';
export default function InfoInformes() {
    function toTexto(char) {
        switch (char) {
            case 'A':
                return 'Aprobado'; break;
            case 'N':
                return 'No aprobado'; break;
            case 'P':
                return 'Pendiente'; break;
            default:
                break;
        }
    }
    const { id } = useParams();

    const [getInformeById, { data }] = useLazyGetInformeQuery()

    useEffect(() => {
        getInformeById(id)
    }, [])

    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/informes'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>
                <h3 className=' text-lg  text-center'>Detalles del Informe</h3>
            </header>
            <div className='p-4 mb-3 bg-gray-100 rounded-md'>
                <p className='mt-4'><span className='font-bold'>Descripcion del Informe: </span> </p>
                <div className='p-4  bg-slate-200 rounded-md'>
                    <p className={`${data?.estado == 'A' ? 'text-green-700' : 'text-red-500'} font-bold`}>{toTexto(data?.estado)}</p>
                    <p><span className='font-bold'>ID: </span> {data?.codigo}</p>
                    <p><span className='font-bold'>Fecha:</span> {fechaHumana(data?.fecha)}</p>
                    <p><span className='font-bold'>Detalle de Informe: </span>{data?.descripcion}</p>
                </div>
            </div >
        </>
    )
}