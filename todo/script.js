let tasks = JSON.parse(localStorage.getItem("darshiniTasks")) || [];

displayTasks("all");


// Add Task

function addTask(){

    let input=document.getElementById("taskInput");

    if(input.value.trim()==""){
        alert("Please enter a task");
        return;
    }


    let task={

        id:Date.now(),
        text:input.value,
        completed:false

    };


    tasks.push(task);

    saveTasks();

    input.value="";

    displayTasks("all");

}



// Display Tasks

function displayTasks(type){

    let list=document.getElementById("taskList");

    list.innerHTML="";


    let filtered=tasks.filter(task=>{

        if(type=="completed")
            return task.completed;

        if(type=="pending")
            return !task.completed;

        return true;

    });


    filtered.forEach(task=>{


        let li=document.createElement("li");


        if(task.completed)
            li.classList.add("completed");


        li.innerHTML=`

        <span onclick="completeTask(${task.id})">
        ${task.text}
        </span>

        <div class="actions">

        <button class="edit"
        onclick="editTask(${task.id})">
        ✏️
        </button>

        <button class="delete"
        onclick="deleteTask(${task.id})">
        🗑
        </button>

        </div>

        `;


        list.appendChild(li);

    });


    document.getElementById("taskCount").innerHTML=
    "Total Tasks: "+tasks.length;

}



// Complete Task

function completeTask(id){

    tasks.forEach(task=>{

        if(task.id==id)
        task.completed=!task.completed;

    });


    saveTasks();

    displayTasks("all");

}



// Edit Task

function editTask(id){

    let text=prompt("Edit Task");


    if(text){

        tasks.forEach(task=>{

            if(task.id==id)
            task.text=text;

        });


        saveTasks();

        displayTasks("all");

    }

}



// Delete Task

function deleteTask(id){

    tasks=tasks.filter(task=>task.id!=id);

    saveTasks();

    displayTasks("all");

}



// Search

function searchTask(){

    let value=document
    .getElementById("searchInput")
    .value.toLowerCase();


    document.querySelectorAll("#taskList li")
    .forEach(item=>{

        item.style.display=
        item.innerText.toLowerCase()
        .includes(value)
        ?"flex":"none";

    });

}



// Filter

function filterTasks(type){

    displayTasks(type);

}



// Clear

function clearTasks(){

    tasks=[];

    saveTasks();

    displayTasks("all");

}



// Save

function saveTasks(){

    localStorage.setItem(
        "darshiniTasks",
        JSON.stringify(tasks)
    );

}
