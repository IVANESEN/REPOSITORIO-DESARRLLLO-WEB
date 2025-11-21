const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const esEmailValido = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

const validarFormulario = () => {
  const nombre = document.getElementById("idNombre");
  const apellido = document.getElementById("idApellido");
  const fechaNacimiento = document.getElementById("idFechaNacimiento");
  const correo = document.getElementById("idCorreo");
  const password = document.getElementById("idPassword");
  const repetirPassword = document.getElementById("idRepetirPassword");
  const cmbCarrera = document.getElementById("idCmbCarrera");
  const cmbPais = document.getElementById("idCmbPais");
  const intereses = document.querySelectorAll(".clsInteres");

  const controlesObligatorios = [
    nombre,
    apellido,
    fechaNacimiento,
    correo,
    password,
    repetirPassword
  ];

  let mensajes = [];
  let esValido = true;

  controlesObligatorios.forEach((control) => {
    if (control && control.value.trim() === "") {
      esValido = false;
      mensajes.push("Todos los campos de texto son obligatorios.");
    }
  });

  if (fechaNacimiento && fechaNacimiento.value !== "") {
    const hoy = new Date();
    const fn = new Date(fechaNacimiento.value);
    if (fn > hoy) {
      esValido = false;
      mensajes.push("La fecha de nacimiento no puede ser mayor que la fecha actual.");
    }
  }

  if (correo && correo.value.trim() !== "" && !esEmailValido(correo.value.trim())) {
    esValido = false;
    mensajes.push("El correo electrónico no tiene un formato válido.");
  }

  if (password && repetirPassword) {
    if (password.value !== repetirPassword.value) {
      esValido = false;
      mensajes.push("La contraseña y la repetición deben ser iguales.");
    }
  }

  let tieneInteres = false;
  intereses.forEach((chk) => {
    if (chk.checked) {
      tieneInteres = true;
    }
  });
  if (!tieneInteres) {
    esValido = false;
    mensajes.push("Debe seleccionar al menos un interés.");
  }

  if (cmbCarrera && (cmbCarrera.value === "" || cmbCarrera.value === "0")) {
    esValido = false;
    mensajes.push("Debe seleccionar una carrera.");
  }

  if (cmbPais && (cmbPais.value === "" || cmbPais.value === "0")) {
    esValido = false;
    mensajes.push("Debe seleccionar un país de origen.");
  }

  if (!esValido) {
    alert(mensajes.join("\n"));
    return;
  }

  while (bodyModal.firstChild) {
    bodyModal.removeChild(bodyModal.firstChild);
  }

  const tabla = document.createElement("table");
  tabla.className = "table table-striped table-bordered";

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const encabezados = [
    "Nombre completo",
    "Fecha nacimiento",
    "Correo",
    "Carrera",
    "País",
    "Intereses"
  ];

  encabezados.forEach((texto) => {
    const th = document.createElement("th");
    th.textContent = texto;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  const trBody = document.createElement("tr");

  const nombreCompleto = `${nombre.value} ${apellido.value}`;
  const interesesSeleccionados = [];
  intereses.forEach((chk) => {
    if (chk.checked) {
      const label = chk.nextElementSibling;
      if (label) {
        interesesSeleccionados.push(label.textContent.trim());
      }
    }
  });

  const datos = [
    nombreCompleto,
    fechaNacimiento.value,
    correo.value,
    cmbCarrera.options[cmbCarrera.selectedIndex].text,
    cmbPais.options[cmbPais.selectedIndex].text,
    interesesSeleccionados.join(", ")
  ];

  datos.forEach((texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    trBody.appendChild(td);
  });

  tbody.appendChild(trBody);
  tabla.appendChild(tbody);

  bodyModal.appendChild(tabla);
  modal.show();
};

button.onclick = (event) => {
  event.preventDefault();
  validarFormulario();
};
