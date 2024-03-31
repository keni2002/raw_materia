import * as Yup from 'yup';
export const schema =
    Yup.object({
        nombre: Yup.string().required('Se requiere un nombre'),
        apellido: Yup.string(),
        direccion: Yup.string().required('Se requiere una dirección'),
        fechaNacimiento: Yup.date().required('Se requiere una fecha de nacimiento').max(new Date().getFullYear() - 17, 'Debe ser mayor de edad'),
        anioExperiencia: Yup.number().required('Se requiere una experiencia').min(0, 'No puede ser negativo'),
        salario: Yup.number().required('Se requiere un salario').min(1000, 'Debe ser mayor o igual a 1,000'),
        nivelEscolar: Yup.string().required('Se requiere el nivel escolar'),
        email: Yup.string().required('Se requiere un correo').email('Correo invalido'),
        password: Yup.string().required('Se requiere una contraseña').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'La contraseña debe tener al menos 8 caracteres y contener caracteres especiales, letras mayúsculas, letras minúsculas y números'),

        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),

    })
