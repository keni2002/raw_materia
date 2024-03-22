import * as Yup from 'yup';
export const schema =
    Yup.object({
        nombre: Yup.string().required('Se requiere un nombre'),
        clasificacion: Yup.string().required('Se requiere una clasificación'),
        calle: Yup.string().required('Se requiere la calle'),
        numero: Yup.number().required('Se requiere el numero').min(1, 'No puede ser negativo ni 0'),
        municipio: Yup.string().required('Se requiere un municipio'),
        provincia: Yup.string().required('Se requiere una provincia'),
    })

// nombre: '',
// clasificacion: '',
// calle: '',
// numero: '',
// municipio: '',
// provincia: ''