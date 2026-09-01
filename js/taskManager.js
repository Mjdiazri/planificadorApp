class TaskManager{
    
    constructor(currentId = 0){
        this.task = [];
        this.currentId = currentId;
    }

    //Metodos
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

    deleteTask(taskID){
        const newTask = [];
        for (let task of this.task) {
            if(task.id !== taskID){
                newTask.push(task);
            }            
        }

        this.task = newTask;
    }

    createTaskHtml(){
        

    }
}
