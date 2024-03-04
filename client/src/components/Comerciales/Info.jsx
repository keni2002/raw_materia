import { useSelector, useDispatch } from "react-redux";
import { useGetComercialQuery } from "../../services/apiTable";
import { setIsOpenInfo } from "../../features/booleanos";

export default function Info() {
    const { tipo } = useSelector(state => state.booleanos);
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


    const { iD: id, isOpenInfo } = useSelector(state => state.booleanos);
    const { data } = useGetComercialQuery(id)
    const dispatch = useDispatch();
    return (
        <>
            {isOpenInfo && <div className=' fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center '>
                <div className='  bg-white p-5 rounded flex flex-col justify-start items-start gap-5 lg:w-96 md:w-80 sm:w-10/12'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-2xl lg:text-3xl'>Informacion de {data?.nombre}</h2>
                        <button onClick={() => dispatch(setIsOpenInfo(false))}>

                            <svg fill='#646464' height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </button>
                    </div>
                    <div>
                        <p><span className="font-bold text-gray-900">Nombre y Apellidos: </span>
                            {data?.nombre} {data?.apellido}
                        </p>
                        <p><span className="font-bold text-gray-900">Correo: </span>
                            <a className="font-serif text-blue-600" href={`mailto:${data?.email}`}>{data?.email}</a>
                        </p>
                        <p><span className="font-bold text-gray-900">Dirección: </span>
                            {data?.direccion}
                        </p>
                        <p><span className="font-bold text-gray-900">Fecha de Nacimiento: </span>
                            {fecha(data?.fechaNacimiento)}
                        </p>
                        <p><span className="font-bold text-gray-900">Edad: </span>
                            {calcularEdad(data?.fechaNacimiento)} años
                        </p>
                        <p><span className="font-bold text-gray-900">Años de experiencia: </span>
                            {data?.anioExperiencia} años
                        </p>
                        {tipo == 'asistentes' && <p><span className="font-bold text-gray-900">Nivel Escolar: </span>
                            {data?.nivelEscolar}
                        </p>}
                        {tipo == 'comerciales' && <p><span className="font-bold text-gray-900">Cantidad de Contratos </span>
                            {data.cntContratos ? data.cntContratos : 0}
                        </p>}
                        {tipo == 'directores' && <p><span className="font-bold text-gray-900">Grado Académico: </span>
                            {data?.gradoAcademico}
                        </p>}
                        {tipo != 'directores' && <p><span className="font-bold text-gray-900">Evaluación: </span>
                            {data.evaluacion == 5 ? 'Excelente' : data.evaluacion == 4 ? 'Bien' : data.evaluacion == 3 ? 'Regular' : data.evaluacion == 2 ? 'Mal' : 'No evaluado'}
                        </p>}
                        <p><span className="font-bold text-gray-900">Salario: </span>
                            ${data?.salario}
                        </p>
                        <p><span className="font-bold text-gray-900">Salario Final: </span>
                            {data?.evaluacion == 5 ? '$'+ data?.salario : data?.evaluacion == 4 ? '$' + (data?.salario - 50) : data?.evaluacion == 3 ? '$' + (data?.salario - 100) : data?.evaluacion == 2 ? '$' + (data?.salario - 150) : '-'}
                        </p>



                    </div>


                </div>
            </div>}
        </>
    )
}