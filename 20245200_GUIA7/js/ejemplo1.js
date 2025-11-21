const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const vericarTipoElemento = function () {
  const elemento = cmbElemento.value;
  if (elemento !== "") {
    modal.show();
  } else {
    alert("Debe seleccionar el elemento que se creará");
  }
};

const newSelect = function () {
  const addElemento = document.createElement("select");
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("class", "form-select");

  for (let i = 1; i <= 10; i++) {
    const addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Opción ${i}`;
    addElemento.appendChild(addOption);
  }

  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  labelElemento.textContent = tituloElemento.value;

  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating");
  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
  const addElemento = document.createElement("input");
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);
  addElemento.setAttribute("class", "form-check-input");

  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  labelElemento.textContent = tituloElemento.value;

  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-check");
  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
  const addElemento =
    newElemento === "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

  addElemento.setAttribute("id", `id${nombreElemento.value}`);

  if (newElemento !== "textarea") {
    addElemento.setAttribute("type", newElemento);
  }

  addElemento.setAttribute("class", "form-control");
  addElemento.setAttribute("placeholder", tituloElemento.value);

  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);

  const iconLabel = document.createElement("i");
  iconLabel.setAttribute("class", "bi bi-tag");

  labelElemento.textContent = tituloElemento.value;
  labelElemento.insertAdjacentElement("afterbegin", iconLabel);

  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating mb-3");
  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

const validarIdUnico = function () {
  const nuevoId = `id${nombreElemento.value}`;
  const existente = document.getElementById(nuevoId);
  return !existente;
};

const validarNuevosControles = function () {
  const elementos = newForm.elements;
  let esValido = true;

  for (let i = 0; i < elementos.length; i++) {
    const control = elementos[i];
    const tipo = control.type;
    const tag = control.nodeName;

    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      if (
        tipo === "text" ||
        tipo === "number" ||
        tipo === "date" ||
        tipo === "email" ||
        tipo === "color" ||
        tag === "TEXTAREA"
      ) {
        if (control.value.trim() === "") {
          control.classList.add("is-invalid");
          esValido = false;
        } else {
          control.classList.remove("is-invalid");
        }
      } else if (tipo === "radio" || tipo === "checkbox") {
        if (!control.checked) {
          control.classList.add("is-invalid");
          esValido = false;
        } else {
          control.classList.remove("is-invalid");
        }
      } else if (tag === "SELECT") {
        if (control.value === "" || control.value === "0") {
          control.classList.add("is-invalid");
          esValido = false;
        } else {
          control.classList.remove("is-invalid");
        }
      }
    }
  }

  if (esValido) {
    alert("Todos los controles nuevos son válidos.");
  } else {
    alert("Hay controles vacíos o sin seleccionar.");
  }
};

buttonCrear.onclick = () => {
  vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
  if (nombreElemento.value !== "" && tituloElemento.value !== "") {
    if (!validarIdUnico()) {
      alert("Ya existe un control con ese ID. No se permiten controles con el mismo ID.");
      return;
    }

    const elemento = cmbElemento.value;

    if (elemento === "select") {
      newSelect();
    } else if (elemento === "radio" || elemento === "checkbox") {
      newRadioCheckbox(elemento);
    } else {
      newInput(elemento);
    }
  } else {
    alert("Faltan campos por completar");
  }
};

buttonValidar.onclick = () => {
  validarNuevosControles();
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
  tituloElemento.value = "";
  nombreElemento.value = "";
  tituloElemento.focus();
});
