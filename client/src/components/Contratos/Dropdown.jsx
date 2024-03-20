import { Field, ErrorMessage } from "formik"
export default function Dropdown({ value, name, label }) {
  return (
    <>
      <div>
        <label htmlFor={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <Field as="select" value={value} name={name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" >
          <option value="0">Seleccione</option>
          <option value="5">Exelente</option>
          <option value="4">Bien</option>
          <option value="3">Regular</option>
          <option value="2">Mal</option>
        </Field>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
      <div className="mb-5"></div>
    </>
  )
}
