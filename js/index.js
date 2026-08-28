//Importar  clase
const TaskManager = require('./taskManager.js')

//FORMULARIO
//Validacion formulario
/*
    //Captura de campos
    const userTitulo = document.querySelector('#inputTitle');
    const userPriorizacion = document.querySelector('#inputPriorizar');
    const userCategoria = document.querySelector('#inputCategoria');
    const userFecha = document.querySelector('#inputFecha');
    const userDescripcion = document.querySelector('#inputDescription');
    const btnSubmit = document.querySelector('#btm-submit');
    const formulario = document.querySelector('#form-tareas');
    //Regex validacion
    const regexTexto = /^[a-z0-9ñáéíóúüÁÉÍÓÚÜ¿?¡!.,:;()'"_\s-]{5,}$/i;
    //Variables globales
    const inputs = [userTitulo, userFecha, userDescripcion];
    const estados = [];


//Funciones

    //Funcion validar campos
    function validarCampo(input){
        let campoValue = input.value.trim();
        return campoValue !== "" && regexTexto.test(campoValue) ? true: false;
    }

    //Funcion validar categoria 
    function validarCategoria(){
        let campoValue = userCategoria.value.trim();
        return campoValue !== "Seleccionar..." ? true : false;         
    }

    //Funcion agregar clases
    function agregarClaseOk(input){
        input.classList.add('okClass');
        input.classList.remove('errorClass');
    } 

    function agregarClaseError(input){
        input.classList.add('errorClass');
        input.classList.remove('okClass');
    }   

    //Funcion quitar clases
    function quitarClase(input){
        input.classList.remove('errorClass');
        input.classList.remove('okClass');
    }


//Agregar funcionalidad al boton
formulario.addEventListener('submit', function(event){
    event.preventDefault(); 

    estados.length= 0;

    //Variables generales
    for (let i = 0; i < inputs.length; i++) {
        let estadoVariable = validarCampo(inputs[i]);
         estados.push(estadoVariable);
          console.log(inputs[i].value)
        if(estadoVariable){
            agregarClaseOk(inputs[i])
        } else {
            agregarClaseError(inputs[i])
        }
    }

    //Categoria
    let estadoCategoria = validarCategoria();
    estados.push(estadoCategoria);
    console.log(userCategoria.value);
    estadoCategoria ? agregarClaseOk(userCategoria) : agregarClaseError(userCategoria);

    
    //Check priorizacion
    let estadoPriorizada = userPriorizacion.checked;
    console.log(estadoPriorizada);

    //alertas
    if(estados.every(e => e === true)){
        Swal.fire({
            title: "Datos enviados!",
            icon: "success",
            draggable: true
        });  
        formulario.reset(); 
        for (let i = 0; i < inputs.length; i++) {
            quitarClase(inputs[i])     
            quitarClase(userCategoria)     
        }      
    } else {
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor verifica los datos ingresados"
        });
    }
})

//TARJETAS
//Captura de botones
    const contenedorLista = document.querySelector('.contenedor-lista');

//Agregar funcionalidad al boton
   contenedorLista.addEventListener('click',(evento) => {
    const btn = evento.target.closest('button');
  
    if(!btn) return;

    const tipo = btn.dataset.tipo
    const tarjeta = btn.closest('.tarjeta-div-card');
    const estadoCard = tarjeta.querySelector('.estado-task-small')


    if(tipo === 'done'){
        tarjeta.classList.replace('pendiente-task', 'done-task');
        estadoCard.textContent = "Completada";
    } else if (tipo === 'pendiente'){
        tarjeta.classList.replace('done-task', 'pendiente-task');
        estadoCard.textContent = "Pendiente";
    } else if (tipo === 'eliminar'){
        tarjeta.remove();
    } else {
        return;
    }
        
   })


   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        

*/
//TASKMANAGER.JS
//Validar enlace con archivo
const taskManager = new TaskManager();
console.log(taskManager.task);

taskManager.addTask(
    "Adelantar talleres",
    "Adelanter taller clase JPA de agosto 28",
    "2026-31-09",
    "Pendiente"
);


taskManager.addTask(
    "Canotaje",
    "Llevar a la niña a practica de canotaje Simon Bolivar",
    "2026-08-29",
    "Pendiente"
);


console.log(taskManager.task)
