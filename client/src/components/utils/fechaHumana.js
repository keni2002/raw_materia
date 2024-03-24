export default function fechaHumana(fecha) {


    if (new Date(fecha).getFullYear() == new Date().getFullYear()) {
        return new Date(fecha)
            .toLocaleDateString('es-ES', {
                month: 'long',
                day: 'numeric'
            })


    } else {
        return new Date(fecha)
            .toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
    }

}
