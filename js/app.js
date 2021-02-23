function campoRequerido(input) {
    // This toma todo el elemento que estoy utilizando
    console.log("perdi foco y estoy en la funcion campo requerido")
        // let input = document.getElementById(`nombre`);
        // trim() quita espacios vacios al principio
    if (input.value.trim() === "") {
        // if (input.value.length > 0){
        // classname sobreescribe, asi que hay que mantener todas las clases que uno quiera y agregar las nuevas
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

// ----- EXPRESIONES REGULARES -------
//-------Validar email------------
function validarEmail(email) {
    // en la variable "expresion" crea patron para validar email
    //w permite mayusculas y minusculas y del 0 al 9 
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    // expresion.test(email.value) es V o F  indica su hay texto escrito
    if (email.value.trim() != "" && expresion.test(email.value)) {
        email.className = "form-control is-valid";
        return true;
    } else {
        email.className = "form-control is-invalid";
        return false;
    }
}
//--- validar campos numericos
function validarNumeros(numeros) {
    if (numeros.value.trim() != "" && !isNaN(numeros.value)) {
        // isNaN("hola") = true
        // isNaN("1234")= false
        // ! not    !true=false  !false=true
        // !isNaN("hola") = false
        // !isNaN("1234")= true
        numeros.className = "form-control is-valid";
        return true;
    } else {
        numeros.className = "form-control is-invalid";
        return false;
    }
}

//--- Validar TEXTAREA: que no este vacio y ademas haya ingresado al menos 10 caracteres ------
function validarConsulta(consulta) {
    if (consulta.value.trim() != "" && consulta.value.length >= 10) {
        consulta.className = "form-control is-valid";
        return true;
    } else {
        consulta.className = "form-control is-invalid";
        return false;
    }
}

// OTRA FORMA DE VALIDAR DESDE JS: Agregar eventos desde JS
// trae la etiqueta completa del checkbox a una variable global "checkTerminos"
let checkTerminos = document.getElementById("terminos");

// se llama a funcion validarTerminos sin parentesis
// cuando se ejecute el evento change, llamar a funcion validarTerminos
checkTerminos.addEventListener("change", validarTerminos);

function validarTerminos() {
    console.log(checkTerminos);
    // si checked es true
    if (checkTerminos.checked) {
        checkTerminos.className = "form-check-input is-valid";
        return true;
    } else {
        checkTerminos.className = "form-check-input is-invalid";
        return false;
    }
}
//---------------------------------------------FIN OTRA FORMA DE VALIDAR
// --- FUNCION ANONIMA: solo se ejecuta cuando se ejecuta en evento CHANGE (en este caso) -----
// checkTerminos.addEventListener("change", function () {
//     console.log("desde validarTerminos")
// });

// --- FUNCION FLECHA (Anonima xq no tiene nombre)----
// checkTerminos.addEventListener("change", () => {
//     console.log("desde validarTerminos")
// });

// la palabra event puede ser cualquiera
function validarGeneral(event) {
    // detener el evento submit para hacer funciones antes de enviar
    event.preventDefault();
    console.log(event);
    // llama a las funciones xa validar datos
    if (campoRequerido(document.getElementById("nombre")) &&
        validarEmail(document.getElementById("email")) &&
        validarNumeros(document.getElementById("telefono")) &&
        validarConsulta(document.getElementById("consulta")) &&
        validarTerminos()) {
        // debo mandar el mail
        enviarEmail();
    } else {
        // debo mostrar error y no mandar mail
        alert("Datos Incorrectos");
    }
}

// Se usa emailJS y se trae el formato del objeto para completar con los valores de los input
function enviarEmail() {
    console.log("desde la funcion enviar email");
    emailjs.send("service_w1eakad", "template_fc83dr5", {
        from_name: document.getElementById("nombre").value,
        to_name: "Administrador del sitio",
        email: document.getElementById("email").value,
        consulta: document.getElementById("consulta").value,
        telefono: document.getElementById("telefono").value
    }).then(function(response) {
        // se ejecuta cuando todo salio bien (se cumplio la promesa)
        // console.log(response);
        document.getElementById("mensaje").innerHTML += `<div class="alert alert-success alert-dismissible fade show text-center mt-3" role="alert">
        Tu solicitud fue enviada correctamente.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        limpiarForm();
    }, function(error) {
        //se ejecuta cuando algo salio mal al enviar el email
        // console.log(error);
        document.getElementById("mensaje").innerHTML += `<div class="alert alert-success alert-dismissible fade show text-center mt-3" role="alert">
        Ocurrió un error. Inténtelo en unos minutos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    })
}

function limpiarForm() {
    document.getElementById("formSuscripcion").reset();
    document.getElementById("nombre").className = "form-control";
    document.getElementById("email").className = "form-control";
    document.getElementById("telefono").className = "form-control";
    document.getElementById("consulta").className = "form-control";
}