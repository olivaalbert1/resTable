// Objetivo: Calcular a distância entre dois pontos
export const getDistancia = (url) => {
    let distancia = {
        latitud: url.split('!3d')[1].split('!4d')[0],
        longitud: url.split('!4d')[1].split('!')[0]
    }

    return distancia
}