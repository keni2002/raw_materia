import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useLazyGetComQuery, useCreateComMutation, useUpdateComMutation } from '../../services/apiComercial';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import FieldArea from '../FieldArea';
import DDSum from './dropdownSumin';
export default function ContratoForm() {
  const fechaActual = new Date();
  const fechaMinima = new Date(fechaActual.setDate(fechaActual.getDate())).toISOString().split('T')[0];
  const navigate = useNavigate();
  const { id } = useParams();
  const [getComercialById, { data, isLoading }] = useLazyGetComQuery()
  const [updateComercial] = useUpdateComMutation()
  const [createComercial] = useCreateComMutation()
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

      createComercial({ ...rest, departamento: dep[1] })
        .unwrap()
        .then(() => {
          navigate('/comerciales');
          toast.success('Comercial creado')
        })
        .catch((err) => {
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
        <Link to='/asistentes'>
          <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
        </Link>

        <h3 className='font-bold text-lg  text-center'>{id ? 'Actualizar' : 'Crear'} Comercial</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, isValid, handleChange, handleBlur }) => {
          useEffect(() => {
            if (!isLoading && data) {
              setFieldValue("nombre", data.nombre);
              setFieldValue("apellido", data.apellido);
              setFieldValue("direccion", data.direccion);
              setFieldValue("fechaNacimiento", data.fechaNacimiento);
              setFieldValue("anioExperiencia", data.anioExperiencia);
              setFieldValue("salario", data.salario);
              setFieldValue("email", data.email);

            }
          }, [isLoading, data]);
          return (
            <Form>

              <Fields name='periodo_validez' min={fechaMinima} touched={touched} type='date' label='Válido hasta' />
              <FieldArea name='descripcion' label="Descripción" />
              <DDSum name='suminstrador' label='Suministrador' />

              <Btn type='submit' disabled={!isValid} label={`${id ? 'Actualizar' : 'Registrar'} Contrato`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}