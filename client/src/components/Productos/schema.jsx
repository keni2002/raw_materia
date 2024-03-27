//Productos schema
import * as Yup from 'yup';
export const schema =
    Yup.object({
        nombre: Yup.string().required('Se requiere un nombre'),
        descripcion: Yup.string().required('Se requiere una descripcion'),
        tipo: Yup.string().notOneOf(['0'], 'Se requiere un tipo').required('Se requiere un tipo'),
        fecha_produccion: Yup.date().required('Se requiere una fecha de produccion')
            .max(new Date(), 'La fecha de producción no puede ser mayor a la fecha actual'),

        fecha_vencimiento: Yup.date().required('Se requiere una fecha de vencimiento')
            .min(Yup.ref('fecha_produccion'), 'La fecha de vencimiento no puede ser menor a la fecha de producción'),
        suministrador: Yup.string().notOneOf(['0'], 'Se requiere un suministrador').required('Se requiere un suministrador')
    })
