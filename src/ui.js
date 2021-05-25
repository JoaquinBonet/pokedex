export function borrarListadoAnterior(){
    const listaAnterior = document.querySelector(".list-group")
    listaAnterior.remove();
}

export function mostrarNumeroPagina(){
    const paginaActual = document.querySelector(".page-item.active");
    const indice = paginaActual.dataset.numero;
    return indice;
}

export function ocultarCargando(){
    const cargando = document.querySelector("i");
    cargando.classList.add("oculto")

}

export function mostrarCargando(){
    const cargando = document.querySelector("i");
    cargando.classList.remove("oculto")

}
