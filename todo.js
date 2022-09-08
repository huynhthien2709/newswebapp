'use strict';

const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');
let todoArr = getFromStorage('todoArr') || [];
const currentUser = getFromStorage('currentUser');
const todoContainer = document.getElementById('todo-container');

displayTask(todoArr);
//Event add button
addBtn.addEventListener('click', function () {
  let owner = currentUser.userName;
  let isDone = false;
  if (taskInput.value === '') {
    alert('Vui lòng nhập nội dung công việc');
  } else {
    let data = new Task(taskInput.value, owner, isDone);
    todoArr.push(data);
    saveToStorage('todoArr', todoArr);
    displayTask(todoArr);
    taskInput.value = '';
  }
});
// Hiển thị các Task
function displayTask(todoArr) {
  todoList.innerHTML = '';
  let html = '';
  todoArr
    .filter(task => task.owner == currentUser.userName)
    .forEach(e => {
      if (e.isDone) {
        html += `<li class="checked" onclick="toggleTask('${e.taskInput}', ${e.isDone})"> ${e.taskInput}<span class="close" onclick="deleteTask(event, '${e.taskInput}', ${e.isDone}, '${e.owner}')">×</span></li>`;
      } else {
        html += `<li onclick="toggleTask('${e.taskInput}', ${e.isDone})"> ${e.taskInput}<span class="close" onclick="deleteTask(event, '${e.taskInput}', ${e.isDone}, '${e.owner}')">x</span></li>`;
      }
      todoList.innerHTML = html;
    });
}

//Toggle Task
function toggleTask(taskInput, isDone) {
  let doneTask = todoArr.find(i => {
    if (i.taskInput == taskInput && i.isDone == isDone) {
      return true;
    } else {
      return false;
    }
  });
  let checkTask = doneTask;
  console.log(checkTask);
  checkTask.isDone = !checkTask.isDone;
  saveToStorage('todoArr', todoArr);
  displayTask(todoArr);
}
// Delete Task

function deleteTask(e, taskInput) {
  e.stopPropagation();

  //dùng hàm Index để duyệt qua từng từng phần tử trong mảng
  const index = todoArr.findIndex(checkTask => {
    if (
      checkTask.taskInput == taskInput &&
      checkTask.owner == currentUser.userName
    ) {
      return true;
    } else {
      return false;
    }
  });
  let isDelete = confirm('Bạn chắc chắn muốn xóa ❓');
  if (isDelete) {
    todoArr.splice(index, 1);
    saveToStorage('todoArr', todoArr);
    displayTask(todoArr);
  }
  console.log(index);
}
