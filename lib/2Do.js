const Task = require('./task');

var $titleInput = $('#title')
var $bodyInput = $('#body')
var $taskList = $('#task-list')
var $search = $('#search')


var ToDoList = {

  taskArray : [],
  showCompleted : false,

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
        <label for="card-delete">Delete</label>
        <button class="card-delete"></button>
      <h2 class="card-title" contenteditable="true">${task.title}</h2>
      <header class="card-header">
        <button class="task-complete">Completed Task</button>
      </header>
      <p class="card-body" contenteditable="true">${task.body}</p>
      <footer class="card-footer">
        <button class="up-vote vote"></button>
        <button class="down-vote vote"></button>
        <p class="importance-level">Importance: <span class="importance-text">${convertedImportance}</span></p>
      </footer></li>`;
  },

  storeTasks : function(){
    localStorage.setItem('taskList', JSON.stringify(this.taskArray));
  },

  retrieveTasks : function(){
    tasksFromStorage = JSON.parse(localStorage.getItem('taskList'));

    if(tasksFromStorage!==null){
    for (var i = 0; i < tasksFromStorage.length; i++){
      this.taskArray[i] = new Task(tasksFromStorage[i].title, tasksFromStorage[i].body, tasksFromStorage[i].id, tasksFromStorage[i].importance, tasksFromStorage[i].completed);
    }
    return this.taskArray;
    }
  },

  renderTaskList: function(){
    $taskList.html('');
    this.retrieveTasks();
    this.taskArray.forEach(function(task){
      if(task.completed === false){
        $taskList.prepend(this.generateTaskHTML(task));
      }
    }.bind(this));
  },

  toggleShowCompletedTasks: function(){
    if(this.showCompleted === false){
      this.retrieveTasks();
      this.taskArray.forEach(function(task){
        if(task.completed === true){
          $taskList.prepend(this.generateTaskHTML(task));
          $taskList.children("[id="+task.id+"]").css('opacity', '0.1');
          $taskList.children("[id="+task.id+"]").children('.task-complete').text('Uncomplete Task')
        }
      }.bind(this));
      $('#toggle-completed').text('Hide Completed Tasks')
      this.showCompleted = true;
      }else{
      this.renderTaskList()
      $('#toggle-completed').text('Show Completed Tasks')
      this.showCompleted = false;
    }
  },

  showOrHideTasks: function(searchString){
   for (var i = 0; i < this.taskArray.length; i++) {
     var existingTask = this.taskArray[i];

     if(!(this.taskArray[i].title.includes(searchString)) && !(this.taskArray[i].body.includes(searchString))){
         $search.siblings().children("[id="+this.taskArray[i].id+"]").hide();
     } else {
         $search.siblings().children("[id="+this.taskArray[i].id+"]").show();
     }
   }
 },

  toggleTaskCompleted: function(id, ctx){
    if(ToDoList.findTaskById(id).completed === true){
      ToDoList.findTaskById(id).completed = false;
      ctx.closest('li').css('opacity', '1');
      ctx.closest('li').removeClass('complete');
      ctx.text('Complete Task')
    }else{
      ToDoList.findTaskById(id).completed = true;
      ctx.closest('li').css('opacity', '0.1');
      ctx.closest('li').addClass('complete');
      ctx.text('Uncomplete Task')
    }
    this.storeTasks();
  },

  getID : function(ctx){
    return parseInt(ctx.closest('li').attr('id'));
  }
}

$('document').ready(function(){
  ToDoList.renderTaskList();
});

$('#save').on('click', function() {
  var task = ToDoList.addTask($titleInput.val(), $bodyInput.val());
  $taskList.prepend(ToDoList.generateTaskHTML(task));
  clearIdeaInput();
});

$('#toggle-completed').on('click', function(){
  ToDoList.toggleShowCompletedTasks();
});

$taskList.on('click', '.card-delete', function () {
  ToDoList.removeTask(this.closest('li').id);
  this.closest('li').remove();
});

var updateImportanceText = function (ctx){
  ctx.siblings().children('.importance-text').text(ToDoList.convertImportance(ToDoList.findTaskById(ToDoList.getID(ctx)).importance));
}

$taskList.on('click', '.up-vote', function(){
  ToDoList.findTaskById(ToDoList.getID($(this))).upVote();
  ToDoList.storeTasks();
  updateImportanceText($(this));
})

$taskList.on('click', '.down-vote', function(){
  ToDoList.findTaskById(ToDoList.getID($(this))).downVote();
  ToDoList.storeTasks();
  updateImportanceText($(this));
})

$taskList.on('click', '.task-complete', function(){
  ToDoList.toggleTaskCompleted(ToDoList.getID($(this)),$(this));
});

$taskList.on('blur', '.card-title', function(){
  var newTitle = $(this).text()
  ToDoList.findTaskById(ToDoList.getID($(this))).editTitle(newTitle);
  ToDoList.storeTasks();
})

$taskList.on('blur', '.card-body', function(){
  var newBody = $(this).text()
  ToDoList.findTaskById(ToDoList.getID($(this))).editBody(newBody);
  ToDoList.storeTasks();
})

$search.on('keyup', function(){
  var searchString = $(this).val();
  ToDoList.showOrHideTasks(searchString);
})
