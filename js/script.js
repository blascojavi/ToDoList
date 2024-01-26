const todoInputText = document.getElementById("todo-input-text");
const btnAddEditTodo = document.getElementById("btn-add-todo");
const todoUlList = document.getElementById("todo-ul-list");
const todoQuantity = document.getElementById("todo-quantity");

let total = 0;

let tareaEditando = null;
let todoList = [];
let userIsEditing = null;

function resetTodoList() {
    todoUlList.innerHTML = '';
    btnAddEditTodo.innerText = "Agregar";
}

const createTodoButton = (text, id, onClick) => {
    const btnEditTodo = document.createElement("button");
    btnEditTodo.innerText = text;
    btnEditTodo.onclick = () => onClick(id);
    return btnEditTodo;
}

const onClickDeleteTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    todoList = newTodoList;
    renderTodos();
    updateTodoQuantity(); // Actualizar la cantidad de tareas
}

const onClickEditButton = (id) => {
    const todoToEdit = todoList.find(todo => todo.id === id);
    todoInputText.value = todoToEdit.text;
    userIsEditing = todoToEdit.id;
    btnAddEditTodo.innerText = "Modificar";
}

const editTodo = () => {
    const todoToEdit = todoList.find(todo => todo.id === userIsEditing);
    todoToEdit.text = todoInputText.value;
    userIsEditing = null;
    renderTodos();
    updateTodoQuantity(); // Actualizar la cantidad de tareas
    todoInputText.value = null;
}

function renderTodos() {
    resetTodoList();
    const AllTodos = todoList.map(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        li.id = todo.id;
        const editButton = createTodoButton("Editar", todo.id, onClickEditButton);
        const deleteButton = createTodoButton("Borrar", todo.id, onClickDeleteTodo);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        return li;
    });
    AllTodos.forEach(todo => {
        todoUlList.appendChild(todo);
    });
}

function addTodo() {
    if (todoInputText.value == "") {
        return;
    }
    const newTodoText = todoInputText.value;
    const newTodoId = `${new Date().getTime()}${Math.random()}`;
    const newTodo = {
        text: newTodoText,
        id: newTodoId
    };
    todoList.push(newTodo);
    renderTodos();
    updateTodoQuantity(); // Actualizar la cantidad de tareas
    todoInputText.value = null;
}

const onClickBtnAddEditTodo = () => {
    if (userIsEditing) {
        return editTodo();
    }
    if (!userIsEditing) {
        return addTodo();
    }
}

btnAddEditTodo.onclick = onClickBtnAddEditTodo;

todoInputText.addEventListener("keypress", function (event) {
    if (btnAddEditTodo.innerText == "Modificar") {
        console.log(btnAddEditTodo.innerText);
        return;
    }
    if (event.key === "Enter") {
        addTodo();
    }
});

function updateTodoQuantity() {
    todoQuantity.innerText = todoList.length;
}
