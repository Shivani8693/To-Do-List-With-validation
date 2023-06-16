let TableData = [];
let editIndex = null;


function Add() {
    var activity = document.getElementById("activity").value;
    var startDate = document.getElementById("start_date").value;
    var dueDate = document.getElementById("due_date").value;
    var status = document.getElementById("Status").value;
      
    if(editIndex==null){
        console.log(editIndex)
        if (dueDate < startDate) {
            document.getElementById("text2").style.visibility = "visible";
            return
        }    

        if( activity !== "" && startDate !== "" && dueDate !== "" && status !== ""){
            var tableList = {
                Activity: activity,
                StartDate: startDate,
                DueDate: dueDate,
                Status: status,
            };

            TableData.push(tableList);
            tasktable();    
            Reset()
       
    }else{
        document.getElementById("text1").style.visibility = "visible";
        return
    }
   
}else{
        onEdit(editIndex);
        
    }
    
}


function onEdit(i) {
   
    var button = document.getElementById("add");
    button.innerHTML = "Update";
console.log(i)

    button.setAttribute("data-index", i);
    var row = document.getElementById("taskrow").children[i];
    var activity = row.cells[0].textContent;
    console.log(activity)
    var startDate = row.cells[1].textContent;
    var dueDate = row.cells[2].textContent;
    var status = row.cells[3].textContent;

document.getElementById("activity").value = activity;
console.log(document.getElementById("activity").value)
document.getElementById("start_date").value = startDate;
document.getElementById("due_date").value = dueDate;
document.getElementById("Status").value = status;

editIndex = i; // Set the edit index to the current row index
console.log(i)
console.log('null')
 
    if (activity !== "" && (startDate !== "")&&(dueDate !== "") && status !== "") {
        if(i!==null){
            button.onclick = function() {
                updateTodoItem(editIndex);   
                button.innerHTML = `<i class="bi-plus-lg"></i>add`// Change back to "Update" after editing;  
            }
        }
        
    }else{
            document.getElementById("text1").style.visibility = "visible";
            
        }  
        
 }



function updateTodoItem(i) {

var activity = document.getElementById("activity").value;
var startDate = document.getElementById("start_date").value;
var dueDate = document.getElementById("due_date").value;
var status = document.getElementById("Status").value;

TableData[i].Activity = activity;
TableData[i].StartDate = startDate;
TableData[i].DueDate = dueDate;
TableData[i].Status = status;

    tasktable(); 
    Reset()

i=null
// console.log(i)
}


function Reset() {
    document.getElementById("activity").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("due_date").value = "";
    document.getElementById("Status").value = "";
    document.getElementById("text2").style.visibility = "hidden";
    document.getElementById("text1").style.visibility = "hidden";
    editIndex= null;
}


function tasktable() {

    var tableBody = document.getElementById("taskrow");
    tableBody.innerHTML = "";

    TableData.forEach(function (item,i) {
        var row = document.createElement("tr");
        var activityCell = document.createElement("td");
        activityCell.textContent = item.Activity;
        var startDateCell = document.createElement("td");
        startDateCell.textContent = item.StartDate;
        var dueDateCell = document.createElement("td");
        dueDateCell.textContent = item.DueDate;
        var statusCell = document.createElement("td");
        statusCell.textContent = item.Status;
        var optionCell = document.createElement("td");

        optionCell.innerHTML =
        `<button onClick='onEdit(${i})' class="edit" >Edit</button><button onClick='onDelete(${i})' class ='delete'>Delete</button>`;

        const currentDate = new Date();
        const dueDate = new Date(item.DueDate);

     var a=document.getElementById('ns')
     var b=document.getElementById('s')
     var c=document.getElementById('ip')
        
        if((statusCell.textContent==="Completed")||(dueDate < currentDate)&&((statusCell.textContent==="Completed"))){
                row.style.backgroundColor="lightgreen";
            }else if((dueDate < currentDate)||((statusCell.textContent==="Due Passed"))){
                a.disabled=true
                b.Disabled=true
                c.Disabled=true
                row.style.textDecoration = "line-through";

            }

        row.appendChild(activityCell);
        row.appendChild(startDateCell);
        row.appendChild(dueDateCell);
        row.appendChild(statusCell);
        row.appendChild(optionCell);

        tableBody.appendChild(row);

    });

}

function onDelete(index) {

    TableData.splice(index, 1);
    tasktable();

}


function Search() {
    var tableBody = document.getElementById("taskrow");
    tableBody.innerHTML = "";

    var searchValue = document.getElementById("searchbox").value.toLowerCase();
    var filteredData = TableData.filter(function (item) {
        return (
            item.Activity.toLowerCase().includes(searchValue) ||
            item.StartDate.toLowerCase().includes(searchValue) ||
            item.DueDate.toLowerCase().includes(searchValue) ||
            item.Status.toLowerCase().includes(searchValue)
        );
    });

    filteredData.forEach(function (item, i) {

        var row = document.createElement("tr");
        var activityCell = document.createElement("td");
        activityCell.textContent = item.Activity;
        var startDateCell = document.createElement("td");
        startDateCell.textContent = item.StartDate;
        var dueDateCell = document.createElement("td");
        dueDateCell.textContent = item.DueDate;
        var statusCell = document.createElement("td");
        statusCell.textContent = item.Status;
        var optionCell = document.createElement("td");

        optionCell.innerHTML =
        `<button onClick='onEdit(${i})' class="edit" >Edit</button><button onClick='onDelete(${i})' class ='delete'>Delete</button>`;

        row.appendChild(activityCell);
        row.appendChild(startDateCell);
        row.appendChild(dueDateCell);
        row.appendChild(statusCell);
        row.appendChild(optionCell);
        tableBody.appendChild(row);

    });

}