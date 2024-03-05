import { Field } from "formik"
export default function Dropdown({value}) {
  return (
    <>
    <Field as="select" value={2} name="evaluacion">
      <option value="0">Seleccione</option>
      <option value="5">Exelente</option>
      <option value="4">Bien</option>
      <option value="3">Regular</option>
      <option value="2">Mal</option>
    </Field>
    </>
  )
}