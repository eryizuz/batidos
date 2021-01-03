import React from 'react';
import { Link } from 'react-router-dom';
import imagen from '../logo.png';
const Header = () => {


    return ( 

            <div>
                <Link to='/' className='btn submit' >
                    <i className="fas fa-arrow-circle-left"></i>
                    {' '}
                    Volver
                </Link>
                <img src={imagen} className="logo" alt="imagen" />
            </div>
        
     );
}
 
export default Header;