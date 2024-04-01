import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useCreateFactMutation, useLazyGetFactQuery, useUpdateFactMutation } from '../../services/apiFactura'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import ListaCheck from './lista.checkbox';
import DDContr from './dropdownContr';
export default function FacturaForm() {
  const [fechaMinima, setFechaMinima] = useState()
  const navigate = useNavigate();
  const { id } = useParams();
  const [getFacturaById, { data, isLoading }] = useLazyGetFactQuery()
  const [updateFactura] = useUpdateFactMutation()
  const [createFactura] = useCreateFactMutation()

  const { user: { grupo } } = useSelector(auth_state);
  const com_id = JSON.parse(sessionStorage.getItem('user')).id

  useEffect(() => {
    const fechaActual = new Date();
    setFechaMinima(new Date(fechaActual.setDate(fechaActual.getDate())).toISOString().split('T')[0]);
  }, [])
  const handleSubmit = (values) => {

    if (id) {



      updateFactura({ id, ...values })
        .unwrap()
        .then(() => {
          navigate('/facturas');
          toast.success('Factura actualizado')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
    else {

      createFactura({ ...values, comercial: com_id })
        .unwrap()
        .then(() => {
          console.log(com_id)
          navigate('/facturas');
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
      getFacturaById(id).unwrap().then(() => {

      }).catch((err) => {
        toast.error(err.data)
      })

    }

  }, [id])
  return (
    <>
      <header className='flex justify-between pb-10'>
        <Link to={-1}>
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
              setFieldValue("producto", data.producto);
              setFieldValue("contrato", data.contrato);
              setFieldValue("importe", data.importe);
              setFieldValue("fecha_compra", data.fecha_compra);
            }
          }, [isLoading, data]);

          return (
            <Form>
              <ListaCheck name='producto' value={values?.producto} type={'checkbox'} label='Productos' />

              <DDContr name='contrato' value={values?.contrato} handleChange={handleChange} handleBlur={handleBlur} touched={touched} label='Contrato' />

              <Fields name='importe' touched={touched} type='number' label='Importe' min={0} placeholder={'CUP total'} />
              <Fields name='fecha_compra' max={fechaMinima} touched={touched} type='date' label='Fecha de Factura' />
              <Btn type='submit' disabled={!isValid} label={`${id ? 'Actualizar' : 'Registrar'} Factura`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}