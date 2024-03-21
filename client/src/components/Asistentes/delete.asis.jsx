
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLazyGetAsistQuery, useDeleteAsistMutation } from '../../services/apiAsistente';
export default function DeleteAsis() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getAsistenteById, { data, isLoading }] = useLazyGetAsistQuery()
    const [deleteAsistente] = useDeleteAsistMutation()
    const handleSubmit = () => {

        deleteAsistente(id)
            .unwrap()
            .then(() => {
                navigate('/asistentes');
                toast.success('Asistente Eliminado')
            })
            .catch((err) => {
                toast.error(err.data.message)
            })

    };
    useEffect(() => {
        getAsistenteById(id)
    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/comerciales'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className=' text-lg  text-center'>eliminar</h3>
            </header>

            <h3 className='font-bold text-xl'>Deseas Eliminar a {data?.nombre + " " + data?.apellido}</h3>
            <div className='pb-3'></div>
            <div className='flex gap-3'>
                <button onClick={handleSubmit} type='button' className=' text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Eliminar</button>
                <Link to='/comerciales'>
                    <Btn type={'button'} label={'Cancelar'}></Btn>
                </Link>
            </div>



        </>
    )
}