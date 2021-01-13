import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import Header from "./Header";

//redux
import { crearNuevoBatidoAction } from '../actions/batidosActions';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux';

const CrearBatido = ({history}) => {

    // state local

    const [nombre, guardarNombre ] = useState('');
    const [frutas, guardarFrutas ] = useState([]);
    const [objeto, guardarObjeto] = useState([]);
    //arreglo de objetos frutas
    const [liquido, guardarLiquido ] = useState({});
    const [proteina, guardarProteina ] = useState('');
    const [sabor, guardarSabor ] = useState('');


    // redux
    const dispatch = useDispatch();
    const agregarBatido = (batido) => dispatch( crearNuevoBatidoAction(batido) );
    const validarFormulario = () => dispatch( validarFormularioAction() );
    const exitoValidacion = () => dispatch( validacionExito() );
    const errorValidacion = () => dispatch( validacionError() );

    //seleccionamos el state de redux
    const error = useSelector(state => state.error.error);


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

          let salubridad = 0;
          objeto.forEach(e => {
              salubridad += e.valorFruta;
          })

          salubridad += liquido.valorLiquido;
          

          const objetoDB = {
            nombre,
            frutas: objeto,
            liquido: liquido.nombreLiquido,
            proteina,
            sabor: parseInt(sabor),
            salubridad

          }

          //console.log(objetoDB);
          agregarBatido(objetoDB);

        }


    const FrutaState = e => {
        //agrego la fruta al state (local)
        guardarFrutas([
            ...frutas,
            e.target.value
        ]);
     
        const { value } = e.target;

        /* const valuecortado = value.substring(value.length -1);
        guardarValorFruta(parseInt(valuecortado)); */

        const arregloFruta = value.split(' ',2);
        const nombreF = arregloFruta[0];

        const valorFruta = parseInt(arregloFruta[1]);

        guardarObjeto([
          ...objeto,
            {
              nombreFruta: nombreF,
              valorFruta
            }
        ]);

        let select = e.target;

        select.disabled = true;
      
    }

    const leerLiquido = e => {

      const { value } = e.target;

      const valueCortadoNumero = parseInt(value.substring(value.length -1));

      const valueCortadoNombre = value.substring(0,value.length -2);

      guardarLiquido({
        nombreLiquido: valueCortadoNombre,
        valorLiquido: valueCortadoNumero
      })     

    }

    const insertarInput = () => {
        //constantes 

        const eliminarSelect = () => {

          let newobject = [...objeto];
          newobject.splice(objeto.length,1);
          guardarObjeto(newobject);
            div.remove();

        }

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
        option.value = 'Limon 4';
        option.innerHTML = 'Limon';

        let option2 = document.createElement("option");
        option2.innerHTML = 'Strawberry';
        option2.value = 'Strawberry 5';

        let option3 = document.createElement("option");
        option3.innerHTML = 'Sandia';
        option3.value = 'Sandia 6';

        let option4 = document.createElement("option");
        option4.innerHTML = 'Kiwi';
        option4.value = 'Kiwi 7';

        let option5 = document.createElement("option");
        option5.innerHTML = 'Piña';
        option5.value = 'Piña 8';

        let option6 = document.createElement("option");
        option6.innerHTML = 'Banana';
        option6.value = 'Banana 9';

        let option7 = document.createElement("option");
        option7.innerHTML = 'Naranja';
        option7.value = 'Naranja 10';

        select.append(Vacia,option, option2,option3,option4,option5,option6,option7);
        select.addEventListener("change", FrutaState);

        const botonBorrar = document.createElement('button');
        botonBorrar.innerHTML = 'Eliminar Fruta';
        botonBorrar.setAttribute("type", "button");
        botonBorrar.setAttribute("class", "btn submit derecha");
        botonBorrar.addEventListener("click", eliminarSelect);

        div.appendChild(select);
        div.appendChild(botonBorrar);
        let form = document.getElementById("CreateForm");

        let idliquido = document.getElementById("id-liquido");

        form.insertBefore(div,idliquido);
        
        
    }

  return (
    <Fragment>
      <Header />

      <div className="contenedor">
        <div className="borde">
          <br />
          <br />
          <br />
          <br />
          <div className="formulario">
            <form onSubmit={enviarDatos} id="CreateForm">
              <div className="form-group" id="div">
                <label>Escriba el nombre del batido</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Nombre de batido"
                  name="nombre"
                  onChange={(e) => guardarNombre(e.target.value)}
                  value={nombre}
                />
              </div>

              <div className="form-group">
                <label id="label">Seleccione Una Fruta</label>
                <select
                  name="nombrefruta"
                  className="form-control"
                  onChange={FrutaState}
                >
                  <option value=""></option>
                  <option value="Limon 4">limon</option>
                  <option value="Strawberry 5">Strawberry</option>
                  <option value="Sandia 6">Sandia</option>
                  <option value="Kiwi 7">kiwi</option>
                  <option value="Piña 8">piña</option>
                  <option value="Banana 9">Banana</option>
                  <option value="Naranja 10">Naranja</option>
                </select>
                <br />
              </div>

              <button
                name="boton"
                type="button"
                onClick={insertarInput}
                id="id-liquido"
                className="btn submit derecha"
              >
                Agregar otra fruta
              </button>
              <div className="form-group">
                <label>Seleccione el liquido</label>
                <select
                  name="liquido"
                  className="form-control"
                  onChange={leerLiquido}
                >
                  <option value=""></option>
                  <option value="Agua 0">Agua</option>
                  <option value="Lecha de almendra 1">Leche de Almendra</option>
                  <option value="Agua de coco 2">Agua de coco</option>
                  <option value="Leche de soya 3">Leche de soya</option>
                  <option value="Leche 4">Leche</option>
                </select>
              </div>

              <div className="form-group">
                <label>Seleccione la proteina</label>
                <select
                  name="proteina"
                  className="form-control"
                  onChange={(e) => guardarProteina(e.target.value)}
                >
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
                <input
                  type="number"
                  className="form-control"
                  value={sabor}
                  onChange={(e) => guardarSabor(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-block submit"
                form="CreateForm"
              >
                Crear
              </button>
            </form>

            {/* <div className="contenedor-derecha">
                        <button name="boton" type="button" onClick={insertarInput} className="btn btn-block submit derecha">Agregar otra fruta</button>
                    </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CrearBatido;
