import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';

import {
    useUpdateComercialMutation,
    useUpdateAsistenteMutation,
    useGetComercialQuery,
    useCreateComercialMutation,
    useCreateAsistenteMutation,
    useGetAsistenteQuery
} from "../services/apiTable";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { setIsopenAdd } from "../features/booleanos";

export default function FormComerciales({ id }) {
    const { funcion, isOpenAdd } = useSelector(state => state.booleanos); 
    const [isLoading, setIsLoading] = useState(funcion === 'edit');
    const [initialValues, setInitialValues] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        fechaNacimiento: '',
        anioExperiencia: '',
        salario: '',
        email: '',
        password: '',
        repeatPassword: '',
        nivelEscolar: '',
        gradoAcademico: '',
    });
    console.log(id)
    const [createComercial] = useCreateComercialMutation()
    const [updateAsistente] = useUpdateAsistenteMutation()
    // const { data: dataC } = useGetComercialQuery(id)
 
    const dispatch = useDispatch();
    const { data } = useGetAsistenteQuery(id)
    useEffect(() => {
        if (funcion === 'edit') {
          // Simula la carga de datos desde una API
          const loadData = async () => {
            
            
            await setInitialValues(data);
            setIsLoading(false);
          };
    
          loadData();
        }
      }, [id, funcion]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    



    const handleSubmit = async (values, { setSubmitting }) => {

        setSubmitting(true)
        const { repeatPassword, ...rest } = values;
        if (tipo == 'comerciales') {
            delete rest.nivelEscolar,
                delete rest.gradoAcademico
        } else if (tipo == 'asistentes') {
            delete rest.gradoAcademico
        }
        if (funcion === 'add') {


            const { data, error } = await tipo == "comerciales" ? createComercial(rest) : tipo == "asistentes" ? createAsistente(rest) : 'wait for more types'
            if (data) {
                toast.success('Registro exitoso')
                dispatch(setIsopenAdd(false))
            } else {
                toast.error('Error al registrar', error)
            }
        } else {
            console.log(tipo)
            rest['id'] = id
            const { data, error } = await tipo == 'comerciales' ? updateComercial(rest) : tipo == 'asistentes' ? updateAsistente(rest) : 'wait for more types'
            if (data) {
                toast.success('Edición exitosa')
                dispatch(setIsopenAdd(false))
            } else {
                toast.error('Error al editar', error)
            }
        }
    }

    return (
        <>
            {isOpenAdd && <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                <div className='  bg-white p-5 rounded flex flex-col justify-center items-center gap-5 lg:w-96 md:w-80 sm:w-full '>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-2xl lg:text-3xl'>
                            {
                                funcion === 'add' ? `Registrar ${tipo}` : `Editar ${tipo}`
                            }
                        </h2>
                        <button onClick={() => dispatch(setIsopenAdd(false))}>

                            <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </button>
                    </div>
                    <Formik

                        initialValues={initialValues}
                        validationSchema={
                            Yup.object({
                                nombre: Yup.string().required('Se requiere un nombre'),
                                apellido: Yup.string(),
                                direccion: Yup.string().required('Se requiere una dirección'),
                                fechaNacimiento: Yup.date().required('Se requiere una fecha de nacimiento').max(new Date().getFullYear() - 17, 'Debe ser mayor de edad'),
                                anioExperiencia: Yup.number().required('Se requiere una experiencia').min(0, 'No puede ser negativo'),
                                salario: Yup.number().required('Se requiere un salario').min(1000, 'Debe ser mayor o igual a 1,000'),
                                email: Yup.string().required('Se requiere un correo').email('Correo invalido'),
                                password: Yup.string().required('Se requiere una contraseña').min(6, 'Debe tener al menos 6 caracteres'),
                                repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
                                nivelEscolar: tipo == 'asistentes' ? Yup.string().required('Se requiere un nivel escolar') : Yup.string(),
                                gradoAcademico: tipo == 'directores' ? Yup.string().required('Se requiere un grado academico') : Yup.string(),
                            })
                        }
                        onSubmit={handleSubmit}
                    >

                        <Form className='max-w-sm w-full sm:h-full lg:h-96 overflow-auto pr-3'>
                            <div>
                                <label htmlFor="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                <Field type="text" name='nombre' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Selena" />
                            </div>
                            <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label htmlFor="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                                <Field type="text" name='apellido' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Gomez" />
                            </div>
                            <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label htmlFor="direccion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                                <Field type="text" name='direccion' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="Suite 960, Las Tunas" />
                            </div>
                            <ErrorMessage name="direccion" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label htmlFor="fechaNacimiento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Nacimiento</label>
                                <Field max={(() => {
                                    const date = new Date();
                                    date.setFullYear(date.getFullYear() - 18);
                                    return date.toISOString().split('T')[0];
                                })()} type="date" name="fechaNacimiento" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" />
                            </div>
                            <ErrorMessage name="fechaNacimiento" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>

                                <label htmlFor="anioExperiencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Años de Experiencia</label>
                                <Field min='0' type="number" name="anioExperiencia" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"></Field>
                            </div>
                            <ErrorMessage name="anioExperiencia" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            {tipo == 'directores' && (<><div>
                                <label htmlFor="gradoAcademico" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado Académico</label>

                                <Field type="text" name='gradoAcademico' component="select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue={0} value="0">Seleccione:</option>
                                    <option value="bachiller">Bachiller</option>
                                    <option value="licenciado">Licenciado</option>
                                    <option value="master">Máster</option>
                                    <option value="doctorado">Doctorado</option>
                                </Field>
                            </div>
                                <ErrorMessage name="gradoAcademico" component="div" className="text-red-500 text-sm" />
                                <div className="mb-5"></div></>)}
                            {tipo == 'asistentes' && (<><div>
                                <label htmlFor="nivelEscolar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nivel Escolar</label>

                                <Field type="text" name='nivelEscolar' component="select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue={0} value="0">Seleccione:</option>
                                    <option value="primaria">Primaria</option>
                                    <option value="secundaria">Secundaria</option>
                                    <option value="bachillerato">Bachillerato</option>
                                    <option value="universidad">Universidad</option>
                                </Field>
                            </div>
                                <ErrorMessage name="nivelEscolar" component="div" className="text-red-500 text-sm" />
                                <div className="mb-5"></div></>)}
                            <div>
                                <label htmlFor="salario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salario</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 ps-2 top-5 flex items-center pointer-events-none">

                                        <svg height="24" fill="gray" viewBox="0 -960 960 960" width="24"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" /></svg>
                                    </div>
                                </div>
                                <Field min='0' step="0.01" type="number" name='salario' className="pl-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" />
                            </div>
                            <ErrorMessage name="salario" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <Field type="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" placeholder="name@rowmateria.com" />
                            </div>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <Field type="password" name='password' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" />
                            </div>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>
                            <div>
                                <label for="repeatPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir Contraseña</label>
                                <Field type="password" name="repeatPassword" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" />
                            </div>
                            <ErrorMessage name="repeatPassword" component="div" className="text-red-500 text-sm" />
                            <div className="mb-5"></div>

                            <button type="submit" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">{
                                funcion === 'add' ? `Registrar ${tipo}` : `Editar ${tipo}`
                            }</button>


                        </Form>

                    </Formik >

                </div>
            </div>
            }
        </>
    )
}