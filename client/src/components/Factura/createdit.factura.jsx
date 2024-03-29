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
import ListaCheck from './lista.checkbox';
export default function FacturaForm() {
  const [fechaMinima, setFechaMinima] = useState()
  const navigate = useNavigate();
  const { id } = useParams();
  const [getContratById, { data, isLoading }] = useLazyGetContratQuery()
  const [updateContrat] = useUpdateContratMutation()
  const [createContrato] = useCreateCotratMutation()

  const { user: { grupo } } = useSelector(auth_state);
  const com_id = JSON.parse(sessionStorage.getItem('user')).id
  // const fecha = () => {
  //   const date = new Date();
  //   date.setFullYear(date.getFullYear() - 18);
  //   return date.toISOString().split('T')[0];
  // }
  useEffect(() => {
    const fechaActual = new Date();
    setFechaMinima(new Date(fechaActual.setDate(fechaActual.getDate())).toISOString().split('T')[0]);
  }, [])
  const handleSubmit = (values) => {

    return console.log(values)
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
          console.log(com_id)
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

        <h3 className='font-bold text-lg  text-center'>{id ? 'Actualizar' : 'Crear'} Factura</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, isValid, handleChange, handleBlur, values }) => {
          useEffect(() => {

            if (!isLoading && data) {
              setFieldValue("periodo_validez", '');
              setFieldValue("descripcion", data?.descripcion);
              setFieldValue("suministrador", data?.suministrador);
            }
          }, [isLoading, data]);

          return (
            <Form>
              <ListaCheck name='productos' type={'checkbox'} label='Productos' />
              <DDSum name='contrato' value={values?.contrato} handleChange={handleChange} handleBlur={handleBlur} touched={touched} label='Contrato' />
              <Fields name='importe' touched={touched} type='number' label='Importe' min={0} placeholder={'CUP total'} />
              <Fields name='fecha_compra' max={fechaMinima} touched={touched} type='date' label='Fecha de Factura' />
              <Btn type='submit' disabled={!isValid} label={`${id ? 'Renovar' : 'Registrar'} Contrato`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}