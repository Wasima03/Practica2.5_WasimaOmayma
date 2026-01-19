/*Hacemos la referencia a nuestros elementos*/
var formulario = document.getElementById("formularioPerfil");
var modal = document.getElementById("modal");
var contenidoModal = document.getElementById("contenidoModal");
var mensajes = document.getElementById("mensajes");

var botonGuardar = document.getElementById("guardarDatos");
var botonRestaurar = document.getElementById("restaurarDatos");
var botonRecargar = document.getElementById("recargarPagina");

// Quiero que al cargar la página, el botón restaurar aparezca desactivado
botonRestaurar.disabled = true;

// Mostramos el mensaje de error
function mostrarError(campo, texto) {
    campo.style.border = "2px solid red";
    var mensaje = document.createElement("div");
    mensaje.style.color = "red";
    mensaje.style.fontSize = "13px";
    mensaje.className = "mensaje-error";
    mensaje.innerText = texto;
    // Solo agregar si no hay ya
    if (campo.parentNode.querySelector(".mensaje-error") == null) {
        campo.parentNode.appendChild(mensaje);
    }
}

// Limpiamos el error
function limpiarError(campo) {
    campo.style.border = "";
    var mensaje = campo.parentNode.querySelector(".mensaje-error");
    if (mensaje != null) {
        campo.parentNode.removeChild(mensaje);
    }
}

// Validamos el email
function correoValido(correo) {
    if (correo.indexOf("@") > -1 && correo.indexOf(".") > -1) {
        return true;
    } else {
        return false;
    }
}

/*Hacemos las validaciones necesarias*/
formulario.nombre.addEventListener("input", function() {
    if (formulario.nombre.value.length < 3) {
        mostrarError(formulario.nombre, "Mínimo 3 caracteres");
    } else {
        limpiarError(formulario.nombre);
    }
});

formulario.experiencia.addEventListener("change", function() {
    if (formulario.experiencia.value < 0 || formulario.experiencia.value > 60) {
        mostrarError(formulario.experiencia, "Valor no válido");
    } else {
        limpiarError(formulario.experiencia);
    }
});

/*Enviamos el formulario*/
formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    mensajes.innerHTML = "";

    var nombre = formulario.nombre.value;
    var experiencia = formulario.experiencia.value;
    var correo = formulario.correo.value;
    var contexto = formulario.contexto.value;
    var formaActuar = formulario.formaActuar.value;

    // Marcamos las habilidades
    var checkboxes = document.getElementsByName("habilidades");
    var habilidades = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            habilidades.push(checkboxes[i].value);
        }
    }
});

 formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    mensajes.innerHTML = "";

    var correcto = true;

    // NOMBRE
    if (formulario.nombre.value.length < 3) {
        mostrarError(formulario.nombre, "Mínimo 3 caracteres");
        correcto = false;
    } else {
        limpiarError(formulario.nombre);
    }

    // EXPERIENCIA
    if (formulario.experiencia.value < 0 || formulario.experiencia.value > 60) {
        mostrarError(formulario.experiencia, "Valor entre 0 y 60");
        correcto = false;
    } else {
        limpiarError(formulario.experiencia);
    }

    // CORREO
    if (!correoValido(formulario.correo.value)) {
        mostrarError(formulario.correo, "Correo no válido");
        correcto = false;
    } else {
        limpiarError(formulario.correo);
    }

    // CONTEXTO
    if (formulario.contexto.value === "") {
        mostrarError(formulario.contexto, "Selecciona un contexto");
        correcto = false;
    } else {
        limpiarError(formulario.contexto);
    }

    // HABILIDADES (checkbox)



    var checkboxes = document.getElementsByName("habilidades");
    var habilidades = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            habilidades.push(checkboxes[i].value);
        }
    }

    var grupoHabilidades = document.getElementById("grupo-habilidades");

    if (habilidades.length === 0) {
        mostrarError(grupoHabilidades, "Selecciona al menos una habilidad");
        correcto = false;
    } else {
        limpiarError(grupoHabilidades);
    }



    // SI HAY ERRORES, NO MOSTRAMOS RESULTADO
    if (!correcto) {
        return;
    }

    // SI TODO ESTÁ BIEN → MOSTRAR RESULTADO
    var perfil = calcularPerfilSimple(
        formulario.contexto.value,
        habilidades,
        formulario.experiencia.value
    );

    mostrarResultado(
        formulario.nombre.value,
        perfil,
        habilidades,
        formulario.formaActuar.value
    );
});

