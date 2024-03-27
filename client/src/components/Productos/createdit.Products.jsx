import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useLazyGetProdQuery, useCreateProdMutation, useUpdateProdMutation } from '../../services/apiProductos';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import FieldArea from '../FieldArea';
import DDMateria from '../Suministradores/DDMateria';
import DDSum from '../Contratos/dropdownSumin';
import ToDay from '../utils/toDay';
export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getProductById, { data, isLoading }] = useLazyGetProdQuery()
  const [updateComercial] = useUpdateProdMutation()
  const [createProduct] = useCreateProdMutation()
  const { user: { dep } } = useSelector(auth_state);
  const fecha = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  }

  const handleSubmit = (values) => {
    let { confirmPassword, ...rest } = values
    if (id) {



      updateComercial({ id, ...rest })
        .unwrap()
        .then(() => {
          navigate('/comerciales');
          toast.success('Comercial actualizado')
        })
        .catch((err) => {
          toast.error(err.data.message)
        })
    }
    else {

      createProduct(values)
        .unwrap()
        .then(() => {
          navigate(-1);
          toast.success('Producto registrado')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
  };
  useEffect(() => {

    if (id) {
      getComercialById(id)

    }

  }, [id])
  return (
    <>
      <header className='flex justify-between pb-10'>
        <Link to={-1}>
          <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
        </Link>

        <h3 className='font-bold text-lg  text-center'>{id ? 'Actualizar' : 'Crear'} Comercial</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, isValid, handleChange, handleBlur, values }) => {
          useEffect(() => {
            if (!isLoading && data) {
              setFieldValue("nombre", data.nombre);
              setFieldValue("descripcion", data.descripcion);
              setFieldValue("tipo", data.tipo);
              setFieldValue("fecha_produccion", data.fecha_produccion);
              setFieldValue("fecha_vencimiento", data.fecha_vencimiento);
              setFieldValue("suministrador", data.suministrador);
            }
          }, [isLoading, data]);
          return (
            <Form>
              <Fields name='nombre' touched={touched} type='text' placeholder='Miel' label='Nombre' />
              <FieldArea name={'descripcion'} label='Descripción' touched={touched} />
              <DDMateria name={'tipo'} label='Tipo' value={values.tipo} />
              <Fields name='fecha_produccion' max={ToDay()} type='date' label='Fecha de producción' />
              <Fields name='fecha_vencimiento' min={ToDay()} type='date' label='Fecha de vencimiento' />
              <DDSum name='suministrador' label='Suministrador' value={values.suministrador} />
              <Btn type='submit' disabled={!isValid} label={`${id ? 'Actualizar' : 'Registrar'} Comercial`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}