let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem("tasks");

	if(savedTasks) {
		return JSON.parse(savedTasks)
	}
	
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");

  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener('click', function() {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	editButton.addEventListener('click', function () {
		textElement.contentEditable = true;
		textElement.focus();
	})

	textElement.addEventListener('blur', function() {
		textElement.contentEditable = false;
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	textElement.textContent = item;

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");

	const tasks = [];
	itemsNamesElements.forEach(function(el) {
		tasks.push(el.textContent);
	})
	return tasks;
}

items = loadTasks();
items.forEach(function(text) {
	const newItem = createItem(text);
	listElement.append(newItem)
})

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener('submit', function(evt) {
	evt.preventDefault();
	const text = inputElement.value;
	listElement.prepend(createItem(text));
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})