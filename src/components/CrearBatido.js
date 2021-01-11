import React, { useState, useEffect, Fragment } from 'react';
import FrutasOptions from './FrutasOptions';
import Swal from 'sweetalert2';

import Header from './Header';

//redux
import { crearNuevoBatidoAction } from '../actions/batidosActions';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux';



const CrearBatido = ({history}) => {

    const [nombre, guardarNombre ] = useState('');

    const [frutas, guardarFrutas ] = useState([]);
    const [otrafrutas, guardarotrafrutas] = useState('');

    const [liquido, guardarLiquido ] = useState('');

    const [proteina, guardarProteina ] = useState('');
    const [sabor, guardarSabor ] = useState('');

    const [opcion, guardarOpcion] = useState(false);

    const [valorFruta, guardarValorFruta] = useState('');
    const [valorOtraFruta, guardarOtraValorFruta] = useState('');

    const [valorLiquido, guardarValorLiquido ] = useState('');

    const [valorTotal, guardarValorTotal] = useState(0);

    //crear nuevo producto

    const dispatch = useDispatch();
    const agregarBatido = (batido) => dispatch( crearNuevoBatidoAction(batido) );
    const validarFormulario = () => dispatch( validarFormularioAction() );
    const exitoValidacion = () => dispatch( validacionExito() );
    const errorValidacion = () => dispatch( validacionError() );

    //seleccionamos el state de redux
    const error = useSelector(state => state.error.error);

    useEffect( () => {

        if(!frutas){
            return;
        } else {
            //aqui tenemos que darle valor a la fruta deacuerdo a la table de valores de la prueba
            /* let valoresFrutas = {
                Sandia: 6,
                Strawberry: 5,
                Piña: 8,
                Narajanja: 10,
                Kiwi: 7,
                Banana: 9,
                Limon: 4,

            } */
            //valores de la primera fruta

            if(frutas === 'Limon'){
                guardarValorFruta(4)
            }else if(frutas === 'Sandia') {
                guardarValorFruta(6)
            }else if(frutas === 'Strawberry') {
                guardarValorFruta(5)
            }else if(frutas === 'Piña') {
                guardarValorFruta(8)
            }else if(frutas === 'Narajanja') {
                guardarValorFruta(10)
            }else if(frutas === 'Kiwi') {
                guardarValorFruta(7)
            }else if(frutas === 'Banana') {
                guardarValorFruta(9)
            }

            //valores de la segunda

            if(otrafrutas === 'Limon'){
                guardarOtraValorFruta(4)
            }else if(otrafrutas === 'Sandia') {
                guardarOtraValorFruta(6)
            }else if(otrafrutas === 'Strawberry') {
                guardarOtraValorFruta(5)
            }else if(otrafrutas === 'Piña') {
                guardarOtraValorFruta(8)
            }else if(otrafrutas === 'Naranja') {
                guardarOtraValorFruta(10)
            }else if(otrafrutas === 'Kiwi') {
                guardarOtraValorFruta(7)
            }else if(otrafrutas === 'Banana') {
                guardarOtraValorFruta(9)
            }
        }

        if(liquido){
            /* let valoresFrutas = {
                Leche: 4,
                Agua: 0,
                Aguadecoco: 2,
                Lechedesoya: 3,
                lechedealmendra: 1

            } */
            if(liquido === 'Leche'){
                guardarValorLiquido(4)
            }else if(liquido === 'Agua') {
                guardarValorLiquido(0)
            }else if(liquido === 'Agua de coco') {
                guardarValorLiquido(2)
            }else if(liquido === 'Leche de soya') {
                guardarValorLiquido(3)
            }else if(liquido === 'Lecha de almendra') {
                guardarValorLiquido(1)
            }
        }
        const sumaTotal = () => {
            if(!valorOtraFruta) {
                const valorSumado = parseInt(valorFruta + valorLiquido, 10);
                guardarValorTotal(valorSumado);


            }else {
                const valorSumado = parseInt(valorFruta+ valorOtraFruta + valorLiquido, 10);
                guardarValorTotal(valorSumado);
                console.log(valorTotal);
            }
        }
        sumaTotal();
        /* const valorSumado = parseInt(valorFruta + valorLiquido, 10);
        guardarValorTotal(valorSumado); */

    },[frutas,otrafrutas, liquido, valorFruta, valorOtraFruta, valorLiquido, valorTotal])

    const enviarDatos = e => {

        e.preventDefault();

        validarFormulario();
        

        // validamos que todso los campos esten llenos

        if(nombre === '' || frutas === '' || liquido === '' || proteina === '' || sabor === ''){
            errorValidacion();
            if(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Todos los campos son obligatorios',
                    text: 'por favor complete el/los campos que le falten',
                  })
            }
            return;
        }

        //hacer suamtoria de valores para mandarlo a la db

        exitoValidacion();
        Swal.fire(
            'Felicidades!',
            'Su batido se creó correctamente!',
            'success'
          )
          history.push('/batidos');

        // hacemos un objeto para mandarlo a la db 

        //aki valido si el cliente le agrega otra fruta a la vaina njd 

        if(!opcion) {

            
            let batidoObjetoModelo = {
                nombre,
                frutas: [
                    {
                        nombreFruta: frutas,
                        valorFruta
                    }
                ],
                liquido: {
                    nombreLiquido: liquido,
                    valorLiquido: valorLiquido
                },
                proteina,
                sabor,
                valorTotal
            }
            
            //console.log(batidoObjetoModelo);
            agregarBatido(batidoObjetoModelo);
        } else {

            let batidoObjetoModelo = {
                nombre,
                frutas: [
                    {
                        nombreFruta: frutas,
                        valorFruta
                    },
                    {
                        nombreFruta: otrafrutas,
                        valorFruta: valorOtraFruta
                    }
                ],
                liquido: {
                    nombreLiquido: liquido,
                    valorLiquido: valorLiquido
                },
                proteina,
                sabor,
                valorTotal
            }
            /* const valorSumado = parseInt(batidoObjetoModelo.frutas[0].valorFruta + batidoObjetoModelo.frutas[1].valorFruta + valorLiquido, 10);
            guardarValorTotal(valorSumado); */
            //console.log(valorTotal);

            //console.log(batidoObjetoModelo);
            agregarBatido(batidoObjetoModelo);
            
        }

    }

    const FrutaState = e => {
        //agrego la fruta al state (local)
        guardarFrutas([
            ...frutas,
            e.target.value
        ]);

        
    }

    const insertarInput = () => {
        //constantes 

        const div = document.createElement("div");
        div.setAttribute("class", "form-group");

        const label = document.createElement("label");
        label.innerHTML = "Elija una fruta"

        div.appendChild(label)

        let select = document.createElement("select");
        select.setAttribute("class", "form-control");

        //creamos las mil opciones delas frutas
        let Vacia = document.createElement("option");
        Vacia.value = '';
        Vacia.innerHTML = '';

        let option = document.createElement("option");
        option.value = 'Limon';
        option.innerHTML = 'Limon';

        let option2 = document.createElement("option");
        option2.innerHTML = 'Strawberry';
        option2.value = 'Strawberry';

        let option3 = document.createElement("option");
        option3.innerHTML = 'Sandia';
        option3.value = 'Sandia';

        let option4 = document.createElement("option");
        option4.innerHTML = 'Kiwi';
        option4.value = 'Kiwi';

        let option5 = document.createElement("option");
        option5.innerHTML = 'Piña';
        option5.value = 'Piña';

        let option6 = document.createElement("option");
        option6.innerHTML = 'Banana';
        option6.value = 'Banana';

        let option7 = document.createElement("option");
        option7.innerHTML = 'Naranja';
        option7.value = 'Naranja';

        select.append(Vacia,option, option2,option3,option4,option5,option6,option7);
        select.addEventListener("change", FrutaState);
        div.appendChild(select)
        
        let form = document.getElementById("CreateForm");

        let idliquido = document.getElementById("id-liquido");

        form.insertBefore(div,idliquido);
        
        
    }


    return ( 

        <Fragment>

        <Header />
        <div className="contenedor">
            {/* <Link to='/' className='btn submit' >Volver</Link> RAMA ESPERIMENTP */}
        
            <div className="borde">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="formulario">
                    <form onSubmit={enviarDatos} id="CreateForm">
        
                        <div className="form-group" id="div">
                            <label>Escriba el nombre del batido</label>
                            <input type="text" autoComplete="off" className="form-control" placeholder="Nombre de batido" name="nombre" onChange={e => guardarNombre(e.target.value)} value={nombre} />
                        </div>

                        <div className="form-group">
                            <label id="label">Seleccione Una Fruta</label>
                            <select name="nombrefruta" className="form-control" onChange={FrutaState} >
                                <option value=""></option>
                                <option value="Limon">limon</option>
                                <option value="Strawberry">Strawberry</option>
                                <option value="Sandia">Sandia</option>
                                <option value="Kiwi">kiwi</option>
                                <option value="Piña">piña</option>
                                <option value="Banana">Banana</option>
                                <option value="Naranja">Naranja</option>

                            </select>
                            <br/>              
                        </div>



                        <div className="form-group" id="id-liquido">
                            <label>Seleccione el liquido</label>
                            <select name="liquido" className="form-control" onChange={ (e) => guardarLiquido(e.target.value)} >
                                <option value=""></option>
                                <option value="Agua">Agua</option>
                                <option value="Lecha de almendra">Leche de Almendra</option>
                                <option value="Agua de coco">Agua de coco</option>
                                <option value="Leche de soya">Leche de soya</option>
                                <option value="Leche">Leche</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Seleccione la proteina</label>
                            <select name="proteina" className="form-control" onChange={ (e) => guardarProteina(e.target.value)} >
                                <option value=""></option>
                                <option value="Sin sabor">Sin sabor</option>
                                <option value="Vainilla">Vainilla</option>
                                <option value="Chocolate">Chocolate</option>
                                <option value="Coco">Coco</option>
                                <option value="Caramelo">Caramelo</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>puntue del 1 al 100</label>
                            <input type="number" className="form-control" value={sabor} onChange={ (e) => guardarSabor(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-block submit" form="CreateForm" >Crear</button>
                    </form>

                    <div className="contenedor-derecha">
                        <button name="boton" onClick={insertarInput} className="btn btn-block submit derecha">Agregar otra fruta</button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
     );
    
}
 
export default CrearBatido;