/*Calculamos el perfil de manera detallada*/
function calcularPerfilSimple(contexto, habilidades, experiencia) {
    var puntosAnalitico = 0;
    var puntosEjecutor = 0;
    var puntosCoordinador = 0;
    var puntosCreativo = 0;

    if (contexto == "analisis") puntosAnalitico += 2;
    if (contexto == "ejecucion") puntosEjecutor += 2;
    if (contexto == "coordinacion") puntosCoordinador += 2;
    if (contexto == "creatividad") puntosCreativo += 2;

    // Depende de las habilidades escogidas:*/
    for (var i = 0; i < habilidades.length; i++) {
        if (habilidades[i] == "Organización") {
            puntosAnalitico += 1;
            puntosCoordinador += 1;
        }
        if (habilidades[i] == "Comunicación") {
            puntosCoordinador += 1;
        }
        if (habilidades[i] == "Resolución de problemas") {
            puntosEjecutor += 1;
            puntosAnalitico += 1;
        }
        if (habilidades[i] == "Pensamiento crítico") {
            puntosAnalitico += 1;
        }
    }

    // Los puntos según la experiencia
    if (experiencia >= 5) puntosCoordinador += 1;
    if (experiencia >= 10) puntosAnalitico += 1;

    // Comparamos esos puntos
    var max = puntosAnalitico;
    var perfil = "analitico";

    if (puntosEjecutor > max) {
        max = puntosEjecutor;
        perfil = "ejecutor";
    }
    if (puntosCoordinador > max) {
        max = puntosCoordinador;
        perfil = "coordinador";
    }
    if (puntosCreativo > max) {
        max = puntosCreativo;
        perfil = "creativo";
    }

    return perfil;
}

/*Mostramos el resultado en un modal*/
function mostrarResultado(nombre, perfil, habilidades, formaActuar) {
    var textosPerfil = {
        analitico: "Perfil Analítico: Analizas y planificas muy bien.",
        ejecutor: "Perfil Ejecutor: Actúas rápido y resuelves problemas.",
        coordinador: "Perfil Coordinador: Organizas personas y recursos.",
        creativo: "Perfil Creativo: Aportas ideas nuevas y diferentes."
    };

    contenidoModal.innerHTML = "";

    var titulo = document.createElement("h2");
    titulo.innerText = "Resultado del Test";
    contenidoModal.appendChild(titulo);

    var nombreElem = document.createElement("p");
    nombreElem.innerText = "Nombre: " + nombre;
    contenidoModal.appendChild(nombreElem);

    var perfilElem = document.createElement("p");
    perfilElem.innerText = textosPerfil[perfil];
    contenidoModal.appendChild(perfilElem);

    var habilidadesElem = document.createElement("p");
    habilidadesElem.innerText = "Habilidades: " + habilidades.join(", ");
    contenidoModal.appendChild(habilidadesElem);

    var formaElem = document.createElement("p");
    formaElem.innerText = "Cómo actúa: " + formaActuar;
    contenidoModal.appendChild(formaElem);

    var botonCerrar = document.createElement("button");
    botonCerrar.innerText = "Cerrar";
    contenidoModal.appendChild(botonCerrar);

    modal.style.display = "flex";

    botonCerrar.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

/*Guardamos los datos en nuestro localStorage*/
botonGuardar.addEventListener("click", function() {
    var checkboxes = document.getElementsByName("habilidades");
    var habilidades = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            habilidades.push(checkboxes[i].value);
        }
    }

    var datos = {
        nombre: formulario.nombre.value,
        experiencia: formulario.experiencia.value,
        correo: formulario.correo.value,
        contexto: formulario.contexto.value,
        formaActuar: formulario.formaActuar.value,
        habilidades: habilidades
    };

    localStorage.setItem("datosPerfil", JSON.stringify(datos));
    botonRestaurar.disabled = false;
});

// Restauramos los datos en caso de que los necesitemos de nuevo
botonRestaurar.addEventListener("click", function() {
    var datosGuardados = localStorage.getItem("datosPerfil");
    if (datosGuardados == null) {
        alert("No hay datos guardados");
        return;
    }

    var datos = JSON.parse(datosGuardados);

    formulario.nombre.value = datos.nombre;
    formulario.experiencia.value = datos.experiencia;
    formulario.correo.value = datos.correo;
    formulario.contexto.value = datos.contexto;
    formulario.formaActuar.value = datos.formaActuar;

    var checkboxes = document.getElementsByName("habilidades");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        for (var j = 0; j < datos.habilidades.length; j++) {
            if (checkboxes[i].value == datos.habilidades[j]) {
                checkboxes[i].checked = true;
            }
        }
    }
});

// Finalmente, recargamos la página
botonRecargar.addEventListener("click", function() {
    location.reload();
});
