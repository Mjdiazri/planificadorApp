//Validacion formulario

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


//Funciones

    //Funcion validar campos
    function validarCampo(input){
        let campoValue = input.value.trim();
        if(campoValue){
            if(regexTexto.test(campoValue)){
                return true;
            }
        } else{
            return false;
        }
    }

    //Funcion validar categoria 
    function validarCategoria(){
        let campoValue = userCategoria.value.trim();
        return campoValue !== "Seleccionar..." ? true : false;         
    }


//Agregar funcionalidad al boton
formulario.addEventListener('submit', function(event){
    event.preventDefault(); 

    let estadoTitulo = validarCampo(userTitulo);
    console.log(estadoTitulo)
    let estadoDescripcion = validarCampo(userDescripcion);
    let estadoFecha = validarCampo(userFecha)
    let estadoCategoria = validarCategoria();
    console.log(estadoCategoria)

    if(!estadoTitulo || !estadoDescripcion || ! estadoFecha || !estadoCategoria){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Verifica los datos, algunos no estan correctos"
        });
    } else {
        Swal.fire({
            title: "Datos enviados!",
            icon: "success",
            draggable: true
        });  
        formulario.reset()     
    }
})

