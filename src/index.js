//tasks & projects Classes

class Task {
    constructor(title, description = 'none', dueDate = 'none', priority) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getDesc() {
        return this.description;
    }
    setDesc(newDesc) {
        this.description = newDesc;
    }
    getDate() {
        return this.dueDate;
    }
    setDate(newDate) {
        this.dueDate = newDate;
    }
    getPrio() {
        return this.priority;
    }
    setPrio(newPrio) {
        this.priority = newPrio;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getTaskByTitle(title) {
        return this.tasks.find((task) => task.getTitle() === title);
    }
    getTasks() {
        return this.tasks;
    }
    setTasks(tasks){
        this.tasks = tasks;
    }
    addTask(newTask) {
        this.tasks.push(newTask);
    }
    containsTask(title) {
        return this.tasks.some((task) => task.getTitle() === title);
    }
    removeTask(title) {
        this.tasks = this.tasks.filter((task) => task.getTitle() !== title);
    }
}

//TodoList

class TodoList {
    constructor(){
        this.projects = [];
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('school'));
    }
    getProjectByTitle(title){
        return this.projects.find((project) => project.getTitle() === title);
    }
    addProject(project){
        this.projects.push(project);
    }
    getProjects(){
        return this.projects;
    }
    setProjects(projects){
        this.projects = projects;
    }
    removeProject(title){
        this.projects = this.projects.filter((project) => project.getTitle() !== title);
    }
    containsProject(title){
        return this.project.some((project) => project.getTitle() === title);
    }
}

//localStorage 

class Storage {
    static saveTodoList(todoL){
        localStorage.setItem('todolist', JSON.stringify(todoL));
    }
    static getTodoList(){ 
        const todoList = Object.assign(
            new TodoList(),
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

//navbar 

const navCheck = document.querySelector('#checkbox');
const nav = document.querySelector('nav');

navCheck.addEventListener('click', ()=>{
    const contentSection = document.querySelector('#mainSection');
    if(navCheck.checked){
        nav.style.position = 'relative';
        nav.style.left = '0';
        contentSection.style.width = 'calc(100% - 260px)';
    } else {
        nav.style.position = 'absolute';
        nav.style.left = '-300px';
        contentSection.style.width = '100%';
    }

});


//Main UI




