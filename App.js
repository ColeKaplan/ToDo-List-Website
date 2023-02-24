//localStorage.clear();
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions

function addTodo(event){
	//prevent form from submitting
	event.preventDefault();
	
	//todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//create li
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Add todo to local storage
	saveLocalTodo(todoInput.value);
	//Check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
	completedButton.classList.add("complete-button");
	todoDiv.appendChild(completedButton);
	//Trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
	trashButton.classList.add("trash-button");
	todoDiv.appendChild(trashButton);

	//Append to list
	todoList.appendChild(todoDiv);

	//Clear Todo Input Value
	todoInput.value = '';
}

function deleteCheck(e){
	const item = e.target;
	//Delete
	if(item.classList[0] === 'trash-button'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function(){
			todo.remove();
		})
		
	}
	if(item.classList[0] === 'complete-button'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e){
	const todos = todoList.childNodes;
	for(var i = 1; i < todos.length; i++){
		todo = todos[i];
		switch(e.target.value){
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if(todo.classList.contains('completed')){
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case "uncompleted":
				if(todo.classList.contains('completed')){
					todo.style.display = 'none';
				} else {
					todo.style.display = 'flex';
				}
				break;
		}
	}
}

function saveLocalTodo(todo){
	//Check whats in there
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	console.log("1: ", todo);
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
		console.log(todos);
	}
	for(var i = 0; i < todos.length; i++){
		const todo = todos[i];
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		//create li
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//Add todo to local storage
		console.log(todoInput.value);
		//Check mark button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
		completedButton.classList.add("complete-button");
		todoDiv.appendChild(completedButton);
		//Trash button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
		trashButton.classList.add("trash-button");
		todoDiv.appendChild(trashButton);

		//Append to list
		todoList.appendChild(todoDiv);
	}
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoText = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoText), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}