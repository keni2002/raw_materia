
import { Formik, Form } from 'formik';
import Btn from '../Btn';
import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLazyGetContratQuery } from '../../services/apiContratos';
import { useLazyGetInformeQuery } from '../../services/apiInforme';
import calcularTiempoRestante from '../utils/fechaRestante';
import fecha from '../utils/fechaHumana'
import fechaHumana from '../utils/fechaHumana';
export default function InfoContrato() {
    function toTexto(char) {
        switch (char) {
            case 'A':
                return 'Aprobado'; break;
            case 'N':
                return 'No aprobado'; break;
            case 'P':
                return 'Pendiente'; break;
            default:
                break;
        }
    }
    const { id } = useParams();

    const [getContratById, { data, isLoading }] = useLazyGetContratQuery()
    const [getInformeById, { data: info_data, isLoading_info }] = useLazyGetInformeQuery()

    useEffect(() => {
        getContratById(id).unwrap().then((response) => {
            console.log(response)
        })
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
                <p><span className='font-bold'>Suministrador</span>: {data?.suministradorName} </p>
                <p><span className='font-bold'>Válido hasta: </span> {fecha(data?.periodo_validez)} </p>
                <p>

                    {(restTime.anios == 0 && restTime.meses == 0 && restTime.dias == 0) ? 'HOY VENCE' : <>
                        {(restTime.anios < 0 || restTime.meses < 0 || restTime.dias < 0) ? <><span className='font-bold'>Ya Pasaron: </span></> : <><span className='font-bold'>Finaliza en: </span> </>}
                        {restTime.anios != 0 && <> {Math.abs(restTime.anios)} años</>}
                        {restTime.meses != 0 && <> {Math.abs(restTime.meses)} meses</>}
                        {restTime.dias != 0 && <> {Math.abs(restTime.dias)} días</>}
                    </>
                    }
                </p>
                <p><span className='font-bold'>Estado: </span>: {toTexto(data?.estado)} </p>
                <p>Materia objetivo: {data?.materia} </p>
                <p className='mt-4'><span className='font-bold'>Descripcion del contrato: </span> </p>
                <div className='p-4 mb-6 bg-slate-200 rounded-md'>
                    {data?.descripcion}
                </div>
                {(data?.estado == 'A' || data?.estado == 'N') && <>
                    <p className='mt-4'><span className='font-bold'>Descripcion del Informe: </span> </p>
                    <div className='p-4  bg-slate-200 rounded-md'>
                        <p className={`${data?.estado == 'A' ? 'text-green-700' : 'text-red-500'} font-bold`}>{toTexto(data?.estado)}</p>
                        <p>id: {data?.informe_codigo}</p>
                        <p><span className='font-bold'>Abogado:</span> {data?.abogado_name}</p>
                        <p>Fecha: {fechaHumana(data?.fecha_creacion)}</p>
                        <p>Detalle de Informe: {data?.informe_descripcion}</p>
                    </div></>}

            </div>






        </>
    )
}