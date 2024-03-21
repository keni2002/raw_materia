import moment from 'moment'

export default function calcularTiempoRestante(fechaVencimiento) {
    var ahora = moment();
    var vencimiento = moment(fechaVencimiento);

    var anios = vencimiento.diff(ahora, 'years');
    ahora.add(anios, 'years');

    var meses = vencimiento.diff(ahora, 'months');
    ahora.add(meses, 'months');

    var dias = vencimiento.diff(ahora, 'days');

    var tiempoRestante = {};


    tiempoRestante.anios = anios;


    tiempoRestante.meses = meses;


    tiempoRestante.dias = dias;


    return tiempoRestante;
}
