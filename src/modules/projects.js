export default class Project {
    constructor(title, mode) {
        this.title = title;
        this.mode = mode;
        this.tasks = [];
    }

    getMode() {
        return this.mode;
    }
    setMode(mode) {
        this.mode = mode;
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
    removeTask(task) {
        this.tasks = this.tasks.filter((Item) => Item !== task);
    }
}

