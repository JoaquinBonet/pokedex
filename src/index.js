
import {obtenerTotalPokemon} from './api.js'
import {mostrarListadoPokemones, activarPaginas, crearItemsPaginacion} from './paginador.js'


async function iniciar() {
    const dataPoke = await obtenerTotalPokemon();
    const totalPokemones = dataPoke.count;
    const results = dataPoke.results;
    crearItemsPaginacion(Math.ceil(totalPokemones / results.length));
    mostrarListadoPokemones(results);
    activarPaginas(); 
}


iniciar();






