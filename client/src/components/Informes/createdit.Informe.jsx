import { Formik, Field, Form, ErrorMessage } from 'formik';

import Fields from '../Fields';
import Btn from '../Btn';
import { schema } from './schema';
import { initial } from './initial';
import { useCreateInformeMutation, useLazyGetInformeQuery, useDeleteInformeMutation, useUpdateInformeMutation } from '../../services/apiInforme'
import { useUpdateContratMutation, useLazyGetContratQuery } from '../../services/apiContratos'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth_state } from '../../features/authSlice';
import FieldArea from '../FieldArea';
import Evalicon from '../Icons/Evalicon'
import Backicon from '../Icons/Backicon'
import Dropdown from './Dropdown';

export default function InformeForm({ isInLista }) {

  const navigate = useNavigate();
  const { id } = useParams();
  const [getInformeById, { data, isLoading }] = useLazyGetInformeQuery()
  const [getContraById, { data: contractData, isLoadingCon }] = useLazyGetContratQuery()

  const [updateInforme] = useUpdateInformeMutation()
  const [deleteInforme] = useDeleteInformeMutation()
  const [createInforme] = useCreateInformeMutation()
  const [updateContrato] = useUpdateContratMutation()
  const { user: { grupo } } = useSelector(auth_state);
  const abo_id = JSON.parse(sessionStorage.getItem('user'))['id']

  const handleSubmit = (values) => {
    if (id && isInLista) {
      updateInforme({ id, descripcion: values.descripcion })
        .unwrap()
        .then(() => {
          updateContrato({ id, estado: values.estado }).unwrap().then(() => {
            navigate(-1);
            toast.success('Informe creado')
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
    else {

      createInforme({ descripcion: values.descripcion, contrato: id, abogado: abo_id })
        .unwrap()
        .then(() => {
          updateContrato({ id, estado: values.estado }).unwrap().then(() => {
            navigate(-1);
            toast.success('Informe creado')
          })

        })
        .catch((err) => {
          console.log(err)
          toast.error(err.data.message)
        })
    }
  };
  useEffect(() => {

    if (id && isInLista) {
      getInformeById(id).unwrap().then((response) => {
        getContraById(response.contrato)
      })

    }
    if (id) {
      getContraById(id).unwrap().then((response) => {
        if (response.informe_codigo != '') {
          deleteInforme(response.informe_codigo).unwrap().then(() => {
            toast.success('Informe anterior borrado')
          })
        }
      })
    }

  }, [id, isInLista])
  return (
    <>
      <header className='flex justify-between pb-10'>
        <Link to={-1}>
          <Backicon />
        </Link>
        <Evalicon />
        <h3 className='font-bold text-lg  text-center'>{id && isInLista ? 'Actualizar' : 'Generar'} Informe</h3>
      </header>

      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isValid, values }) => {
          useEffect(() => {

            if (!isLoading && data && !isLoadingCon && contractData) {
              setFieldValue("descripcion", data?.descripcion);
              setFieldValue("estado", contractData?.estado);
            }
          }, [isLoading, data, isLoadingCon, contractData]);

          return (
            <Form>
              <Dropdown name={'estado'} label={'Aprobación'} value={values?.estado} />
              <FieldArea name='descripcion' label="Desarrollar Informe" />
              <Btn type='submit' disabled={!isValid} label={`${id && isInLista ? 'Actualizar' : 'Generar'} Informe`} />
            </Form>
          )
        }}
      </Formik>

    </>
  )
}