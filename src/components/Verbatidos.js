import React, { useState, useEffect, Fragment} from 'react';
import Spinner from './Spinner';

import Header from './Header';

/* import Swal from 'sweetalert2'; */

//redux

import { useDispatch, useSelector } from 'react-redux';
import { descargarBatidosAction } from '../actions/batidosActions';

//componente qeu va a iterar los batidos
import Batido from './Batido';
const VerBatidos = ({history}) => {

    const [recargar, guardarRecargar ] = useState(true);
    
   const dispatch = useDispatch();

    useEffect( () => {
        if(recargar){
            const comenzarDescarga = () => {
                dispatch( descargarBatidosAction() );
            }
    
            comenzarDescarga();
            guardarRecargar(false);
        }
    },[recargar, dispatch])

    //acceder al state de redux

    const loading = useSelector( state => state.batidos.loading );
    const batidos = useSelector( state => state.batidos.batidos );
    /* const error = useSelector(state => state.batidos.error); */
    return ( 
        <Fragment>
            <Header />
            <div className="contenedor-batidos">
                {
                (loading)? <Spinner />
                : <div className="contenedor-ver">
                    <h2 className="titulo-batido">Batidos Creados</h2>
                    <div className="batidos">
                        {batidos.map(batido => (
                            <Batido batido={batido} key={batido._id} />
                        ))}
                    </div>
                </div>
            }
            </div>
        </Fragment>
     );
}
 
export default VerBatidos;