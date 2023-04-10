import { eliminarCita, cargarEdicion } from '/js/classes/funciones.js';
import { contenedorCitas, heading } from '/js/classes/selectores.js';

class UI {

  constructor( {citas} ) {
    this.textoHeading(citas);
  }

  imprimirAlerta(mensaje, tipo) {
    // Crear el DIV
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Insertar en el DOM
    document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    // Quitar la alerta después de 5 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
                  <span class="font-weight-bolder">Propietario: </span> ${propietario}
              `;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
                  <span class="font-weight-bolder">Teléfono: </span> ${telefono}
              `;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
                  <span class="font-weight-bolder">Fecha: </span> ${fecha}
              `;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
                  <span class="font-weight-bolder">Hora: </span> ${hora}
              `;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `
                  <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
              `;

      // Botón para eliminar esta cita
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
      btnEliminar.onclick = () => eliminarCita(id);

      // Añade un botón para editar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML =
        'Editar <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>';
      btnEditar.onclick = () => cargarEdicion(cita);

      // Agregar los párrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // Agregar las citas al HTML
      contenedorCitas.appendChild(divCita);
    });
  }

  textoHeading(citas) {
    if(citas.length > 0) {
      heading.textContent = 'Administra tus citas'
    } else {
      heading.textContent = 'No hay citas, comienza creando una'
    }
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
