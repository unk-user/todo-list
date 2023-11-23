import { parse , isToday, isThisWeek} from 'date-fns'

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
    pushTasks(tasks){
        this.tasks.push(...tasks);
    }
    getTodayTasks(){
        return this.tasks.filter((task) => {
            let parsedDate = parse(task.getDate(), 'yyyy-MM-dd', new Date());
            return isToday(parsedDate);
        })
    }
    getWeekTasks(){
        return this.tasks.filter((task) => {
            let parsedDate = parse(task.getDate(), 'yyyy-MM-dd', new Date());
            return isThisWeek(parsedDate);
        })
    }
}

