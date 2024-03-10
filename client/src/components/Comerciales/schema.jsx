import * as Yup from 'yup';
export const schema = 
    Yup.object({
        nombre: Yup.string().required('Se requiere un nombre'),
        apellido: Yup.string(),
        direccion: Yup.string().required('Se requiere una dirección'),
        fechaNacimiento: Yup.date().required('Se requiere una fecha de nacimiento').max(new Date().getFullYear() - 17, 'Debe ser mayor de edad'),
        anioExperiencia: Yup.number().required('Se requiere una experiencia').min(0, 'No puede ser negativo'),
        salario: Yup.number().required('Se requiere un salario').min(1000, 'Debe ser mayor o igual a 1,000'),
        email: Yup.string().required('Se requiere un correo').email('Correo invalido'),
        password: Yup.string().required('Se requiere una contraseña').min(6, 'Debe tener al menos 6 caracteres'),
        departamento: Yup.string().required('Es necesario seleccionar un departamento'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
        
    })
