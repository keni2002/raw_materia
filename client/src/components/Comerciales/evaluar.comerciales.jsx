import { Formik, Field, Form, ErrorMessage } from 'formik';
import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useUpdateComercialMutation, useLazyGetComercialQuery, useCreateComercialMutation } from '../../services/apiTable';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Dropdown from './Dropdown';
export default function Evaluar() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getComercialById, { data, isLoading }] = useLazyGetComercialQuery()
    const [updateComercial] = useUpdateComercialMutation()
    const handleSubmit = (values) => {

        if (values.evaluacion == '0')
            return toast.error('Seleccione una evaluación')
        updateComercial({ id, ...values })
            .unwrap()
            .then(() => {
                navigate('/comerciales');
                toast.success('Comercial Evaluado')
            })

    };
    useEffect(() => {
        getComercialById(id)
    }, [id])
    return (
        <>

            <Formik>

                <Form>
                    <Dropdown value={0}/>
                    <Btn type='submit' text='Evaluar' />
                </Form>

            </Formik>

        </>
    )
}