const URL = "https://pokeapi.co/api/v2/pokemon/";


function iniciar(offset = "0") {
    fetch(URL + `?limit=60&offset=${offset}`).then(r => r.json()).then(r => {
        const totalPokemones = r.count;
        const results = r.results;

        
        crearItemsPaginacion(Math.ceil(totalPokemones / results.length));
        mostrarListadoPokemones(results)
        
    });

  
}


iniciar();

function mostrarListadoPokemones(pokes) {
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
        item.addEventListener("click", () => {
            const itemActivo = document.querySelector(".list-group-item.list-group-item-action.active");
            if (itemActivo) {
                itemActivo.classList.remove("active");
            }
            item.classList.add("active");


            obtenerDatosPokemon(poke.name);
        })


    })

}

async function obtenerDatosPokemon(nombre) {
    //eliminarCartelesCargando();
    mostrarTituloPokemon(nombre);

    await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json()).then(r => {
        mostrarTipo(r.types),
        mostrarHabilidades(r.abilities);
        mostrarPeso(r.weight);
        mostrarImagen(r.sprites);
        



    })
    


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

function crearItemsPaginacion(items) {
    const pagination = document.querySelector(".pagination");
    for (let i = 1; i <= items; i++) {
        const item = document.createElement("li");
        item.classList.add("page-item");

        item.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        item.dataset.numero = i - 1;
        pagination.appendChild(item);

    }
    const primerItem = document.querySelector("li");
    primerItem.classList.add("active");

    mostrarPagina();

}


function mostrarPagina() {
    const paginas =  document.querySelectorAll(".page-item");
    paginas.forEach(pagina => pagina.addEventListener("click", () => {
        const paginaActiva = document.querySelector(".page-item.active");
        if (paginaActiva) {
            paginaActiva.classList.remove("active");
        };
        pagina.classList.add("active");
        obtenerPokemonesEnPaginas();
    }));
    
}

function obtenerPokemonesEnPaginas(){
  
    const listaAnterior = document.querySelector(".list-group")
    const paginaActual = document.querySelector(".page-item.active");
    let indice = paginaActual.dataset.numero;
    listaAnterior.remove();
    mostrarCargando();
    fetch(URL + `?limit=60&offset=${0 + (indice * 60)}`).then(r => r.json()).then(r => {
        const results = r.results;
        mostrarListadoPokemones(r.results)
    })


}

function ocultarCargando(){
    const cargando = document.querySelector("i");
    cargando.classList.add("oculto")

}

function mostrarCargando(){
    const cargando = document.querySelector("i");
    cargando.classList.remove("oculto")

}

/*function eliminarCartelesCargando(){
    const imgModal = document.querySelector(".modal img")
    const modal = document.querySelector(".modal");
    const textos = document.querySelectorAll(".modal i");
    for(let i = textos.length-1; i >= 0; i--){
        textos[i].remove();
    }
} */
