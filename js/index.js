//INSTANCIA CLASE
const taskManager = new TaskManager();

    //Captura de campos
    const userTitulo = document.querySelector('#inputTitle');
    const userPriorizacion = document.querySelector('#inputPriorizar');
    const userCategoria = document.querySelector('#inputCategoria');
    const userFecha = document.querySelector('#inputFecha');
    const userDescripcion = document.querySelector('#inputDescription');
    const btnSubmit = document.querySelector('#btn-submit');
    const formulario = document.querySelector('#form-tareas');
    const contenedorLista = document.querySelector('.contenedor-lista');
    //Regex validacion
    const regexTexto = /^[a-z0-9ñáéíóúüÁÉÍÓÚÜ¿?¡!.,:;()'"_\s-]{5,}$/i;
    //Variables globales
    const inputs = [userTitulo, userFecha, userDescripcion];

//FORMULARIO

    //Eventos Formulario
    formulario.addEventListener('submit', function(event){
        event.preventDefault();
        let resultadoValidacion = verificarTodo();
        alertaForm(resultadoValidacion);       
    })


//TARJETAS    

    //Eventos botones tarjetas
   contenedorLista.addEventListener('click',(evento) => {
    const btn = evento.target.closest('button');
    if(!btn) return;
    cambiarEstado(btn);
   })


//FUNCIONES

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

    //Funcion verificar y agregar clases
    function verificarTodo(){
        const estados = [];

        //Verificar variables generales
        for (let i = 0; i < inputs.length; i++) {
            let estadoVariable = validarCampo(inputs[i]);
            estados.push(estadoVariable);
            if(estadoVariable){
                agregarClaseOk(inputs[i])
            } else {
                agregarClaseError(inputs[i])
            }
        }

        // Verificar Categoria
        let estadoCategoria = validarCategoria();
        estados.push(estadoCategoria);
        estadoCategoria ? agregarClaseOk(userCategoria) : agregarClaseError(userCategoria);

        return estados;
    }

    //Funcion alertas formulario
    function alertaForm(estados){
         if(estados.every(e => e === true)){
            Swal.fire({
                title: "Datos enviados!",
                icon: "success",
                draggable: true
            });  

            //Task y reinicio
            nuevaTask();
            reinicioForm();
            console.log(taskManager.task)

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor verifica los datos ingresados"
            });
        }
    }

    //Funcion reiniciar Formulario
    function reinicioForm(){
        formulario.reset();
        quitarClase(userCategoria) 
        for (let i = 0; i < inputs.length; i++) {
            quitarClase(inputs[i])     
        }     
    }

    
    //Funcion crear Taskmanager
    function nuevaTask(){
        let name = securityDatos(userTitulo.value);
        let prioritize = userPriorizacion.checked;
        let category = userCategoria.value;
        let dueDate = userFecha.value;
        let description = securityDatos(userDescripcion.value);

        taskManager.addTask(name, prioritize, category, description, dueDate);
        contenedorLista.insertAdjacentHTML('afterbegin',taskManager.createTaskHtml(taskManager))   
    }   

    //Funcion cambio estado tarjeta
    function cambiarEstado(btn){

        const tipo = btn.dataset.tipo
        const tarjeta = btn.closest('.tarjeta-div-card');
        const estadoCard = tarjeta.querySelector('.estado-task-small')

        switch(tipo){
            case 'done':
                tarjeta.classList.replace('pendiente-task', 'done-task');
                estadoCard.textContent = "Completada";
                break;
            case 'pendiente':
                tarjeta.classList.replace('done-task', 'pendiente-task');
                estadoCard.textContent = "Pendiente";
                break;
            case "eliminar":
                tarjeta.remove();
                break;
            default:
                return;
        }
        
    }

    //Funcion seguridad
    function securityDatos(texto) {
    if (!texto) return '';
    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



//TASKMANAGER.JS

