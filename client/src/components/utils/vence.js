//SI es hoy o ya paso entonce vence retorna verdadero
//funciona con fechaRestante
import rest from './fechaRestante'

export default function vence(fecha) {
    const { anios, meses, dias } = rest(fecha)
    if ((anios < 0 || meses < 0 || dias < 0) || anios == 0 && meses == 0 && dias == 0) {
        return true
    }

}