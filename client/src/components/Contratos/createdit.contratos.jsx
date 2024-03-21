import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useCreateCotratMutation, useLazyGetContratQuery, useUpdateContratMutation } from '../../services/apiContratos'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import FieldArea from '../FieldArea';
import DDSum from './dropdownSumin';
export default function ContratoForm() {
  const [fechaMinima, setFechaMinima] = useState()
  const navigate = useNavigate();
  const { id } = useParams();
  const [getContratById, { data, isLoading }] = useLazyGetContratQuery()
  const [updateContrat] = useUpdateContratMutation()
  const [createContrato] = useCreateCotratMutation()

  const { user: { id: com_id, grupo } } = useSelector(auth_state);
  // const fecha = () => {
  //   const date = new Date();
  //   date.setFullYear(date.getFullYear() - 18);
  //   return date.toISOString().split('T')[0];
  // }
  useEffect(() => {
    const fechaActual = new Date();
    setFechaMinima(new Date(fechaActual.setDate(fechaActual.getDate() + 1)).toISOString().split('T')[0]);
  }, [])
  const handleSubmit = (values) => {
    if (id) {



      updateContrat({ id, estado: 'P', ...values })
        .unwrap()
        .then(() => {
          navigate('/contratos');
          toast.success('Contrato actualizado')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
    else {

      createContrato({ ...values, comercial: com_id })
        .unwrap()
        .then(() => {
          navigate('/contratos');
          toast.success('Contrato creado')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
  };
  useEffect(() => {

    if (id) {
      getContratById(id)

    }

  }, [id])
  return (
    <>
      <header className='flex justify-between pb-10'>
        <Link to='/contratos'>
          <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
        </Link>

        <h3 className='font-bold text-lg  text-center'>{id ? 'Renovar' : 'Crear'} Contrato</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, isValid }) => {
          useEffect(() => {
            if (!isLoading && data) {
              setFieldValue("periodo_validez", '');
              setFieldValue("descripcion", data.descripcion);
              setFieldValue("suministrador", data.suministrador);
            }
          }, [isLoading, data]);
          return (
            <Form>

              <Fields name='periodo_validez' min={fechaMinima} touched={touched} type='date' label='Válido hasta' />

              <FieldArea name='descripcion' label="Descripción" />
              <DDSum name='suministrador' value={data?.suministrador} label='Suministrador' />

              <Btn type='submit' disabled={!isValid} label={`${id ? 'Renovar' : 'Registrar'} Contrato`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}