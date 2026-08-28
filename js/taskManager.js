class TaskManager{
    
    constructor(currentId = 0){
        this.task = [];
        this.currentId = currentId;
    }

    //Metodo
    addTask(name, description, dueDate, status) {
        this.currentId ++;
        this.task.push(
            { 
                name : name,
                description : description,
                dueDate : dueDate,
                status : status
            }
        )
              
    }

}

module.exports = TaskManager;