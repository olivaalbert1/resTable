// Objetivo: Calcular a distância entre dois pontos
export const getDistancia = (url: string) => {
    console.log('url', url)
    let distancia

    if (url != undefined) {
        distancia = {
            latitud: url.split('!3d')[1].split('!4d')[0],
            longitud: url.split('!4d')[1].split('!')[0]
        }
    } else {
        distancia = {
            latitud: 0,
            longitud: 0
        }
    }

    return distancia
}