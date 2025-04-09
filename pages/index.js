import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",

  handleFormSubmit: (values) => {
    const date = new Date(values.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = {
      name: values.name,
      date,
      id,
      completed: false,
    };

    const todo = generateTodo(todoData);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(todo) {
  if (todo.completed) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
}

function handleDelete(todoData) {
  const todoElement = document.getElementById(`todo-${todoData.id}`);
  if (todoElement) {
    todoElement.remove();
  }

  todoCounter.updateTotal(false);
  if (todoData.completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//const renderTodo = (item) => {
// const todo = generateTodo(item);
//  todosList.append(todo);
//};

//addTodoForm.addEventListener("submit", (evt) => {
// evt.preventDefault();
//const name = evt.target.name.value;
//const dateInput = evt.target.date.value;
//const date = new Date(dateInput);
///date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//const id = uuidv4();
// const values = { name, date, id };
//renderTodo(values);
//addTodoPopup.close();
//newTodoValidator.resetValidation();
//});

//initialTodos.forEach((item) => {
//renderTodo(item); // use additem method instead

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
