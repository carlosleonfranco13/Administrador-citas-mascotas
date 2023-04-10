import Citas from '/js/classes/Citas.js';
import UI from '/js/classes/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from '/js/classes/selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

// Objeto con la información de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

export function datosCita(e) {
  // console.log(e.target.name) // Obtener el Input
  citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
  e.preventDefault();

  // Extraer la información del objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  // Validar
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    // Pasar el objeto de la cita a edición
    administrarCitas.editarCita({ ...citaObj });

    // Regresar el texto del botón a su estado original
    formulario.querySelector('button[type="submit"]').textContent =
      "Crear Cita";

    // Quitar modo edición
    editando = false;
  } else {
    // Generar un ID único
    citaObj.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agregó correctamente");
  }

  // Reiniciar el objeto para la validación
  reiniciarObjeto();

  // Reiniciar el formulario
  formulario.reset();

  // Mostrar el HTML de las citas
  ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

export function eliminarCita(id) {
  // Eliminar la cita
  administrarCitas.eliminarCita(id);

  // Muestre un mensaje
  ui.imprimirAlerta("La cita se eliminó correctamente");

  // Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // Llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  // Cambiar el txt del botón
  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";

  editando = true;
}