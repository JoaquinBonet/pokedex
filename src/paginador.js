import {mostrarPokemon} from './pokes.js'
import {borrarListadoAnterior, ocultarCargando, mostrarCargando} from './ui.js'
import {obtenerPokemonesEnPaginas} from './api.js'


export function mostrarListadoPokemones(pokes) {
    ocultarCargando();
    const lista = document.createElement("div")
    const columna = document.querySelector(".col-5")
    pokes.forEach(poke => {
        const item = document.createElement("a");
        item.href = "#";
        item.classList = "list-group-item list-group-item-action";
        item.dataset.nombre = poke.name;
        item.innerHTML = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
        item.setAttribute("data-toggle", "modal");
        item.setAttribute("data-target", "#exampleModalCenter");
        lista.classList = "list-group";
        lista.appendChild(item);
        columna.appendChild(lista);
        item.addEventListener("click", () => {mostrarPokemon(poke.name), clickNuevoPokemon()});
    
    });
}

function clickNuevoPokemon(){
    const items = document.querySelectorAll(".list-group-item")
    items.forEach(item => {
        const itemActivo = document.querySelector(".list-group-item.list-group-item-action.active");
        if (itemActivo) {
        itemActivo.classList.remove("active");
        }
        item.classList.add("active");

    });

}

export function crearItemsPaginacion(items) {
    const pagination = document.querySelector(".pagination");
    for (let i = 0; i < items; i++) {
        const item = document.createElement("li");
        item.classList.add("page-item");

        item.innerHTML = `<a class="page-link" href="#">${i + 1}</a>`;
        item.dataset.numero = i;
        pagination.appendChild(item);
    }
    const primerItem = document.querySelector("li");
    primerItem.classList.add("active");
}


export function activarPaginas(){
    const paginas =  document.querySelectorAll(".page-item");
    paginas.forEach(pagina => pagina.addEventListener("click", () => clickNuevaPagina(pagina)))
}

function clickNuevaPagina(pagina){
    mostrarCargando();
    const paginaActiva = document.querySelector(".page-item.active");
    if (paginaActiva) {
        paginaActiva.classList.remove("active");
    };
    pagina.classList.add("active");
    actualizarLista();
}


async function actualizarLista(){
    borrarListadoAnterior();
    const nuevos_poke = await obtenerPokemonesEnPaginas();
    const resultados = nuevos_poke.results
    mostrarListadoPokemones(resultados);
}
