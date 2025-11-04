const numeroSecreto = Math.floor(Math.random() * 25) + 1;
const inputNumero = document.getElementById("idInputNumero");
const btnNumero = document.getElementById("idBtnNumero");
const parrafo = document.getElementById("idParrafo");

btnNumero.addEventListener("click", function() {
    const valorUsuario = parseInt(inputNumero.value);

    if (isNaN(valorUsuario)) {
        parrafo.textContent = "Por favor, ingresa un número válido.";
        return;
    }

    if (valorUsuario === numeroSecreto) {
        parrafo.textContent = "¡Correcto! Adivinaste el número.";
    } else if (valorUsuario < numeroSecreto) {
        parrafo.textContent = "No es ese. El número que buscas es más alto.";
    } else {
        parrafo.textContent = "No es ese. El número que buscas es más bajo.";
    }
});
