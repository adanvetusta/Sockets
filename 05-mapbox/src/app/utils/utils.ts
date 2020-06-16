/**
 * Generar color hexadecimal aleatorio
 */
export function generarColorHexadecimal() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Crear id único
 */
export function idUnico() {
    return new Date().toISOString();
}
