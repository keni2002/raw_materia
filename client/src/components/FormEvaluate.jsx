import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
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


export default function FormEvaluate() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            navigate('/dashboard');
            toast.success('Usted inicio sesion correctamente')
        },
    });
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-md bg-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* logo */}
                <div>
                    <div className="flex mb-5  items-center justify-center gap-3 bg-gray-200 px-2 rounded-lg py-2">
                    <svg  height="80" viewBox="0 -960 960 960" width="80"><path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" /></svg>
                        <p className="text-2xl font-bold  text-gray-900">Evaluar trabajador</p>
                    </div>
                   
                </div>
                <div>
                    <form action="" onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Correo</label>
                            <div class="relative group">
        <button id="dropdown-button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <span class="mr-2">Open Dropdown</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <div id="dropdown-menu" class="hidden absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
          
          <input id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off"/>
        
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Uppercase</a>
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Lowercase</a>
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Camel Case</a>
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Kebab Case</a>
        </div>
      </div>

                        </div>
                        <div className='mt-0 text-red-700'>
                        {formik.errors.email ? `${ formik.errors.email }` : null}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Contraseña</label>
                            </div>
                            <div className="mt-2">
                                <input autoComplete="current-password"
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-950-600 sm:text-sm sm:leading-6"
                                    id="password" name="password" required
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </div>
                        </div>
                        <div className='mt-0 text-red-700'>
                        {formik.errors.password ? `${ formik.errors.password }` : null}
                        </div>
                        
                        <div>
                            <button className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                                type="submit">
                                Evaluar
                            </button>
                        </div>
                    </form>


                </div>

            </div>
            
        </div>
    )
}