import React from 'react';

const FrutasOptions = ({frutas, guardarFrutas, guardarOpcion}) => {

    let opcionesFrutas = ['Limon','Strawberry','Sandia','Kiwi','Piña','Banana','Naranja'];

    const nuevasOpciones = opcionesFrutas.filter(frutass => frutass !== frutas );

    return ( 
        <div className="form-group">
            <label>Seleccione Otra Fruta</label>
            <select name="nombrefruta" className="form-control" onChange={e => {
                guardarFrutas(e.target.value);
                guardarOpcion(true);
            }} >
                <option value=""></option>
                {nuevasOpciones.map(opcion => (
                    <option value={opcion} key={opcion} >{opcion}</option>
                ))}
            </select>
        </div>
     );
}
 
export default FrutasOptions;