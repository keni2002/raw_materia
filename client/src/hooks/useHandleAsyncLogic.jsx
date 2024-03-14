import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

export function useHandleAsyncLogic({ isLoading, isSuccess, isError, error, successMesaage, customURL }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate(customURL)
            toast.success(successMesaage);
        }
        if (isError) {
            if (error.status === 401) {
                toast.error('Credenciales inválidas');
            } else if (error.status === 500) {
                toast.error('Error del servidor');
            } else if (error.status === 'FETCH_ERROR') {
                toast.error('Error de red');
            }
            else {
                toast.error('Error desconocido');
            }
        }
    }, [isLoading])
}