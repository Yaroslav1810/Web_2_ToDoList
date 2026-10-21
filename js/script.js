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
formLabelDescription.htmlFor = "task-form-description"

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