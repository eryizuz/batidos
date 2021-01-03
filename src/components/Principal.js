import React from 'react';
import { Link } from 'react-router-dom';

const Principal = () => {
    return ( 
        <div className="contenedor-flex">
            <Link to="/batidos/nuevo" className="link btn btn-success">Crear Batidos</Link>
            <Link to="/batidos" className="link btn btn-success">Ver batidos Creados</Link>
        </div>
     );
}
 
export default Principal;