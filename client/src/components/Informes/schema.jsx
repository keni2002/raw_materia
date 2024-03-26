import * as Yup from 'yup';
export const schema =
    Yup.object({
        estado: Yup.string().notOneOf(['0'], 'Seleccione una opción').required('Se requiere una Estado'),
        descripcion: Yup.string().required('Se requiere una descripción'),

    })
