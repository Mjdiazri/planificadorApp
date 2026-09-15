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

    render(parentTask, listTask = this.task, functionTask = this.createTaskHtml){
      let htmlItems="";

      for(let taskItem of listTask){
        htmlItems += functionTask.call(this, taskItem)
      }

      parentTask.innerHTML = htmlItems;
    }

    save(){
      const taskJson = JSON.stringify(this.task);
      localStorage.setItem('task', taskJson);

      const currentId = String(this.currentId);
      localStorage.setItem('currentId', currentId);      
    }

    load(){
      const taskJson = localStorage.getItem('task')
      if(taskJson){
        this.task = JSON.parse(taskJson);
      }

      const currentId = localStorage.getItem('currentId')
      if(currentId){
        this.currentId = Number(currentId)
      }
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

    actualizarTask(id, estado){
      for (let task of this.task) {
            if(task.id === id){
                task.status = estado 
            } 
        }     
    }

    filtrarTask(tipoFiltro){
      let filterTask = [];
      let fechaHoy = new Date().toISOString().split("T")[0]

      switch(tipoFiltro){    
        case 'priorizadas':
          filterTask = this.task.filter(t => t.prioritize);
          break;  
        case 'pendientes':
          filterTask = this.task.filter(t => t.status == 'Pendiente');
          break; 
        case 'completadas':
          filterTask = this.task.filter(t => t.status == 'Completada');
          break;
        case 'vencidas':
          filterTask = this.task.filter(t => t.dueDate < fechaHoy && t.status !== 'Completada');
          break; 
        case 'proximas':
          let fechaPivote = new Date()
          fechaPivote.setDate(fechaPivote.getDate()+15);
          let limiteFecha = fechaPivote.toISOString().split("T")[0];

          filterTask = this.task.filter(t => t.status === 'Pendiente' && t.dueDate > fechaHoy && t.dueDate < limiteFecha)
          filterTask.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
          break;
        case 'todas':
        default:
          filterTask = this.task;
          break;
      }

      return filterTask;
    }

    createPriorTaskHtml(tarea){
      const lineTask = `
        <li class="list-group-item d-flex justify-content-between align-items-center  item-priorizada" data-task-id="${tarea.id}">
        ${tarea.name}
          <div class="div-btn-priorizada">
            <button type="button"  data-tipo="done" class="btn btn-outline-success btn-priorizadas-list"> ✔ 
            </button>
            <button type="button" data-tipo="eliminar" class="btn btn-outline-danger btn-priorizadas-list">❌
            </button>
          </div>                                                                     
        </li>`

      return lineTask  
    }

    createTaskHtml(tarea){
        const estadoClass = tarea.status ==="Completada" ? 'done-task' : 'pendiente-task';
        const cardTask = `
         <div class="tarjeta-div-card ${estadoClass}" data-task-id="${tarea.id}">
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
