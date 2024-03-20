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
export default function ComercialForm() {
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
        <Link to='/comerciales'>
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
              <Fields name='nombre' touched={touched} type='text' placeholder='James' label='Nombre' />
              <Fields name='apellido' touched={touched} type='text' placeholder='Born' label='Apellido' />
              <Fields name='email' touched={touched} type='email' placeholder='james@rmateria.cu' label='Email' />
              <Fields name='direccion' touched={touched} type='text' placeholder='calle 12,Las Tunas' label='Direc cion' />
              <Fields name='fechaNacimiento' max={fecha()} touched={touched} type='date' label='Fecha de nacimiento' />
              <Fields name='salario' touched={touched} type='number' label='Salario' min={1000} />
              <Fields name='anioExperiencia' touched={touched} type='number' label='Años de experiencia' min={0} />

              <Fields name='password' touched={touched} type='password' label='Contraseña' />
              <Fields name='confirmPassword' touched={touched} type='password' label='Confirmar Contraseña' />

              <Btn type='submit' disabled={!isValid} label={`${id ? 'Actualizar' : 'Registrar'} Comercial`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}