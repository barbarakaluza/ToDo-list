let toDoInput; //miejsce do wpisywania zadania
let errorInfo; //info o braku zadan lub konieczności wpisania tekstu
let addBtn; //dodaje nowe elementy do listy
let ulList; //list zadań
let newTask; //nowe zadanie

let popup; //popup
let popupInfo; //error przy pustej wartosci
let todoToEdit; // edytowany todo
let popupInput; // input w popupie
let popupAddBtn; // przycisk zatwierdz w popupie
let popupCloseBtn; //przycisk zamknij w popupie

const main = () => {
  prepareDOMEelements();
  prepareDomEvents();
};

const prepareDOMEelements = () => {
  toDoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector("ul");
  popup = document.querySelector(".popup");
  popupCloseBtn = document.querySelector(".cancel");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupInfo = document.querySelector(".popup-info");
};

const prepareDomEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeToDo);
  toDoInput.addEventListener("keyup", keyEnterCheck);
}

const addNewTask = () => {
  if (toDoInput.value !== "") {
    newTask = document.createElement("li");
    newTask.textContent = toDoInput.value;
    createToolsArea();

    ulList.append(newTask);

    toDoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Musisz podać wartość";
  }
};

const deleteTask = (e) => {
  e.target.closest("li").remove();

  const allTodos = ulList.querySelectorAll("li");
  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście.";
  }
};

const createToolsArea = () => {
  const toolsContainer = document.createElement("div");
  toolsContainer.classList.add("tools");
  newTask.appendChild(toolsContainer);

  const btnComplete = document.createElement("button");
  btnComplete.classList.add("complete");
  btnComplete.innerHTML = '<i class="fas fa-check"></i>';

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("edit");
  btnEdit.textContent = "EDIT";

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("delete");
  btnDelete.innerHTML = '<i class="fas fa-times"></i>';

  toolsContainer.append(btnComplete, btnEdit, btnDelete);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editToDo(e);
  } else if (e.target.matches(".delete")) {
    deleteTask(e);
  }
};

const editToDo = (e) => {
  todoToEdit = e.target.closest("li");
  console.log(todoToEdit.firstChild);
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const changeToDo = () => {
  if (popupInput.value !== "") {
    popup.style.display = "none";
    todoToEdit.firstChild.textContent = popupInput.value;
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "Musisz podać jakąś wartość";
  }
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const keyEnterCheck = (e) => {
  if(e.key === 'Enter') {
    addNewTask();
  }
}

document.addEventListener("DOMContentLoaded", main);
