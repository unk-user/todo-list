export default class Todo {
    constructor(){
        this.projects = [];
        this.projects.push(new Project('Inbox', 'default'));
        this.projects.push(new Project('Today', 'default'));
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
}