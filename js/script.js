const header = document.createElement("header");
const main = document.createElement("main");

document.body.append(header, main);

// Форма создания задачи
const toDoForm = document.createElement("form");
toDoForm.className = "taskForm";
toDoForm.id = "task-form";

const formTitle = document.createElement("h2");
formTitle.textContent = "Создать новую задачу: ";

const formLabelName = document.createElement("label");
formLabelName.textContent = "Имя задачи: ";
formLabelName.htmlFor = "task-form-name";

const formLabelDescription = document.createElement("label");
formLabelDescription.textContent = "Описание задачи: ";
formLabelDescription.htmlFor = "task-form-description";

const formLabelDate = document.createElement("label");
formLabelDate.textContent = "Дата дедлайна: ";
formLabelDate.htmlFor = "task-form-date";

const formInputName = document.createElement("input");
formInputName.type = "text";
formInputName.id = "task-form-name";
formInputName.required = true;


const formInputDescription = document.createElement("textarea");
formInputDescription.id = "task-form-description";

const formInputDate = document.createElement("input");
formInputDate.type = "date";
formInputDate.id = "task-form-date";
formInputDate.required = true;

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Создать";
submitButton.id = "task-form-submit";


toDoForm.append(formTitle);

toDoForm.append(formLabelName);
toDoForm.append(formInputName);

toDoForm.append(formLabelDescription);
toDoForm.append(formInputDescription);

toDoForm.append(formLabelDate);
toDoForm.append(formInputDate);

toDoForm.append(submitButton);



// конец формы

// section
const formSection = document.createElement("section");
formSection.id = "form-section";

const taskSection = document.createElement("section");
taskSection.id = "task-section";


const taskList = document.createElement("ul");
taskList.id = "task-list";

taskSection.append(taskList);

// header
const headerName = document.createElement("h1");
headerName.textContent = "ToDo do be do List";
headerName.id = "header-h1";

const headerText = document.createElement("h2");
headerText.className = "header-description";
headerText.textContent = "Удобный инструмент для управления своими задачами - так, вы ничего не забудете!";
// конец header

// favicon
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "./assets/favicon.ico";

header.append(headerName);
header.append(headerText);

formSection.append(toDoForm);
main.append(formSection);
main.append(taskSection);

document.head.append(favicon);

// добавление задач
let tasks = [];
let nextId = 1;
let storageTasks = JSON.parse(localStorage.getItem("tasks"));
if (storageTasks){
    tasks = storageTasks;
    for (const task of tasks) {
        if (task.id >= nextId) {
            nextId = task.id + 1;
        }
    }
}

function show_tasks(){
    taskList.replaceChildren();
    for (const task of tasks) {
        let new_task = document.createElement("li");
        new_task.classList.toggle("completed", task.completed);

        new_task.id = "task-" + task.id;
        let taskName = document.createElement("h3");
        taskName.textContent = task.name;
        new_task.append(taskName);

        let taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;
        new_task.append(taskDescription);

        let taskDate = document.createElement("p");
        taskDate.textContent = task.date.split("-").reverse().join("."); // почему то формат даты региональный сбивается, надо вручную сделать
        new_task.append(taskDate);

        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => delete_Task(task.id));
        new_task.append(deleteButton);

        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Редактировать";
        editButton.addEventListener("click", () => edit_Task(task.id));
        new_task.append(editButton);

        let label = document.createElement("label");
        label.textContent = "Выполнено";


        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {complete_Task(task.id, checkbox.checked);});

        label.prepend(checkbox);
        new_task.append(label);

        taskList.append(new_task);
    }
}

function add_Task(event){
    event.preventDefault();

    let name = formInputName.value.trim();
    if (!name) return;
    let description = formInputDescription.value;
    let date = formInputDate.value;

    let new_task = {
        name: name,
        description: description,
        date: date,
        id: nextId,
        completed: false
    }
    nextId += 1;
    tasks.push(new_task);

    show_tasks();
    toDoForm.reset()
    save_Tasks();
}

function delete_Task(id){
    let index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
    }
    show_tasks();
    save_Tasks();
}

function save_Tasks(){
    let remember = JSON.stringify(tasks);
    localStorage.setItem("tasks", remember);
}

function complete_Task(id, checked){
    let task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = checked;
    }
    save_Tasks();
    show_tasks();
}

function edit_Task(id){
    show_tasks();

    const task = tasks.find(task => task.id === id);
    const taskElement = document.getElementById("task-" + id);
    taskElement.replaceChildren();

    let edit_form = document.createElement("form");
    edit_form.className = "editForm";
    edit_form.id = "edit-form";

    let edit_formTitle = document.createElement("h2");
    edit_formTitle.textContent = "Введите новые данные: ";

    let edit_formLabelName = document.createElement("label");
    edit_formLabelName.textContent = "Имя задачи: ";

    let edit_formLabelDescription = document.createElement("label");
    edit_formLabelDescription.textContent = "Описание задачи: ";


    let edit_formLabelDate = document.createElement("label");
    edit_formLabelDate.textContent = "Дата дедлайна: ";

    let edit_formInputName = document.createElement("input");
    edit_formInputName.type = "text";
    edit_formInputName.id = "task-edit_form-name";
    edit_formInputName.required = true;
    edit_formInputName.value = task.name;
    edit_formLabelName.htmlFor = edit_formInputName.id;

    let edit_formInputDescription = document.createElement("textarea");
    edit_formInputDescription.id = "task-edit_form-description";
    edit_formInputDescription.value = task.description;
    edit_formLabelDescription.htmlFor = edit_formInputDescription.id;

    let edit_formInputDate = document.createElement("input");
    edit_formInputDate.type = "date";
    edit_formInputDate.id = "task-edit_form-date";
    edit_formInputDate.value = task.date;
    edit_formLabelDate.htmlFor = edit_formInputDate.id;

    edit_formInputDate.required = true;

    let edit_formBackButton = document.createElement("button");
    edit_formBackButton.type = "button";
    edit_formBackButton.textContent = "Отмена";
    edit_formBackButton.id = "task-edit_form-back";

    let edit_formSubmitButton = document.createElement("button");
    edit_formSubmitButton.type = "submit";
    edit_formSubmitButton.textContent = "Сохранить";
    edit_formSubmitButton.id = "task-edit_form-submit";


    edit_form.append(edit_formTitle);

    edit_form.append(edit_formLabelName);
    edit_form.append(edit_formInputName);

    edit_form.append(edit_formLabelDescription);
    edit_form.append(edit_formInputDescription);

    edit_form.append(edit_formLabelDate);
    edit_form.append(edit_formInputDate);

    edit_form.append(edit_formBackButton);
    edit_form.append(edit_formSubmitButton);



    taskElement.append(edit_form);

    edit_formBackButton.addEventListener("click", show_tasks);

    edit_form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = edit_formInputName.value.trim();
        if (!name) return;

        task.name = name;
        task.description = edit_formInputDescription.value;
        task.date = edit_formInputDate.value;

        save_Tasks();
        show_tasks();
    });

}

toDoForm.addEventListener("submit", add_Task);

show_tasks();