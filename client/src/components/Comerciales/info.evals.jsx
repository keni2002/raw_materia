
import { useEffect } from 'react';
import {  useParams, Link } from 'react-router-dom';

import { useLazyGetComQuery } from '../../services/apiComercial';
import { useLazyGetEvalOfQuery } from '../../services/apiEvalsOf';
import Tables from '../Tables';
export default function InfoEvals() {
    const { id } = useParams();

    const [getEvalsById, { data }] = useLazyGetEvalOfQuery()
  
    useEffect(() => {
        getEvalsById(id)
    }, [id])
    console.log(data.)
   
    const columns = [
        {
            name: "Evaluacion",
            selector: row => row.calificacion,
            sortable: true
        },
        {
            name: "Director",
            selector: row => row.director,
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => row.fecha,
            sortable: true
        }
    ]
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to={`/comerciales/info/${id}`}>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className=' text-lg  text-center'>Evaluaciones de {"nombre"} </h3>
            </header>
            <Tables data={data} columns={columns} title={''}

            />




        </>
    )
}