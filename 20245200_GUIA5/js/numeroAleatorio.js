const numeroAleatorio=Math.floor(Math.random()*25)+1;
const numeroIntentos=3;
let intentos=1;
function generarNumeroAleatorio(){
    let mensaje;
    const parrafo=document.querySelector("#idParrafo");
    if (intentos <=numeroIntentos){
        let numero=prompt(
            "¿Qué número se ha generado(Intento"+ intentos + ")?"
        );
    }
    if(numero== numeroAleatorio){
        mensaje=`Es sorprendente, pudiste adivinarlo (${numeroAleatorio}).
        Refresque la page para volver a jugar`;
    } else if(intentos==numeroIntentos){
        mensaje=`Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresque la page para volver a jugar`;


    }else {
        mensaje=`Su numero de intentos ha terminado.
        El numero oculto era: ${numeroAleatorio}. Refresqye la pagina patra volver a jugar`;
    }
    parrafo.innerHTML= mensaje;

    }
