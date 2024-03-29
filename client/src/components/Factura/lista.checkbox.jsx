import { Field, ErrorMessage } from 'formik';
import { useLazyGetProdsQuery } from '../../services/apiProductos';
import { useEffect } from 'react';

export default function ListaCheck({ name, placeholder, errors, touched, label }) {
    const [getProds, { data, loading, error }] = useLazyGetProdsQuery();
    useEffect(() => {
        getProds();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <div id="dropdownSearch" className="z-10  bg-white rounded-lg shadow  dark:bg-gray-700">

                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">

                    <li>
                        {data && data.map((prod) => (
                            <div key={prod.codigo} className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">

                                <Field id={prod.codigo} type="checkbox" name={name} value={prod.codigo} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor={prod.codigo} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{prod.nombre}</label>
                            </div>
                        ))}
                        {!data && <div>No hay productos</div>}
                    </li>

                </ul>

            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            <div className="mb-5"></div>
        </>
    );
}
