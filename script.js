const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono")
const numero = document.getElementById("numero");
const email = document.getElementById("email");
const fecha = document.getElementById("fecha")
const hora = document.getElementById("hora")
const zona = document.getElementById("zona")
const comentarios = document.getElementById("comentarios")

const msgNombre=document.getElementById("msgNombre")
const msgTelefono=document.getElementById("msgTelefono")
const msgNumero = document.getElementById("msgNumero")
const msgEmail=document.getElementById("msgEmail")
const msgFecha = document.getElementById("msgFecha")
const msgHora=document.getElementById("msgHora")
const msgZona=document.getElementById("msgZona")
const msgComentarios=document.getElementById("comentarios")



function validarNombre(){
    n=nombre.value
    if(n.length<=3){
        msgNombre.textContent="El nombre debe contener al menos "
        msgNombre.className="msgError"
        nombre.className="inputError"
        return false
    }

    else{
        msgNombre.textContent=""
        nombre.className="inputOk"
        return true
    }
}

nombre.addEventListener("input",validarNombre)

function validarTelefono(){
    if(isNaN(telefono.value)){
        msgTelefono.textContent="El teléfono no puede contener caracteres alabéticos."
        msgTelefono.className="msgError"
        return false
    }
    telefono.className="inputOk"
    return true
}

telefono.addEventListener("input",validarTelefono)

function validarNumero(){
    if(numero.value<=0 || numero.value>10){
        msgNumero.textContent="El número de personas debe de estar en un rango entre 1 y 10."
        msgNumero.className="msgError"
        return false
    }
    else{
        msgNumero.className="msgOk"
        return true
    }
}

function validarEmail(){
    e=email.value.toLowerCase()
    if(e.contains("@")){
        msgEmail.className="msgOk"
        return true
    }
    else{
        msgEmail.textContent="El email debe contener @."
        msgEmail.className="msgError"
        return false
    }
}