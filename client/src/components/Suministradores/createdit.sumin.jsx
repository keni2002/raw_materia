import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useCreateSumMutation, useLazyGetSumQuery, useUpdateSumMutation } from '../../services/apiSumin';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import DDMateria from './DDMateria';
import { useCreateAddressMutation, useLazyGetAddressQuery, useUpdateAddressMutation } from '../../services/apiAddress';
export default function SuminisForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getSumById, { data: datasum, isLoading }] = useLazyGetSumQuery()
  const [getAddressById, { data: datadress, isLoadDress }] = useLazyGetAddressQuery()
  const [createAddress] = useCreateAddressMutation()
  const [updateAddress] = useUpdateAddressMutation()
  const [updateSum] = useUpdateSumMutation()
  const [createSum] = useCreateSumMutation()
  const { user: { dep } } = useSelector(auth_state);

  const handleSubmit = (values) => {
    const { nombre, clasificacion, ...direccion } = values

    if (id) {



      updateSum({ id, nombre, clasificacion })
        .unwrap()
        .then((response) => {
          updateAddress()
          navigate(-1);
          toast.success('Suministrador actualizado')
        })
        .catch((err) => {
          toast.error(err.datadress.message)
        })
    }
    else {

      createAddress(direccion).unwrap().then((response) => {
        console.log(response)
        createSum({ nombre, clasificacion, direccion: response?.id }).unwrap().then(() => {
          navigate(-1)
          toast.success('Suministrador registrado')
        })
      })


    }
  };
  useEffect(() => {

    if (id) {
      console.log(id)
      getSumById(id).unwrap().then((response) => {
        getAddressById(response?.direccion)
      }
      )

    }

  }, [id])
  return (
    <>
      <header className='flex justify-between pb-10'>
        <Link to={'..'}>
          <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
        </Link>

        <h3 className='font-bold text-lg  text-center'>{id ? 'Actualizar' : 'Registrar'} Suministrador</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, isValid }) => {
          useEffect(() => {
            if (!isLoading && !isLoadDress && datasum && datadress) {
              setFieldValue("nombre", datasum.nombre);
              setFieldValue("clasificacion", datasum.apellido);
              setFieldValue("calle", datadress.calle);
              setFieldValue("numero", datadress.numero);
              setFieldValue("municipio", datadress.municipio);
              setFieldValue("provincia", datadress.provincia);


            }
          }, [isLoading, isLoadDress, datadress, datasum]);
          return (
            <Form>
              <Fields name='nombre' touched={touched} type='text' placeholder='Microsoft' label='Nombre' />
              <DDMateria name='clasificacion' label={'Clasificación'} />

              <label>Dirección</label>
              <div className='p-3 mb-3 rounded-lg bg-gray-200'>

                <Fields name='calle' touched={touched} type='text' placeholder='Martí' label='Calle' />
                <Fields name='numero' touched={touched} type='number' min={1} placeholder='13' label='Número' />
                <Fields name='municipio' touched={touched} type='text' placeholder='Majibacoa' label='Municipio' />
                <Fields name='provincia' touched={touched} type='text' placeholder='Las Tunas' label='Provincia' />
              </div>
              <Btn type='submit' disabled={!isValid} label={`${id ? 'Actualizar' : 'Registrar'} Suministrador`} />

            </Form>
          )
        }}
      </Formik>

    </>
  )
}