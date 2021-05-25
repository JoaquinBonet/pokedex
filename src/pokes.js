
import {obtenerDatosPokemon} from './api.js'

export async function mostrarPokemon(nombre){
    const dataPoke = await obtenerDatosPokemon(nombre);
    mostrarTipo(dataPoke.types),
    mostrarHabilidades(dataPoke.abilities);
    mostrarPeso(dataPoke.weight);
    mostrarImagen(dataPoke.sprites);
    mostrarTituloPokemon(dataPoke.name);
}

function mostrarTituloPokemon(nombre) {
    const tituloModal = document.querySelector("#tituloModal");
    tituloModal.innerHTML = nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

function mostrarImagen(imagenes) {

    const imagenFrente = document.querySelector("#imagenFrente");
    const imagenAtras = document.querySelector("#imagenAtras");
    imagenFrente.src = imagenes["front_default"];
    imagenFrente.addEventListener("mouseover", function () {
        imagenFrente.src = imagenes["back_default"];
    });
    imagenFrente.addEventListener("mouseout", function () {
        imagenFrente.src = imagenes["front_default"];
    });
}


function mostrarTipo(tipos) {
    const tipoModal = document.querySelector("#tipo");
    let arrTipos = []
    tipos.forEach(tipo => {
        arrTipos.push(tipo.type.name)

    });
    tipoModal.innerHTML = arrTipos.join("<br>");
}

function mostrarPeso(peso) {
    const pesoModal = document.querySelector("#peso");
    pesoModal.innerHTML = peso;
}

function mostrarHabilidades(habilidades) {
    const hab = document.querySelector("#habilidades");
    let arrHabs = [];
    habilidades.forEach(habilidad => arrHabs.push(habilidad.ability.name));
    hab.innerHTML = arrHabs.join("<br>");


}
