
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeleteProdMutation, useLazyGetProdQuery } from '../../services/apiProductos';
import Backicon from '../Icons/Backicon';
export default function DeleteProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getProdById, { data, isLoading }] = useLazyGetProdQuery()
    const [deleteProduct] = useDeleteProdMutation()
    const handleSubmit = () => {

        deleteProduct(id)
            .unwrap()
            .then(() => {
                navigate('/productos');
                toast.success('Producto Eliminado')
            })
            .catch((err) => {
                toast.error(err.data.message)
            })

    };
    useEffect(() => {
        getProdById(id)
    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/productos'>
                    <Backicon />
                </Link>
                <h3 className=' text-lg  text-center'>Eliminar</h3>
            </header>
            <h3 className='font-bold text-xl'>Deseas Eliminar  {data?.nombre}</h3>
            <div className='pb-3'></div>
            <div className='flex gap-3'>
                <button onClick={handleSubmit} type='button' className=' text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Eliminar</button>
                <Link to='/productos'>
                    <Btn type={'button'} label={'Cancelar'}></Btn>
                </Link>
            </div>



        </>
    )
}