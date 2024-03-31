import * as Yup from 'yup';
export const schema =
    Yup.object({
        producto: Yup.array().min(1, 'Seleccione al menos un producto').required('Se requiere al menos un producto'),
        fecha_compra: Yup.date().required('Se requiere una fecha')
            .max(new Date(new Date().setDate(new Date().getDate())).toISOString().split('T')[0], 'No puede registrar productos comprados en el futuro'),
        contrato: Yup.string().notOneOf(['0'], 'Se requiere un contrato').required('Se requiere un contrato'),
        importe: Yup.number().required('Se requiere un importe').positive('El importe debe ser mayor a 0'),
    })
