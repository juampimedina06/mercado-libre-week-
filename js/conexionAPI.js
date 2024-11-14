async function listarProductos() {
    const conexion = await fetch("https://api-fake-gilt.vercel.app/productos");
    const conexionConvertida = conexion.json();

    return conexionConvertida
}

async function enviarProducto(tituloProducto, imagenProducto, nombreProducto, precioProducto) {
    const conexion = await fetch("https://api-fake-gilt.vercel.app/productos",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            tituloProducto:tituloProducto,
            imagenProducto:imagenProducto,
            nombreProducto:nombreProducto,
            precioProducto:`$${precioProducto}`
        })
    })
    const conexionConvertida = conexion.json();

    return conexionConvertida
}

//!PARA USAR LA BARRA DE BUSQUEDA
async function buscarProductos(palabraClave) {
    const conexion = await fetch(`https://api-fake-gilt.vercel.app/productos?q=${palabraClave}`) //! USAR q=tal cosa para poder buscar el video
    const conexionConvertida = conexion.json();
    return conexionConvertida;
}

export async function eliminarProducto(id) {
    const confirmarEliminacion = confirm("¿Seguro quieres eliminar el producto?");

    if (confirmarEliminacion === true) {
        try {
            const response = await fetch(`https://api-fake-gilt.vercel.app/productos${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }

            return response;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Hubo un problema al eliminar el producto.');
        }
    } else {
        console.log('Eliminación cancelada');
    }
}

export const conexionAPI={
    listarProductos, enviarProducto,buscarProductos,eliminarProducto
}