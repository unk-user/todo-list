import Task from "./task";
import Project from "./project";
import Storage from "./storage";
import Todo from "./todo";
import { parse, format } from 'date-fns';


let todo = (function() {
    let todo;
    if(typeof(localStorage.getItem('todolist')) == 'undefined'){
        todo = new Todo();
    } else {
        todo = Storage.getTodoList();
    }
    return todo;
})();


export default class UI {
    
    static refreshNav() {
        const previewUser = document.querySelector('#userProjects');
        let lastButtons = document.querySelectorAll('.user');
        lastButtons.forEach((button) => button.remove());
        
        
        todo.getProjects().forEach((project) => {
            let projectPreview = document.createElement('button');
            
            projectPreview.setAttribute('id', `${project.getTitle()}Btn`);
            projectPreview.classList += 'navBtn link user';
            projectPreview.textContent = `${project.getTitle()}`;
    
            if(project.getMode() === 'user'){
                let removeBtn = document.createElement('div');
                removeBtn.className = 'removeProject';
                removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
                projectPreview.appendChild(removeBtn);
                this.projectEventListeners(projectPreview, project, removeBtn);
                previewUser.appendChild(projectPreview);
            }
        })
    }
    static loadNavItems() {
        const previewDefault = document.querySelector('#defaultProjects');
        const previewUser = document.querySelector('#userProjects');

        todo.getProjects().forEach((project) => {
            let projectPreview = document.createElement('button');
            
            projectPreview.setAttribute('id', `${project.getTitle()}Btn`);
            projectPreview.classList += 'navBtn link';
            projectPreview.textContent = `${project.getTitle()}`;
    
            if(project.getMode() === 'default'){
                previewDefault.appendChild(projectPreview);
                this.projectEventListeners(projectPreview, project, 'none');
            } else {
                let removeBtn = document.createElement('div');
                removeBtn.className = 'removeProject';
                projectPreview.classList += ' user';
                removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
                projectPreview.appendChild(removeBtn);
                this.projectEventListeners(projectPreview, project, removeBtn);
                previewUser.appendChild(projectPreview);
            }
        })
    }

    static projectEventListeners(projectPreview, project, removeBtn) {

        projectPreview.addEventListener('click', () => {
            this.setActiveNav(projectPreview);
            this.loadTasks(project);
        })
        if(removeBtn !== 'none'){
            removeBtn.addEventListener('mousedown', () => {
                this.setActiveNav(document.querySelector('#InboxBtn'));
                this.deleteProject(project);
                this.loadTasks(todo.getProjectByTitle('Inbox'));
            });
        }
    }
    static setActiveNav(projectP) {
        document.querySelectorAll('.link').forEach((btn) => {
            let classStr = JSON.stringify(btn.classList);
            if(classStr.includes('activeNav') && classStr.includes('user')){
                btn.classList = 'navBtn link user';
            } else if(classStr.includes('activeNav')){
                btn.classList = 'navBtn link';
            };
        })
        projectP.classList += ' activeNav';
        document.querySelector('#title').textContent = projectP.textContent;
        
    }

