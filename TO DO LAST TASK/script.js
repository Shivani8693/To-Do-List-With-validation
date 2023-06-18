let TableData = [];
let editIndex = null;

function Add() {

    var activity = document.getElementById("activity").value;
    var startDate = document.getElementById("start_date").value;
    var dueDate = document.getElementById("due_date").value;
    var status = document.getElementById("Status").value;

    if (editIndex === null) {
        if ((activity !== "") && (activity !== "task1") && startDate !== "" && dueDate !== "" && status !== "") {
            if (dueDate < startDate) {
                document.getElementById("text2").style.visibility = "visible";
                return

            }

          
            var repeat=TableData.findIndex(function(item){
return (item.Activity === activity && item.StartDate===startDate && item.DueDate ===dueDate && item.Status===status);
            
        });
            if(repeat!==-1){
                document.getElementById("text3").style.visibility = "visible";
                return
            }

            var tableList = {
                Activity: activity,
                StartDate: startDate,
                DueDate: dueDate,
                Status: status,
            };
            TableData.push(tableList);
            tasktable();
            Reset()
        } else {
            document.getElementById("text1").style.visibility = "visible";
            return
        }
    } 
    Reset()

}

function onEdit(i) {
    var button = document.getElementById("add");
    button.innerHTML = "&#10004Update";

    var row = document.getElementById("taskrow").children[i];
    var activity = row.cells[0].textContent;
    var startDate = row.cells[1].textContent;
    var dueDate = row.cells[2].textContent;
    var status = row.cells[3].textContent;

    document.getElementById("activity").value = activity;
    document.getElementById("start_date").value = startDate;
    document.getElementById("due_date").value = dueDate;
    document.getElementById("Status").value = status;

    editIndex = i; // Set thedit index to the current row index
    button.onclick = function () {
        var activity = document.getElementById("activity").value;
        var startDate = document.getElementById("start_date").value;
        var dueDate = document.getElementById("due_date").value;
        var status = document.getElementById("Status").value;

        if (i == null) {
            Add()
        } else {
///////////////////////////////////////////////////////////////////////////////////////////////
if ((activity !== "")  && startDate !== "" && dueDate !== "" && status !== "") {
    if (dueDate < startDate) {
        document.getElementById("text2").style.visibility = "visible";
        return

    }
} else {
    document.getElementById("text1").style.visibility = "visible";
    return
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            TableData[i].Activity = activity;
            TableData[i].StartDate = startDate;
            TableData[i].DueDate = dueDate;
            TableData[i].Status = status;
            tasktable();
            Reset();
            button.innerHTML = `<i class="bi-plus-lg"></i>add`// Change back to "Add after editing;

            i = null;
        }

    }

}







function tasktable() {

    var tableBody = document.getElementById("taskrow");
    tableBody.innerHTML = "";

    TableData.forEach(function (item, i) {
        var row = document.createElement("tr");
        var activityCell = document.createElement("td");
        activityCell.textContent = item.Activity;
        var startDateCell = document.createElement("td");
        startDateCell.textContent = item.StartDate;
        var dueDateCell = document.createElement("td");
        dueDateCell.textContent = item.DueDate
        var statusCell = document.createElement("td");
        statusCell.textContent = item.Status;
        var optionCell = document.createElement("td");

        optionCell.innerHTML =

            `<button onClick='onEdit(${i})' class="edit" >Edit</button><button onClick='onDelete(${i})' class ='delete'>Delete</button>`;

        const currentDate = new Date();
        const dueDate = new Date(item.DueDate);

        if ((statusCell.textContent === "Completed") || (dueDate < currentDate) && ((statusCell.textContent === "Completed"))) {
            row.style.backgroundColor = "lightgreen";
        } else if ((dueDate < currentDate) || ((statusCell.textContent === "Due Passed"))) {
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


function Reset() {
    editIndex = null;
    i = null;
    document.getElementById("activity").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("due_date").value = "";
    document.getElementById("Status").value = "";
    document.getElementById("text1").style.visibility = "hidden";
    document.getElementById("text2").style.visibility = "hidden";
    document.getElementById("text3").style.visibility = "hidden";

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

        const currentDate = new Date();
        const dueDate = new Date(item.DueDate);

        if ((statusCell.textContent === "Completed") || (dueDate < currentDate) && ((statusCell.textContent === "Completed"))) {
            row.style.backgroundColor = "lightgreen";
        } else if ((dueDate < currentDate) || ((statusCell.textContent === "Due Passed"))) {
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





