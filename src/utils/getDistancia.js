// Objetivo: Calcular a distância entre dois pontos
export const getDistancia = (url) => {
    let distancia
    // Si la variable url no contiene 'maps.google.com', retornar un objeto con latitud y longitud como 0
    if (!url.includes('!3d') || !url.includes('!4d')) {
        return distancia = { latitud: 0, longitud: 0 };
    } else {
        // Si la url no contiene los parámetros necesarios, retornar un objeto con latitud y longitud como 0
        return distancia = {
            latitud: url.split('!3d')[1].split('!4d')[0],
            longitud: url.split('!4d')[1].split('!')[0]
        };
    }
}