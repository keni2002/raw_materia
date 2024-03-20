
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLazyGetComQuery } from '../../services/apiComercial';
export default function InfoCom() {
    function fecha(fecha) {
        return new Date(fecha)
            .toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
    }
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);

        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    }

    const { id } = useParams();

    const [getComercialById, { data, isLoading }] = useLazyGetComQuery()

    useEffect(() => {
        getComercialById(id)
    }, [id])
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/comerciales'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className=' text-lg  text-center'>Información</h3>
            </header>
            <label htmlFor="">Info Personal</label>
            <div className='p-4 mb-3 bg-gray-200 rounded-md'>
                <p>Nombre: {data?.nombre} </p>
                <p>Apellidos: {data?.apellido} </p>
                <p>Email:<a href={`mailto:${data?.email}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{data?.email}</a> </p>
                <p>Dirección: {data?.direccion}</p>
                <p>Nacimiento: {fecha(data?.fechaNacimiento)}</p>
                <p>Edad: {calcularEdad(data?.fechaNacimiento)} años</p>
            </div>
            <label htmlFor="">Info Laboral</label>
            <div className='p-4 mb-3 bg-gray-200 rounded-md'>
                <p>Años de Experiencia: {data?.anioExperiencia} </p>
                <div className='flex gap-2 mb-2'>

                    <p>Evaluación: ({data?.evaluacion}) {data?.evaluacion == 5 ? 'Excelente' : data?.evaluacion == 4 ? 'Bien' : data?.evaluacion == 3 ? 'Regular' : data?.evaluacion == 2 ? 'Mal' : 'No evaluado'}</p>
                     <Link to={`/comerciales/infoevals/${id}`}>
                        <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold    rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400 inline-flex items-center justify-center">evaluaciones</div>
                        </Link> 

                </div>

                {/* INICIO */}
                <div className='flex gap-2'>
                    <p>Cantidad de Contratos: {data?.cntContratos}</p>
                    <a href="#" class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold    rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400 inline-flex items-center justify-center">contratos</a>
                </div>
            </div>




        </>
    )
}