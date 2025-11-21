const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];
let editIndex = null;

const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";
  editIndex = null;
  inputNombre.focus();
};

const addPaciente = function () {
  const nombre = inputNombre.value;
  const apellido = inputApellido.value;
  const fechaNacimiento = inputFechaNacimiento.value;

  const sexo =
    inputRdMasculino.checked === true
      ? "Hombre"
      : inputRdFemenino.checked === true
      ? "Mujer"
      : "";

  const pais = cmbPais.value;
  const labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  const direccion = inputDireccion.value;

  if (
    nombre !== "" &&
    apellido !== "" &&
    fechaNacimiento !== "" &&
    sexo !== "" &&
    pais !== "0" &&
    direccion !== ""
  ) {
    const paciente = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

    if (editIndex !== null) {
      arrayPaciente[editIndex] = paciente;
      mensaje.innerHTML = "Paciente actualizado correctamente";
    } else {
      arrayPaciente.push(paciente);
      mensaje.innerHTML = "Se ha registrado un nuevo paciente";
    }

    toast.show();
    limpiarForm();
    imprimirPacientes();
  } else {
    mensaje.innerHTML = "Faltan campos por completar";
    toast.show();
  }
};

function imprimirFilas() {
  let fila = "";
  let contador = 1;

  arrayPaciente.forEach((element) => {
    fila += `<tr>
              <td scope="row" class="text-center fw-bold">${contador}</td>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td>${element[2]}</td>
              <td>${element[3]}</td>
              <td>${element[4]}</td>
              <td>${element[5]}</td>
              <td class="text-center">
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary btn-sm" alt="Editar">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger btn-sm" alt="Eliminar">
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>`;
    contador++;
  });

  return fila;
}

const attachRowEvents = () => {
  for (let i = 0; i < arrayPaciente.length; i++) {
    const btnEdit = document.getElementById(`idBtnEditar${i + 1}`);
    const btnDelete = document.getElementById(`idBtnEliminar${i + 1}`);

    if (btnEdit) {
      btnEdit.onclick = () => {
        const [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion] =
          arrayPaciente[i];

        inputNombre.value = nombre;
        inputApellido.value = apellido;
        inputFechaNacimiento.value = fechaNacimiento;

        inputRdMasculino.checked = sexo === "Hombre";
        inputRdFemenino.checked = sexo === "Mujer";

        for (const option of cmbPais.options) {
          if (option.text === labelPais) {
            cmbPais.value = option.value;
            break;
          }
        }

        inputDireccion.value = direccion;
        editIndex = i;
        inputNombre.focus();
      };
    }

    if (btnDelete) {
      btnDelete.onclick = () => {
        arrayPaciente.splice(i, 1);
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
        imprimirPacientes();
      };
    }
  }
};

const imprimirPacientes = () => {
  if (arrayPaciente.length === 0) {
    document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
    return;
  }

  const table = `
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
        <tr>
          <th scope="col" class="text-center" style="width:5%">#</th>
          <th scope="col" class="text-center" style="width:15%">Nombre</th>
          <th scope="col" class="text-center" style="width:15%">Apellido</th>
          <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
          <th scope="col" class="text-center" style="width:10%">Sexo</th>
          <th scope="col" class="text-center" style="width:10%">País</th>
          <th scope="col" class="text-center" style="width:25%">Dirección</th>
          <th scope="col" class="text-center" style="width:10%">Opciones</th>
        </tr>
        ${imprimirFilas()}
      </table>
    </div>`;

  document.getElementById("idTablaPacientes").innerHTML = table;
  attachRowEvents();
};

let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
  const paisNew = inputNombrePais.value;

  if (paisNew !== "") {
    const option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGlobalOption + 1;
    cmbPais.appendChild(option);
    contadorGlobalOption++;

    mensaje.innerHTML = "País agregado correctamente";
    toast.show();
  } else {
    mensaje.innerHTML = "Faltan campos por completar";
    toast.show();
  }
};

buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

limpiarForm();
