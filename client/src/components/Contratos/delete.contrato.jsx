
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeleteContratMutation, useLazyGetContratQuery } from '../../services/apiContratos';
export default function DeleteCont() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getContratById, { data }] = useLazyGetContratQuery()
    const [deleteCont] = useDeleteContratMutation()
    const handleSubmit = () => {

        deleteCont(id)
            .unwrap()
            .then(() => {
                navigate('/contratos');
                toast.success('Contrato Eliminado')
            })
            .catch((err) => {
                toast.error(err.data.message)
            })

    };
    useEffect(() => {
        getContratById(id)
    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/contratos'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className=' text-lg  text-center'>eliminar</h3>
            </header>

            <h3 className='font-bold text-xl'>Deseas Eliminar el contrato {data?.codigo.substring(0, 5) + '...'}que tiene con el suministrador <span className='text-red-600'>{data?.suministradorName}</span></h3>
            <div className='pb-3'></div>
            <div className='flex gap-3'>
                <button onClick={handleSubmit} type='button' className=' text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Eliminar</button>
                <Link to='/contratos'>
                    <Btn type={'button'} label={'Cancelar'}></Btn>
                </Link>
            </div>



        </>
    )
}