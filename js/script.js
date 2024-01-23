// Tomamos los elementos
var inputTarea = document.getElementById("tarea");
var btn = document.getElementById("agregar");
var listado = document.getElementById("listado");
var cantidad = document.getElementById("cantidad");

// Variable que lleva la cantidad de tareas
var total = 0;

var tareaEditando = null; // Variable para almacenar la tarea que se está editando

// Función para agregar tarea
function agregarTarea() {
    // Controlamos si el campo es vacío
    if (inputTarea.value == "") {
        return;
    }

    // Si hay una tarea en edición, actualizamos su texto
    if (tareaEditando) {
        tareaEditando.textContent = inputTarea.value;
        crearBotones();
        tareaEditando = null; // Limpiamos la tarea en edición
    } else {
        // Tomamos el valor del campo
        var elemento = inputTarea.value;
        var li = document.createElement("li");
        li.textContent = elemento;
        // Agregamos li al listado
        listado.appendChild(li);

        // Incrementamos la cantidad de tareas
        total++;
        cantidad.innerHTML = total;

        // Agregamos boton editar a cada elemento de Li
        var btnEditar = document.createElement("edit");
        btnEditar.textContent = "Editar";
        li.appendChild(btnEditar);

        // Agregamos el botón eliminar a cada elemento Li
        var btnEliminar = document.createElement("span");
        btnEliminar.textContent = "x";
        li.appendChild(btnEliminar);

        // Agregamos la funcionalidad que elimina la tarea del listado
        btnEliminar.onclick = function () {
            li.remove();
            total--;
            cantidad.innerHTML = total;
        }

        //Agregamos la funcionalidad que edita la tarea del listado
        btnEditar.onclick = function () {
            // Al hacer clic en editar, cargamos el texto de la tarea en el input
            inputTarea.value = li.textContent;
            // Marcamos la tarea actual como la tarea en edición
            tareaEditando = li;
        }
    }

    // Limpiamos el campo input
    inputTarea.value = "";
}

//Funcion crear botones de editar y eliminar
function crearBotones(){
     // Agregamos boton editar a cada elemento de Li
     var btnEditar = document.createElement("edit");
     btnEditar.textContent = "Editar";
     li.appendChild(btnEditar);

     // Agregamos el botón eliminar a cada elemento Li
     var btnEliminar = document.createElement("span");
     btnEliminar.textContent = "x";
     li.appendChild(btnEliminar);
}

// Asociamos la función al evento clic del botón y al evento keypress del campo de entrada
btn.onclick = agregarTarea;

inputTarea.addEventListener("keypress", function (event) {
    // Verificamos si la tecla presionada es Enter
    if (event.key === "Enter") {
        agregarTarea();
    }
});
