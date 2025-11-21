const campo = document.getElementById("idTxtNumero");

const validarNumero = function (e) {
  const validar = /[0-9]{1}$/;
  const tecla = e.key;
  if (!validar.test(tecla)) e.preventDefault();
};

campo.addEventListener("keypress", validarNumero);

const boton = document.getElementById("idBtnCalcular");

function calcularFactorial(numero) {
  return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

const imprimir = (numero, resultado) => {
  const contenedor = document.getElementById("idDivResultado");
  contenedor.innerHTML = `El factorial de ${numero}! es ${resultado}`;
};

function calcular() {
  const numero = document.getElementById("idTxtNumero").value;
  if (numero !== "") {
    const resultado = calcularFactorial(numero);
    imprimir(numero, resultado);
  } else {
    alert("Debe ingresar un número válido");
  }
}

boton.addEventListener("click", calcular);
