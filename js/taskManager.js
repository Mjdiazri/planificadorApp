class TaskManager{
    
    constructor(currentId = 0){
        this.task = [];
        this.currentId = currentId;
    }

    //Metodo
    addTask(name, prioritize, category, description, dueDate, status) {
        this.currentId ++;
        this.task.push(
            { 
                id: this.currentId,
                name : name,
                prioritize : prioritize,
                description : description,
                category : category,
                dueDate : dueDate,
                status : status
            }
        )
              
    }

}
