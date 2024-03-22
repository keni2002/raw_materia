import { Field, ErrorMessage } from "formik"
import { useGetSumsQuery } from '../../services/apiSumin'
import { Link } from "react-router-dom"
export default function DDSum({ name, value, label, handleChange, handleBlur }) {
    const { data } = useGetSumsQuery()
    return (
        <>
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <div className="flex items-center">


                    <Field as="select" handleChange={handleChange} handleBlur={handleBlur} name={name} value={value} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" >
                        <option key={'hfuidsfh'} value="0">Seleccione</option>
                        {data && data.map((sum) => (
                            <option key={sum.codigo} value={sum.codigo}>
                                {sum.nombre}, Tipo {sum.clasificacion == 'VEG' ? 'Vegetal' :
                                    sum.clasificacion == 'ANIM' ? 'Animal' :
                                        sum.clasificacion == 'MIN' ? 'Mineral' :
                                            sum.clasificacion == 'FOS' ? 'Fosil' :
                                                ''
                                }
                            </option>))}
                    </Field>
                    <Link to={'/suministradores/add'}>
                        <svg height="32" viewBox="0 -960 960 960" width="32"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                    </Link>

                </div >
            </div >
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            <div className="mb-5"></div>
        </>
    )
}