import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../services/auth/usecases/login';
import { useHandleAsyncLogic } from '../hooks/useHandleAsyncLogic';
import { useEffect } from 'react';
import { auth_state } from '../features/authSlice';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Se require correo electrónico';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo electronico inválido';
    }
    if (!values.password) {
        errors.password = 'Se require contraseña';
    }
    return errors;

}
function FormLogin() {
    const dispatch = useDispatch();
    const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(auth_state)

    useHandleAsyncLogic({ isLoading, isSuccess, isError, error, successMesaage: 'Bienvenido', customURL: '/home' })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => login(values),
    });

    useEffect(() => {
        if (isAuthenticated)
            navigate('/home')
    }, [isAuthenticated])

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-md bg-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* logo */}
                <div>
                    <div className="flex   items-center justify-center gap-3 bg-gray-200 rounded-lg py-2">
                        <svg fill='rgb(17,34,39' height="80" viewBox="0 -960 960 960" width="80"><path d="m426.999-175.348-182.477-105.39q-24.652-14.392-38.827-38.827-14.174-24.435-14.174-52.783V-583.13q0-28.348 14.174-52.783 14.175-24.435 38.827-38.827l182.477-105.39q24.653-14.392 53.001-14.392t53.001 14.392l182.477 105.39q24.652 14.392 38.827 38.827 14.174 24.435 14.174 52.783v210.782q0 28.348-14.174 52.783-14.175 24.435-38.827 38.827l-182.477 105.39Q508.348-160.956 480-160.956t-53.001-14.392ZM60.782-681.696v-111.521q0-44.305 30.848-75.153 30.848-30.848 75.153-30.848h111.521v97.522h-120v120H60.782ZM278.304-60.782H166.783q-44.305 0-75.153-30.848-30.848-30.848-30.848-75.153v-111.521h97.522v120h120v97.522Zm403.392 0v-97.522h120v-120h97.522v111.521q0 44.305-30.848 75.153-30.848 30.848-75.153 30.848H681.696Zm120-620.914v-120h-120v-97.522h111.521q44.305 0 75.153 30.848 30.848 30.848 30.848 75.153v111.521h-97.522ZM338.392-607.13l-40.869 23.435v46.13L440-454.174v163.651l40 23.566 40-23.566v-163.651l142.477-83.391v-46.13l-40.869-23.435L480-523.739 338.392-607.13Z" />

                        </svg>
                        <p className="text-2xl font-bold  text-gray-900">Raw Materia</p>
                    </div>
                    <h2 className=" pt-10 text-center text-2xl font-bold  text-gray-900">Iniciar Sesión</h2>
                </div>
                <div>
                    <form action="" onSubmit={formik.handleSubmit} className="space-y-6" method="POST" autoComplete='off'>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Correo</label>
                            <div className="mt-2">
                                <input autoComplete="email"
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-950 sm:text-sm sm:leading-6"
                                    id="email" name="email" required
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}

                                    onBlur={formik.handleBlur}
                                />
                            </div>

                        </div>
                        <div className='mt-0 text-red-700'>
                            {formik.errors.email ? `${formik.errors.email}` : null}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Contraseña</label>
                            </div>
                            <div className="mt-2">
                                <input autoComplete="off"
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-950-600 sm:text-sm sm:leading-6"
                                    id="password" name="password" required
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </div>
                        </div>
                        <div className='mt-0 text-red-700'>
                            {formik.errors.password ? `${formik.errors.password}` : null}
                        </div>

                        <div>
                            <button disabled={isLoading} className="flex w-full cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit">
                                Iniciar Sesión
                            </button>

                        </div>

                    </form>


                </div>

            </div>
        </div>
    )
}
export default FormLogin;