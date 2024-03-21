
import { Field, ErrorMessage } from 'formik';

// eslint-disable-next-line react/prop-types
export default function FieldArea({ name, label }) {
    return (
        <>
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <Field name={'descripcion '} as="textarea">
                    {({ field }) => {
                        return (
                            <textarea className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" rows="4" {...field} />
                        );
                    }}
                </Field>
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            <div className="mb-5"></div>

        </>
    )
}