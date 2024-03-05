import { Formik, Field, Form, ErrorMessage } from 'formik';
import Fields from '../Fields';
import Btn from '../Btn';
import {schema} from './schema';
import {initial} from './initial';
import { useUpdateComercialMutation,useLazyGetComercialQuery,useCreateComercialMutation } from '../../services/apiTable';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function ComercialForm() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [getComercialById, {data, isLoading}]= useLazyGetComercialQuery() 
  const [updateComercial] = useUpdateComercialMutation()
  const [createComercial] = useCreateComercialMutation()
  const handleSubmit = async (values) => {

    if(id) {
      updateComercial({id, ...values})
      .unwrap()
      .then(() =>{
         navigate('/comerciales');
         toast.success('Comercial actualizado')
      })
    } 
    else {
      createComercial(values)
      .unwrap()
      .then(() =>{
         navigate('/comerciales');
         toast.success('Comercial creado')
      })
      .catch((err) => {
        toast.error(err.data.message)
      })
    }
  };
  useEffect(() => {
    if(id) getComercialById(id)
  }, [id])
  return (
    <>
      <h3 className='font-bold text-lg pb-3 text-center'>{id ? 'Actualizar':'Crear'} Comercial</h3>
      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue,  touched, isValid, handleChange, handleBlur }) => {
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
          <Fields name='direccion' touched={touched} type='text' placeholder='calle 12,Las Tunas' label='Direccion' />
          <Fields name='fechaNacimiento' touched={touched} type='date' label='Fecha de nacimiento' />
          <Fields name='salario' touched={touched} type='number' label='Salario' min={1000} />
          <Fields name='anioExperiencia' touched={touched} type='number' label='Años de experiencia' min={0} />
          <Fields name='password' touched={touched} type='password' label='Contraseña' />
          <Fields name='confirmPassword' touched={touched} type='password' label='Confirmar Contraseña' />
          <Btn type='submit' disabled={!isValid}  label={`${id ? 'Actualizar': 'Registrar'} Comercial`} />
        </Form>
        )
        }}
      </Formik>
      
    </>
  )
}