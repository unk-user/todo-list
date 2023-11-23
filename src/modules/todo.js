import Project from "./project";
import { parse , isToday, isThisWeek} from 'date-fns'

export default class Todo {
    constructor(){
        this.projects = [];
        this.projects.push(new Project('Inbox', 'default'));
        this.projects.push(new Project('Today', 'default'));
        this.projects.push(new Project('This week', 'default'));
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
    removeProject(project){
        this.projects = this.projects.filter((items) => items !== project);
    }
    containsProject(title){
        return this.project.some((project) => project.getTitle() === title);
    }
    getTodayWeek(){
        let today = this.getProjectByTitle('Today');
        let week = this.getProjectByTitle('This week');
        today.setTasks([]);
        week.setTasks([]);
        this.getProjects().forEach((project) => {
            if(project.getTitle() !== 'Today' && project.getTitle() !== 'This week'){
                today.pushTasks(project.getTodayTasks());
                week.pushTasks(project.getWeekTasks());
            }
        })
    }

    
    removeTaskAll(task) {
        this.getProjects().forEach((project) => {
            project.removeTask(task);
        })
    }
}