export default function fechaHumana(fecha) {

    if (new Date(fecha + 'T00:00:00').getFullYear() == new Date().getFullYear()) {
        return new Date(fecha + 'T00:00:00')
            .toLocaleDateString('es-US', {
                month: 'long',
                day: 'numeric'
            })
    }


    else {
        return new Date(fecha + 'T00:00:00')
            .toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
    }

}
