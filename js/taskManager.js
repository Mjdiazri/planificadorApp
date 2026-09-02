class TaskManager{
    
    constructor(currentId = 0){
        this.task = [];
        this.currentId = currentId;
    }

    //Metodos
    addTask(name, prioritize, category, description, dueDate, imgCategory) {
        this.currentId ++;
        this.task.push(
            { 
                id: this.currentId,
                name : name,
                prioritize : prioritize,
                description : description,
                category : category,
                dueDate : dueDate,
                status : 'Pendiente',
                imgCategory : imgCategory || "fa-volleyball"
            }
        ) 
    }

    render(parentTask){
      let htmlItems="";

      for(let taskItem of this.task){
        htmlItems += this.createTaskHtml(taskItem)
      }

      parentTask.innerHTML = htmlItems;
    }

    deleteTask(taskID){
        const newTask = [];
        for (let task of this.task) {
            if(task.id !== taskID){
                newTask.push(task);
            }            
        }

        this.task = newTask;
    }

    createTaskHtml(tarea){
        const cardTask = `
         <div class="tarjeta-div-card pendiente-task" data-task-id="${tarea.id}">
            <div class="row card-design g-0">

              <!-- Columna card tarea -->
              <div class="col-12 col-md-8">

                <!-- Columna card imagen y texto -->
                <div class="row g-0 contenedor-img-texto">

                  <div class="col-3 d-flex div-image">
                    <i class="fa-solid ${tarea.imgCategory}"></i>
                  </div>

                  <div class="col-9">
                    <div class="card-body contenedor-texto-card">
                      <p class="parrafo-card-title pt-2 m-0">
                        ${tarea.name}
                      </p>

                      <p class="card-text parrafo-card-texto p-0 m-0">
                        ${tarea.description}
                      </p>

                      <p class="card-text parrafo-card-fecha m-0 p-0">
                        <small class="text-body-secondary">
                          ${tarea.dueDate}
                        </small>
                      </p>

                      <p class="card-text parrafo-card-estado estado-task">
                        <small class="text-body-secondary m-0 p-0 estado-task-small">
                          ${tarea.status || 'Pendiente'}
                        </small>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Columna botones -->
              <div class="col-4 contenedor-padre-btn-lista">

                <!-- Contenedor botones -->
                <div class="btn-contenedor-lista">
                  <!--Done-->
                  <button
                    type="button"
                    class="btn btn-outline-success btn-card-lista-done"
                    data-tipo="done"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Completar"
                  >
                  <i class="fa-solid fa-calendar-check"></i>
                  </button>
                  <!--Pendiente-->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-card-lista-pendiente"
                    data-tipo="pendiente"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Deshacer"
                  >
                  <i class="fa-solid fa-trash-can-arrow-up"></i>
                  </button>
                  <!--Eliminar-->
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-card-lista-eliminar"
                    data-tipo="eliminar"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Eliminar"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>          
            </div>

          </div> 
        `
      return cardTask;  
    }
    
}
