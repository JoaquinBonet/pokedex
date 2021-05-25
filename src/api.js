import {mostrarNumeroPagina} from './ui.js'
const URL = 'https://pokeapi.co/api/v2/pokemon/';


export function obtenerTotalPokemon(offset = "0"){
    return fetch(URL + `?limit=60&offset=${offset}`).then(r => r.json());
}

export function obtenerPokemonesEnPaginas(){
    return obtenerTotalPokemon(mostrarNumeroPagina() * 60);
    
}

export function obtenerDatosPokemon(nombre) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json());
}
