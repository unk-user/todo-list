//tasks Classes

export default class Task {
    constructor(title, description = 'none', dueDate = 'none', priority = 'none') {
        this.title = title; 
        this.description = description; 
        this.dueDate =new Date(dueDate);
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
        this.dueDate = new Date(newDate);
    }
    getPrio() {
        return this.priority;
    }
    setPrio(newPrio) {
        this.priority = newPrio;
    }
}