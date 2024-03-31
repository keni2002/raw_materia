import { Field, ErrorMessage } from "formik"
import { useGetContratsQuery } from '../../services/apiContratos'
import { Link } from "react-router-dom"
import Masicon from "../Icons/Masicon"
import fecha from "../utils/fechaHumana"

export default function DDContr({ name, value, label, handleChange, handleBlur }) {
    const id = JSON.parse(sessionStorage.getItem('user'))['id']
    const { data: contratos } = useGetContratsQuery()
    const data = contratos?.filter((c) => c.comercial == id && c.estado == 'A')
    return (
        <>
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <div className="flex items-center">

                    {console.log(data)}
                    <Field as="select" handleChange={handleChange} handleBlur={handleBlur} name={name} value={value} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" >
                        <option key={'hfuidsfh'} value="0">Seleccione</option>

                        {data && data.map((contrato) => (
                            <option
                                title={`Contrato que se hizo con el suministrador ${contrato.suministradorName} de tipo ${contrato.materia} con fecha de validez hasta el ${fecha(contrato.periodo_validez)}`}
                                key={contrato.codigo} value={contrato.codigo}>
                                {contrato.suministradorName}-{contrato.materia}-{fecha(contrato.periodo_validez)}



                            </option>))}
                    </Field>


                </div>
            </div>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            <div className="mb-5"></div>
        </>
    )
}