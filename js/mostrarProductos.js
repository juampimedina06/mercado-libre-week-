import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearCard(tituloProducto, imagenProducto, nombreProducto, precioProducto, id) {
    const producto = document.createElement("li");
    producto.className = "producto";
    producto.innerHTML = `
        <div class="contenedor-titulo">
            <h2 class="titulo-producto">${tituloProducto}</h2>
        </div>
        <div class="contenedor-imagen-producto">
            <img class="imagen-producto" src=${imagenProducto} alt="imagen producto">
        </div>
        <div class="contenedor-informacion-producto">
            <p class="nombre-producto">${nombreProducto}</p>
            <p class="precio-producto">${precioProducto}</p>
            <div class="contenedor-precio">
                <span class="envio-gratis">Envio gratis</span>
                <a class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </a>
            </div>
        </div>
    `;

    const botonEliminar = producto.querySelector(".delete");
    botonEliminar.addEventListener("click", async () => {
        try {
            await conexionAPI.eliminarProducto(id); // Función que llama al DELETE en conexionAPI con el id del producto
            producto.remove(); // Remueve el producto de la lista en el DOM si se eliminó con éxito
            alert("producto eliminado exitosamente")
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });

    return producto;
}

async function listarProductos() {
    try {
        const listAPI = await conexionAPI.listarProductos();

        listAPI.forEach(producto => lista.appendChild(crearCard(
            producto.tituloProducto, 
            producto.imagenProducto,
            producto.nombreProducto,
            producto.precioProducto,
            producto.id // Aquí pasamos el id a la función crearCard
        )));
    } catch {
        lista.innerHTML = `<h2>Ha ocurrido un problema con la conexion...</h2>`;
    }
}

listarProductos();
