import * as Yup from 'yup';
export const schema =
    Yup.object({
        periodo_validez: Yup.date().required('Se requiere una fecha')
            .min(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], 'Debe ser un periodo minimo de un dia'),

        descripcion: Yup.string().required('Se requiere una descripcion'),
        suministrador: Yup.string().required('Se requiere un suministrador'),
    })
