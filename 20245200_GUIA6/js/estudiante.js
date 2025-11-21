const formEstudiante = document.getElementById("formEstudiante");

const campos = {
  carnet: document.getElementById("txtCarnet"),
  nombre: document.getElementById("txtNombreCompleto"),
  dui: document.getElementById("txtDui"),
  nit: document.getElementById("txtNit"),
  fecha: document.getElementById("txtFechaNac"),
  correo: document.getElementById("txtCorreo"),
  edad: document.getElementById("txtEdad")
};

const patrones = {
  carnet: /^[A-Za-z]{2}\d{3}$/, // AB001
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/, // solo letras y espacios
  dui: /^\d{8}-\d{1}$/, // ########-#
  nit: /^\d{4}-\d{6}-\d{3}-\d{1}$/, // ####-######-###-#
  fecha: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, // dd/mm/aaaa
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // correo simple
  edad: /^\d+$/ // solo dígitos
};

const validarCampo = (campo, regex) => {
  const valor = campo.value.trim();
  const valido = regex.test(valor);

  campo.classList.remove("is-valid", "is-invalid");
  campo.classList.add(valido ? "is-valid" : "is-invalid");

  return valido;
};

formEstudiante.addEventListener("submit", (e) => {
  e.preventDefault();

  const resultados = [
    validarCampo(campos.carnet, patrones.carnet),
    validarCampo(campos.nombre, patrones.nombre),
    validarCampo(campos.dui, patrones.dui),
    validarCampo(campos.nit, patrones.nit),
    validarCampo(campos.fecha, patrones.fecha),
    validarCampo(campos.correo, patrones.correo),
    validarCampo(campos.edad, patrones.edad)
  ];

  if (resultados.every(Boolean)) {
    alert("Formulario válido. Todos los datos cumplen con el formato requerido.");
  } else {
    alert("Hay campos con formato incorrecto. Revisá los que aparecen en rojo.");
  }
});
