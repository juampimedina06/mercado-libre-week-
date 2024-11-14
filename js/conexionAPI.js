async function listarProductos() {
    const conexion = await fetch("https://api-fake-gilt.vercel.app/productos");
    const conexionConvertida = await conexion.json();

    return conexionConvertida
}

async function enviarProducto(tituloProducto, imagenProducto, nombreProducto, precioProducto) {
    try {
        const conexion = await fetch("https://api-fake-gilt.vercel.app/productos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                tituloProducto: tituloProducto,
                imagenProducto: imagenProducto,
                nombreProducto: nombreProducto,
                precioProducto: `$${precioProducto}`,
            })
        });

        if (!conexion.ok) throw new Error(`Error HTTP: ${conexion.status}`);

        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error("Hubo un error al enviar el producto:", error);
    }
}

//!PARA USAR LA BARRA DE BUSQUEDA
async function buscarProductos(palabraClave) {
    const conexion = await fetch(`https://api-fake-gilt.vercel.app/productos?q=${palabraClave}`) //! USAR q=tal cosa para poder buscar el video
    const conexionConvertida = conexion.json();
    return conexionConvertida;
}



async function eliminarProducto(id) {
    const confirmarEliminacion = confirm("¿Estás seguro de que querés eliminar el producto?");

    if (!confirmarEliminacion) {
        console.log('Eliminación cancelada');
        return;
    }

    try {
        const response = await fetch(`https://api-fake-gilt.vercel.app/productos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Hubo un problema al eliminar el producto. Por favor, intentá de nuevo.');
    }
}



export const conexionAPI={
    listarProductos, 
    enviarProducto,
    buscarProductos,
    eliminarProducto
}