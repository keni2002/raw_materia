export default function ToDay() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}