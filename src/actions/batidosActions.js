import {
    AGREGAR_BATIDO,
    AGREGAR_BATIDO_EXITO,
    AGREGAR_BATIDO_ERROR,
    COMENZAR_DESCARGAR_BATIDOS,
    DESCARGA_BATIDOS_EXITOSA,
    DESCARGA_BATIDOS_ERROR,
} from '../types';

import clienteAxios from '../config/axios';


//crear un nuevo batido - funcion principal

export function crearNuevoBatidoAction(batido) {
    return (dispatch) => {
        dispatch( nuevoBatido() );

        //insertar en la API
        clienteAxios.post('/batidos/nuevo', batido)
            .then(res => {
                console.log(res);
                dispatch( agregarbatidoExito(batido) );
            })
            .catch(error => {
                dispatch( agregarbatidoError(error) )
            })
    }
}

export const nuevoBatido = () => ({
    type: AGREGAR_BATIDO
})

export const agregarbatidoExito = batido => ({
    type: AGREGAR_BATIDO_EXITO,
    payload: batido
})

export const agregarbatidoError = error => ({
    type: AGREGAR_BATIDO_ERROR,
    payload: error
})

export function descargarBatidosAction() {
    return (dispatch) => {
        dispatch(obtenerBatidosComienzo());

        //consultar api
        clienteAxios.get('/batidos')
            .then(res => {
                //console.log(res)
                dispatch( descargaBatidosExitosa(res.data) );
            })
            .catch(er => {
                //console.log(er)
                dispatch( descargaBatidosError() );
            })
    }
}

export const obtenerBatidosComienzo = () => ({
    type: COMENZAR_DESCARGAR_BATIDOS
})

export const descargaBatidosExitosa = (batidos) => ({
    type: DESCARGA_BATIDOS_EXITOSA,
    payload: batidos

})

export const descargaBatidosError = () => ({
    type: DESCARGA_BATIDOS_ERROR

})
