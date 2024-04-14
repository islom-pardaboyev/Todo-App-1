"use strict";

const inputEl = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const todoField = document.querySelector("#todoField");
const changeTodoModal = document.querySelector("#changeTodoModal");
const changeTodoInput = document.querySelector("#changeTodoInput");
const changeTodoBtn = document.querySelector("#changeTodoBtn");
const todoContainer = document.querySelector("#container")
// Array
let todoArray = [];

function renderTodo() {
  const todoItemsHTML = todoArray
    .map(
      (todo, index) => `
    <div class="mt-3 bg-gray-500/30 p-3 flex items-center justify-between">
      <p id="todo" class="text-lg cursor-pointer font-medium ${
        todo.isCompleted ? "line-through" : ""
      }" data-index="${index}">${todo.title}</p>
      <div class="flex items-center gap-4">
          <i class="fa-solid fa-pen-to-square p-3 bg-green-600 text-white cursor-pointer editBtn" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can text-white p-3 bg-red-600 cursor-pointer deleteBtn" data-index="${index}"></i>
      </div>
    </div>
  `
    )
    .join("");

  todoField.innerHTML = todoItemsHTML;

  // Attach event listeners to edit and delete buttons
  const editButtons = document.querySelectorAll(".editBtn");
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  const todoItems = document.querySelectorAll("#todo");

  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      changeTodoModal.classList.remove("hidden");
      todoContainer.classList.add("blur-lg")
      changeTodoInput.value = todoArray[index].title;

      changeTodoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const inputValue = changeTodoInput.value;
        todoArray[index].title = inputValue;
        saveTodoArrayToLocalStorage();
        renderTodo();
        changeTodoModal.classList.add("hidden");
        todoContainer.classList.remove("blur-lg")
      });
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      todoArray.splice(index, 1);
      saveTodoArrayToLocalStorage();
      renderTodo();
    });
  });

  todoItems.forEach((todo) => {
    todo.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      todoArray[index].isCompleted = !todoArray[index].isCompleted;
      todo.classList.toggle("line-through");
      saveTodoArrayToLocalStorage();
    });
  });
}

// Function to add todo to todoArray
function addTodo() {
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const todoTitle = inputEl.value.trim();

    if (todoTitle === "") {
      alert("Please enter a todo");
    } else if (todoArray.some((todo) => todo.title === todoTitle)) {
      alert("Todo already exists");
    } else {
      const todoObj = {
        title: todoTitle,
        isCompleted: false,
      };

      todoArray.push(todoObj);
      inputEl.value = "";
      saveTodoArrayToLocalStorage();
      renderTodo();
    }
  });
}

function saveTodoArrayToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todoArray));
}

function getTodoArrayFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  if (todos) {
    todoArray = JSON.parse(todos);
  }
}

getTodoArrayFromLocalStorage();
addTodo();
renderTodo();