    static TasksListeners(project) {
        let taskDivs = document.querySelectorAll('.task');
        taskDivs.forEach((taskDiv) => {
            let right = taskDiv.lastChild;
            right.querySelector('#removeBtn').addEventListener('click', () => {
                this.removeTaskDiv(project, project.getTaskByTitle(`${taskDiv.id}`));
            });
        })
    }
    static modifyTaskListener(project, task, taskDiv){
        taskDiv.lastChild.querySelector('#modifyBtn').addEventListener('click', () => {
            this.openTaskEditor();
            this.taskEditorModify(project, task)
        })
    }
    static removeTaskDiv(project, task) {
        if(project.getTitle() === 'Today' || project.getTitle() === 'This week'){
            todo.removeTaskAll(task)
        }
        project.removeTask(task);
        this.loadTasks(project);
        Storage.saveTodoList(todo);
    }
    static loadTasks(project) {
        if(project.getTitle() !== 'Today' && project.getTitle() !== 'This week'){document.querySelector('#tasksContainer').innerHTML = '<div id="addTask"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add task</div>'}
        else {document.querySelector('#tasksContainer').innerHTML = ''}
        project.getTasks().forEach((task) => {
            let taskDiv = document.createElement('div');
            taskDiv.setAttribute('id', `${task.getTitle()}`);
            taskDiv.classList += 'task';
            taskDiv.innerHTML = `
                <div class="taskLeft">
                    <p>${task.getTitle()}</p>
                    <p id="description">${task.getDesc()}</p>
                </div>
                <div class="taskRight">
                    <p class="task-date">${this.formatDate(task)}</p>
                    <p class="task-priority">${task.getPrio()}</p>
                    <button id="modifyBtn" class="taskBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
                    <button id="removeBtn" class="taskBtn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                </div>`;
            document.querySelector('#tasksContainer').appendChild(taskDiv);
            if(project.getTitle() === 'Today' || project.getTitle() === 'This week') {
                taskDiv.querySelector('#modifyBtn').textContent = '';
            } else {
                this.modifyTaskListener(project, task, taskDiv);
            }
        });
        this.TasksListeners(project);
        this.addTaskListener(project);
        todo.getTodayWeek();
        Storage.saveTodoList(todo);
    }

    static deleteProject(project) {
        todo.removeProject(project);
        document.querySelector(`#${project.getTitle()}Btn`).remove();
        Storage.saveTodoList(todo);
    }

    static loadUi() {
        todo.getTodayWeek();
        this.loadNavItems();
        this.loadTasks(todo.getProjectByTitle('Inbox'));
        this.openNewProjectL();
    }

    static openNewProjectL() {
        const addBtn = document.querySelector('#addProject');
        const previewUser = document.querySelector('#userProjects');

        addBtn.addEventListener('click', () => {
            if(document.querySelector('#newProjectCard')){
                return 
            }
            let newProjectCard = document.createElement('div');
            newProjectCard.setAttribute('id', 'newProjectCard');
            
            const input = document.createElement('input');
            input.setAttribute('id', 'newProjectTitle');
            input.setAttribute('type', 'name');
            input.setAttribute('placeholder', 'Project Title');
            newProjectCard.appendChild(input);
            const newProjectAction = document.createElement('div');
            newProjectAction.setAttribute('id', 'newProjectAction');
            const saveNewProject = document.createElement('button');
            const cancelNewProject = document.createElement('button');
            saveNewProject.setAttribute('id', 'saveNewProject');
            saveNewProject.textContent = 'Save';
            cancelNewProject.setAttribute('id', 'cancelNewProject');
            cancelNewProject.textContent = 'Cancel';
 
            newProjectAction.appendChild(saveNewProject);
            newProjectAction.appendChild(cancelNewProject);
            newProjectCard.appendChild(newProjectAction);

            saveNewProject.addEventListener('click', () => {
                if(input.value !== ''){
                    let newProject = new Project(input.value, 'user');
                    todo.addProject(newProject);
                    Storage.saveTodoList(todo);
                    this.closeNewProjectL();
                }
            });
            newProjectCard.addEventListener('keyup', (e) => {
                if(input.value !== '' && e.key === 'Enter'){
                    let newProject = new Project(input.value, 'user');
                    todo.addProject(newProject);
                    Storage.saveTodoList(todo);
                    this.closeNewProjectL();
                }
            });
            cancelNewProject.addEventListener('click', () => {
                this.closeNewProjectL()
            })

            previewUser.appendChild(newProjectCard);
            input.focus();
            
        });
    }

    static closeNewProjectL() {
        document.querySelector('#newProjectTitle').value = '';
        document.querySelector('#newProjectCard').remove();
        this.refreshNav();
    }

