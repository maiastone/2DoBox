const Task = require('./task');

var $titleInput = $('#title')
var $bodyInput = $('#body')
var $taskList = $('#task-list')


var ToDoList = {

  taskArray : [],

  addTask : function(title, body) {
    var newTask = new Task (title, body);
    this.taskArray.push(newTask);
    this.storeTasks();
    return newTask;
  },

  removeTask : function(id){
    this.taskArray = this.taskArray.filter(function(task){
      return parseInt(id) !== task.id;
    });
    this.storeTasks();
  },

  findIdeaById : function(id) {
    return this.ideaBox.find(function(task){
    return task.id === id;
    });
  },

  generateTaskHTML : function(task){
    return `
      <li id=${task.id}>
      <header class="card-header">
        <h2 class="card-title" contenteditable="true">${task.title}</h2>
        <button class="card-delete"></button>
      </header>
      <p class="card-body" contenteditable="true">${task.body}</p>
      <footer class="card-footer">
        <button class="up-vote vote"></button>
        <button class="down-vote vote"></button>
        <p class="importance-level">Importance: <span class="idea-importance-level">${task.importance}</span></p>
      </footer></li>`;
  },

  storeTasks : function(){
    localStorage.setItem('taskList', JSON.stringify(this.taskArray));
  },

  retrieveTasks : function(){
    tasksFromStorage = JSON.parse(localStorage.getItem('taskList'));

    if(tasksFromStorage!==null){
    for (var i = 0; i < tasksFromStorage.length; i++){
      this.taskArray[i] = new Task(tasksFromStorage[i].title, tasksFromStorage[i].body, tasksFromStorage[i].id, tasksFromStorage[i].importance);
    }
    return this.taskArray;
    }
  },

  populateDomFromLocalStorage: function(){
    $taskList.html('');
    this.retrieveTasks();
    this.taskArray.forEach(function(task){
      $taskList.prepend(this.generateTaskHTML(task));
    }.bind(this));
  }

}


$('document').ready(function(){
  ToDoList.populateDomFromLocalStorage();
});

$('#save').on('click', function() {
  var task = ToDoList.addTask($titleInput.val(), $bodyInput.val());
  $taskList.prepend(ToDoList.generateTaskHTML(task));
  clearIdeaInput();
});

$taskList.on('click', '.card-delete', function () {
  ToDoList.removeTask(this.closest('li').id);
  this.closest('li').remove();
});
