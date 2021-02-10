function campoRequerido(input) {
    // This toma todo el elemento que estoy utilizando
    console.log("perdi foco y estoy en la funcion campo requerido")
        // let input = document.getElementById(`nombre`);
        // trim() quita espacios vacios al principio
    if (input.value.trim() === "") {
        // if (input.value.length > 0){
        // classname sobreescribe, asi que hay que mantener todas las clases que uno quiera y agregar las nuevas
        input.className = "form-control is-invalid"
    } else {
        input.className = "form-control is-valid"
    }
}

// ----- EXPRESIONES REGULARES -------
//Validar email
function validarEmail(email) {
    // en la variable "expresion" crea patron para validar email
    //w permite mayusculas y minusculas y del 0 al 9 
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    // expresion.test(email.value) es V o F  indica su hay texto escrito
    if (email.value.trim() != "" && expresion.test(email.value)) {
        email.className = "form-control is-valid";
    } else {
        email.className = "form-control is-invalid";
    }
}

function validarNumeros(numeros) {
    if (numeros.value.trim() != "" && !isNaN(numeros.value)) {
        // isNaN("hola") = true
        // isNaN("1234")= false
        // ! not    !true=false  !false=true
        // !isNaN("hola") = false
        // !isNaN("1234")= true
        numeros.className = "form-control is-valid";
    } else {
        numeros.className = "form-control is-invalid";
    }

}