    static openTaskEditor() {
        const taskContainer = document.querySelector('#tasksContainer');

        if(document.querySelector('#newTaskPopUp') === null){
            let taskPopUp = document.createElement('div');
            taskPopUp.setAttribute('id', 'newTaskPopUp');
            taskPopUp.innerHTML = `
                <input type="name" placeholder="Task Name" class="text-input" id="newName">
                <input type="text" placeholder="description" class="text-input" id="newDesc">
                <div id="date-priority">
                    <input type="date" class="nonText-input" id="newDate">
                    <label for="newPriority">Priority</label>
                    <select name="" id="newPriority" class="nonText-input">
                    <option value="priority 1">priority 1</option>
                    <option value="priority 2">priority 2</option>
                    <option value="priority 3">priority 3</option>
                    <option value="priority 4">priority 4</option>
                    </select>
                    <button id="saveTask" class="taskAction">Save</button>
                    <button id="cancelTask" class="taskAction">Cancel</button>
                </div>`


            taskContainer.innerHTML = '<div id="addTask"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add task</div>';
            taskContainer.appendChild(taskPopUp);
            document.querySelector('#newName').focus();
        }
    }
    static closeAddTask(Project) {
        const popUp = document.querySelector('#newTaskPopUp');

        if(popUp !== 'null'){
            popUp.remove();
            this.loadTasks(Project);
        }
    }

    static saveNewTask(Project) {
        let name = document.querySelector('#newName').value;
        let desc = document.querySelector('#newDesc').value;
        let date = document.querySelector('#newDate').value;
        let priority = document.querySelector('#newPriority').value;

        if(name !== '') {
            let newTask = new Task(name, desc, date, priority);
            Project.addTask(newTask);
            Storage.saveTodoList(todo);
        }
    }
    static modifyTask(task) {
        let name = document.querySelector('#newName').value;
        let desc = document.querySelector('#newDesc').value;
        let date = document.querySelector('#newDate').value;
        let priority = document.querySelector('#newPriority').value;
    
        if(name !== '') {
            task.setTitle(name);
        }
        if(desc !== ''){
            task.setDesc(desc);
        }
        if(date !== ''){
            task.setDate(date);
        }
        if(priority !== ''){
            task.setPrio(priority);
        }
        Storage.saveTodoList(todo);
    }
    static taskEditorSaveNew(Project){
        document.querySelector('#saveTask').addEventListener('click', () => {
            this.saveNewTask(Project);
            this.closeAddTask(Project);
        });
        document.querySelector('#newTaskPopUp').addEventListener('keyup', (e) => {
            if(e.key === 'Enter'){
                this.saveNewTask(Project);
                this.closeAddTask(Project);
            }
            else if(e.key === 'Escape'){
                this.closeAddTask(Project);
            }
        });
        document.querySelector('#cancelTask').addEventListener('click', () => {
            this.closeAddTask(Project);
        });
    }
    static taskEditorModify(Project, task){
        document.querySelector('#saveTask').addEventListener('click', () => {
            this.modifyTask(task);
            this.closeAddTask(Project);
        });
        document.querySelector('#newTaskPopUp').addEventListener('keyup', (e) => {
            if(e.key === 'Enter'){
                this.modifyTask(task);
                this.closeAddTask(Project);
            }
            else if(e.key === 'Escape'){
                this.closeAddTask(Project);
            }
        });
        
        document.querySelector('#cancelTask').addEventListener('click', () => {
            this.closeAddTask(Project);
        });
    }
    static addTaskListener(project){
        document.querySelector('#addTask').addEventListener('click', () => {
            this.openTaskEditor();
            this.taskEditorSaveNew(project);
        });
        document.querySelector('#mainSection').addEventListener('keyup', (e) => {
            if(e.key === '+' || e.key === '='){
                this.openTaskEditor();
                this.taskEditorSaveNew(project);
            }
        });
    }
    static formatDate(task) {
        if(task.getDate() !== ''){
            let parsedDate = parse(task.getDate(), 'yyyy-MM-dd', new Date());
            return format(parsedDate, 'MM/dd/yy');
        } else {
            return '';
        }
    }


}





