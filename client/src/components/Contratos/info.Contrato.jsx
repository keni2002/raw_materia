
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLazyGetContratQuery } from '../../services/apiContratos';
import calcularTiempoRestante from '../utils/fechaRestante';

export default function InfoContrato() {
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

    const [getContratById, { data, isLoading }] = useLazyGetContratQuery()

    useEffect(() => {
        getContratById(id)
    }, [id])
    const restTime = calcularTiempoRestante(data?.periodo_validez)
    return (
        <>
            <header className='flex justify-between pb-10'>
                <Link to='/contratos'>
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </Link>

                <h3 className=' text-lg  text-center'>Información de Contrato</h3>
            </header>

            <div className='p-4 mb-3 bg-gray-100 rounded-md'>
                <p>Suministrador: {data?.suministradorName} </p>
                <p>Valido hasta: {fecha(data?.periodo_validez)} </p>
                <p>
                    {(restTime.anios == 0 && restTime.meses == 0 && restTime.dias == 0) ? 'HOY VENCE' : <>
                        {(restTime.anios < 0 || restTime.meses < 0 || restTime.dias < 0) ? <>Ya pasaron:</> : <>Finaliza en </>}
                        {restTime.anios != 0 && <> {Math.abs(restTime.anios)} años</>}
                        {restTime.meses != 0 && <> {Math.abs(restTime.meses)} meses</>}
                        {restTime.dias != 0 && <> {Math.abs(restTime.dias)} días</>}
                    </>
                    }
                </p>
                <p>Estado: {data?.estado} </p>
                <p>Materia objetivo: {data?.materia} </p>
                <div className='pb-4 mt-7 bg-slate-200 rounded-md'>
                    <p>Descripcion: {data?.descripcion}</p>
                </div>

            </div>






        </>
    )
}