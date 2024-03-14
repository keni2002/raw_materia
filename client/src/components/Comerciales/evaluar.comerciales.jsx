import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { auth_state } from "../../features/authSlice";
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Dropdown from './Dropdown';
import { useLazyGetComQuery } from '../../services/apiComercial';
import { useCreateEvalMutation } from '../../services/apiEval';
import { useSelector } from 'react-redux';
export default function EvaluarCom() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getComercialById, { data, isLoading }] = useLazyGetComQuery()
    const { user: { user_id } } = useSelector(auth_state);
    const [createEval] = useCreateEvalMutation()
    const handleSubmit = (values) => {



        if (values.evaluacion == '0')
            return toast.error('Seleccione una evaluación')

        const valores = {
            calificacion: values.evaluacion,
            trabajador: id,
            director: user_id
        }
        console.log(valores)

        createEval(valores)
            .unwrap()
            .then(() => {
                navigate('/comerciales');
                toast.success('Comercial Evaluado')
            })

            .catch((err) => {
                toast.error(err.data.message)
            })

    };
    useEffect(() => {
        getComercialById(id)

    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/comerciales'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className='font-bold text-lg  text-center'>Evaluar a {data?.nombre + " " + data?.apellido} </h3>
            </header>
            <Formik
                initialValues={
                    {
                        evaluacion: '',
                    }
                }

                validationSchema={Yup.object({
                    evaluacion: Yup.string().required('Seleccione una evaluacion')
                }
                )}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, touched, isValid, handleChange, handleBlur }) => {
                    useEffect(() => {
                        if (!isLoading && data) {
                            setFieldValue("evaluacion", 5);
                        }
                    }, [isLoading, data]);
                    return (
                        <Form>
                            <Dropdown name='evaluacion' label={'Evaluación'} />
                            <Btn type='submit' label='Evaluar' />
                        </Form>
                    )
                }}
            </Formik>

        </>
    )
}