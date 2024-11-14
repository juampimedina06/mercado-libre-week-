import { conexionAPI } from "./conexionAPI.js";

const contenedorAlerta = document.querySelector(".overlay")
const alertaExitosa = document.querySelector(".producto-agregado-exitosamente")
const alertaError = document.querySelector(".producto-agregado-erroneamente")

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();//! para que no se ejecute de forma automatica por default el formulario

    const tituloProducto = document.querySelector("[data-titulo]").value;
    const imagenProducto = document.querySelector("[data-url]").value;
    const nombreProducto = document.querySelector("[data-nombre]").value;
    const precioProducto = document.querySelector("[data-precio]").value;

    
    try {
        await conexionAPI.enviarProducto(tituloProducto, imagenProducto, nombreProducto, precioProducto);
        contenedorAlerta.style.display="flex"
        alertaExitosa.style.display="flex"
        window.location.href = "index.html";
    } catch(e) {
        contenedorAlerta.style.display="flex"
        alertaError.style.display="flex"
    }

}

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function () {
      this.parentElement.style.display ="none";
      contenedorAlerta.style.display="none";
    });
  });
    
formulario.addEventListener("submit",evento => crearProducto(evento))
