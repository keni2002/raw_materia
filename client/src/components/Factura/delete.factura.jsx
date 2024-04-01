
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeleteFactMutation, useLazyGetFactQuery } from '../../services/apiFactura';
import Backicon from '../Icons/Backicon';
export default function deleteFact() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getFactById, { data, isLoading }] = useLazyGetFactQuery()
    const [deleteFact] = useDeleteFactMutation()
    const handleSubmit = () => {

        deleteFact(id)
            .unwrap()
            .then(() => {
                navigate('/facturas');
                toast.success('Factura Eliminada')
            })
            .catch((err) => {
                toast.error(err.data.detail)
            })

    };
    useEffect(() => {
        getFactById(id)
    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/facturas'>
                    <Backicon />
                </Link>
                <h3 className=' text-lg  text-center'>Eliminar</h3>
            </header>
            <h3 className='font-bold text-xl'>Deseas Eliminar la factura id:  {data?.id} de los productos:
                {data?.productStr}
            </h3>
            <div className='pb-3'></div>
            <div className='flex gap-3'>
                <button onClick={handleSubmit} type='button' className=' text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Eliminar</button>
                <Link to='/facturas'>
                    <Btn type={'button'} label={'Cancelar'}></Btn>
                </Link>
            </div>



        </>
    )
}