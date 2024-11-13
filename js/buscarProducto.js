import { conexionAPI } from "./conexionAPI.js";


const contenedorProducto = document.querySelector(".buscando")
const contenedorProductos = document.querySelector(".contenedor-swyper-productos");
const productoNoEncontrado = document.querySelector(".contenedor-producto-noencontrado");


async function filtrarProducto(evento) {
    evento.preventDefault();
    try {
    const datosDeBusqueda = document.querySelector("[data-busqueda]").value;
    const busqueda = await conexionAPI.buscarProductos(datosDeBusqueda);

    contenedorProducto.style.display="flex";
    contenedorProductos.style.display="none";

    const inputEnter = document.getElementById('buscar');
    inputEnter.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
    filtrarProducto(e);
    }
});
    
    const productosFiltrado = busqueda.filter(productoBuscado =>
        productoBuscado.nombreProducto.toLowerCase().includes(datosDeBusqueda)
    );

    const basura = document.querySelector(".contenedor-productos")
    basura.style.display="none";


    if(datosDeBusqueda.length == 0 || productosFiltrado == 0){
        productoNoEncontrado.style.display="flex";
    }
    else{
        contenedorProducto.innerHTML = "";  // Limpia resultados previos
        productosFiltrado.forEach(productoBuscado => contenedorProducto.appendChild(crearProducto(
            productoBuscado.imagenProducto,
            productoBuscado.nombreProducto,
            productoBuscado.precioProducto))
        );
    }
    } catch(e) {
        console.log(e)
    }
}

function crearProducto(imagenProducto, nombreProducto, precioProducto){
    const productoBuscado = document.createElement("div");
    productoBuscado.className = "contenedor-producto-encontrado";

    productoBuscado.innerHTML=`<div class="producto-imagen">
            <img src=${imagenProducto} alt="Producto">
        </div>
          <div class="producto-info">
            <div class="producto-titulo">${nombreProducto}</div>
            <div class="producto-precio">${precioProducto}</div>
            <div class="envio-gratis">Envío gratis</div>
          </div>
        </div>`

    return productoBuscado
}


const boton = document.querySelector("[data-boton-busqueda]");

boton.addEventListener("click",evento=>{filtrarProducto(evento)})
