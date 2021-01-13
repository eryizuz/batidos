import {
    AGREGAR_BATIDO,
    AGREGAR_BATIDO_EXITO,
    AGREGAR_BATIDO_ERROR,
    COMENZAR_DESCARGAR_BATIDOS,
    DESCARGA_BATIDOS_EXITOSA,
    DESCARGA_BATIDOS_ERROR,
} from '../types';


//cada reducer tiene su propio state
const initialState = {
    batidos: [],
    error: null,
    loading: false,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case AGREGAR_BATIDO:
            return {
                ...state,
                error: null,
            }
        case AGREGAR_BATIDO_EXITO:
            return {
                ...state,
                error: null,
                batidos: [...state.batidos, action.payload]
            }
        case AGREGAR_BATIDO_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case COMENZAR_DESCARGAR_BATIDOS:
            return {
                ...state,
                loading: true
            }
        case DESCARGA_BATIDOS_EXITOSA:
            return {
                ...state,
                batidos: action.payload,
                loading: false
            }
        case DESCARGA_BATIDOS_ERROR:
            return {
                ...state,
                batidos: [],
                error: true,
                loading: false
            }
        default:
            return state;
    }
}