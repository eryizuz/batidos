import React from 'react';

import corazon from '../corazon.png';

 

const Batido = ({batido}) => {
    
    const {frutas, liquido, proteina, sabor, valorTotal} = batido;

    
        /* const sumatoria = frutas[0].valorFruta + liquido.valorLiquido; */
        

   /*  if(frutas.length > 1) {
        frutas.map(fruta => (
            
        ))
    }else {
        console.log(frutas[0], "una");
    } */
    
    //console.log(batido.liquido);
    return ( 
        <div className="contenedor-batido">
            <h3 className="titulo">{batido.nombre}</h3>
            <div className="corazon">
                <img src={corazon} alt="algo" className="corazon" />
                <p className="numero-corazon">
                     <span>
                         {valorTotal}
                    </span>
                </p>
            </div>
            <div>
                <h3>Ingredientes</h3>
                <p>
                    Frutas:
                    <span>
                    {
                    (frutas.length > 1)?
                    
                    frutas.map(fruta => (
                        <span key={fruta.valorFruta}> {fruta.nombreFruta}</span>
                    ))
                
                    : <span>{frutas[0].nombreFruta}</span>
                    }
                    </span>
                </p>

                <p>Liquido: {liquido.nombreLiquido}</p>

                <p>Proteina: {proteina} </p>
                <p className="sabor">{sabor}% </p>
            </div>
        </div>
     );
}
 
export default Batido;