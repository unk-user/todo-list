export default class Task {
    constructor(title, description, dueDate, priority) {
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