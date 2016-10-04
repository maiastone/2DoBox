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

  findTaskById : function(id) {
    return this.taskArray.find(function(task){
    console.log(id);
    return task.id === id;
    });
  },

  convertImportance : function (importance){
    switch (importance) {
      case 1:
        return 'Critical'
      case 2:
        return 'High'
      case 3:
        return 'Normal'
      case 4:
        return 'Low'
      case 5:
        return 'None'
      default:
        break;

    }
  },

  generateTaskHTML : function(task){
    var convertedImportance = this.convertImportance(task.importance);
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
        <p class="importance-level">Importance: <span class="idea-importance-level">${convertedImportance}</span></p>
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

$taskList.on('click', '.up-vote', function(){
  // 5 levels of importance.  default is normal  on click can go up or down-vote
  // save to local storage
  var id = parseInt($(this).closest('li').attr('id'));
  console.log(ToDoList.findTaskById(id));
  ToDoList.findTaskById(id).upVote();
  ToDoList.storeTasks();
  ToDoList.populateDomFromLocalStorage();
})

$taskList.on('click', '.down-vote', function(){
  // 5 levels of importance.  default is normal  on click can go up or down-vote
  // save to local storage
  var id = parseInt($(this).closest('li').attr('id'));
  console.log(ToDoList.findTaskById(id));
  ToDoList.findTaskById(id).downVote();
  ToDoList.storeTasks();
  ToDoList.populateDomFromLocalStorage();
})
