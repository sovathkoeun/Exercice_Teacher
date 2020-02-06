const dateElement = document.querySelector('#date');
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
let time = new Date();
dateElement.innerHTML = time.toLocaleString("en-US", options);


const listElement = document.querySelector('#list');
const inputElement = document.querySelector('#input');
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line = "lineThrough";

let list = [];
let id = 0;

let data = localStorage.getItem("TODO");

if (data) {
    list = JSON.parse(data);
    list.forEach(item => {
        addToDo(item.name,item.time, item.id, item.done, item.trash);
    });
}

document.addEventListener('keyup', event => {
    if (event.key === "Enter") {
        const toDo = inputElement.value;
        const timer = time.getMinutes() + ":" + time.getSeconds();
        if (toDo) {
            addToDo(toDo,timer);
            list.push({
                id: id,
                name: toDo,
                time: timer,  
                done: false,
                trash: false,
            });
            id++;
            localStorage.setItem("TODO", JSON.stringify(list));
        }
       ClearInput(inputElement);
    }
});

function addToDo(todo,timer, id, done, trash) {
    const isDone = done ? check : uncheck;
    const lineCross = done ? line : "";
    if (trash) return;
    const items = `  
        <li class="item"> 
            <i class="fa ${isDone} co" job="complete" id="${id}"></i>
            <p class="text ${lineCross}">${todo} : ${timer}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;
    listElement.insertAdjacentHTML("beforeend", items);
}

function ClearInput() {
    inputElement.value = "";
}