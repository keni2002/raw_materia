import * as Yup from 'yup';
export const schema =
    Yup.object({
        productos: Yup.array().required('Se requiere al menos un producto'),
    })
