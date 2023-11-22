import Task from "./task";
import Project from "./project";
import Todo from "./todo";

export default class Storage {
    static saveTodoList(todoL){
        localStorage.setItem('todolist', JSON.stringify(todoL));
    }
    static getTodoList(){ 
        const todoList = Object.assign(
            new Todo(),
            JSON.parse(localStorage.getItem('todolist'))
        )

        
        todoList.setProjects(
            todoList.getProjects().map((project) => Object.assign(new Project, project))
        );


        todoList.getProjects().forEach((project) => {
            project.setTasks(
                project.getTasks().map((task) => Object.assign(new Task, task))
            );
        })

        return todoList;
    }
}