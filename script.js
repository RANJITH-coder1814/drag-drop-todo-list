const taskList = document.getElementById("taskList");

function addTask(){

const input = document.getElementById("taskInput");
const taskText = input.value;

if(taskText === "") return;

const li = document.createElement("li");
li.innerText = taskText;
li.draggable = true;

taskList.appendChild(li);

input.value = "";

addDragEvents(li);
}

function addDragEvents(item){

item.addEventListener("dragstart", ()=>{
item.classList.add("dragging");
});

item.addEventListener("dragend", ()=>{
item.classList.remove("dragging");
});

}

taskList.addEventListener("dragover", (e)=>{
e.preventDefault();

const dragging = document.querySelector(".dragging");
const afterElement = getDragAfterElement(taskList, e.clientY);

if(afterElement == null){
taskList.appendChild(dragging);
}else{
taskList.insertBefore(dragging, afterElement);
}

});

function getDragAfterElement(container, y){

const elements = [...container.querySelectorAll("li:not(.dragging)")];

return elements.reduce((closest, child)=>{

const box = child.getBoundingClientRect();
const offset = y - box.top - box.height / 2;

if(offset < 0 && offset > closest.offset){
return {offset: offset, element: child};
}else{
return closest;
}

},{offset: Number.NEGATIVE_INFINITY}).element;

}
