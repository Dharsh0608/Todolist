# Ex03 To-Do List using JavaScript
## Date: 29/07/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Darshini's Todo App</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="todo-container">

    <h1>⚡ Task Manager ⚡</h1>
    <p class="subtitle">Organize your daily activities</p>

    <div class="input-area">
        <input type="text" id="taskInput" placeholder="Add a new task">
        <button onclick="addTask()">+</button>
    </div>


    <div class="search-box">
        <input type="text" id="searchInput" 
        placeholder="Search tasks..."
        onkeyup="searchTask()">
    </div>


    <div class="buttons">
        <button onclick="filterTasks('all')">All</button>
        <button onclick="filterTasks('completed')">Done</button>
        <button onclick="filterTasks('pending')">Pending</button>
    </div>


    <ul id="taskList"></ul>


    <div class="status">
        <span id="taskCount">Tasks: 0</span>
        <button class="clear" onclick="clearTasks()">Clear</button>
    </div>

</div>


<footer>
    <p>Name: Darshini</p>
    <p>Register Number: 212225230200</p>
    <p>© 2026 Task Manager</p>
</footer>


<script src="script.js"></script>

</body>
</html>
```

````
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}


body{

    min-height:100vh;
    background:#0f172a;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    color:white;

}


.todo-container{

    width:450px;
    background:#1e293b;
    padding:30px;
    border-radius:20px;
    box-shadow:0 0 25px #00f5ff;

}


h1{

    text-align:center;
    color:#00f5ff;
    margin-bottom:10px;

}


.subtitle{

    text-align:center;
    color:#cbd5e1;
    margin-bottom:25px;

}


.input-area{

    display:flex;
    gap:10px;

}


input{

    width:100%;
    padding:12px;
    border-radius:10px;
    border:none;
    outline:none;

}


.input-area button{

    width:50px;
    font-size:25px;
    background:#00f5ff;
    border:none;
    border-radius:10px;
    cursor:pointer;

}


.search-box{

    margin-top:20px;

}


.buttons{

    display:flex;
    justify-content:center;
    gap:10px;
    margin:20px 0;

}


button{

    padding:10px 15px;
    border:none;
    border-radius:8px;
    cursor:pointer;
    background:#00f5ff;
    color:#111827;
    font-weight:bold;

}


button:hover{

    background:#38bdf8;

}


ul{

    list-style:none;

}


li{

    background:#334155;
    padding:15px;
    margin:10px 0;
    border-radius:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;

}


.completed{

    text-decoration:line-through;
    background:#14532d;

}


.actions button{

    padding:6px;
    margin-left:5px;

}


.edit{

    background:#facc15;

}


.delete{

    background:#ef4444;
    color:white;

}


.status{

    margin-top:20px;
    display:flex;
    justify-content:space-between;
    align-items:center;

}


.clear{

    background:#ef4444;
    color:white;

}


footer{

    position:absolute;
    bottom:0;
    width:100%;
    background:#020617;
    text-align:center;
    padding:15px;
    color:#00f5ff;

}
````
```
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
```

```

```


## OUTPUT
<img width="915" height="601" alt="image" src="https://github.com/user-attachments/assets/43df7133-150a-4929-8410-0fecff7b102e" />



## RESULT
The program for creating To-do list using JavaScript is executed successfully.
