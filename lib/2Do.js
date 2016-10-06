const Task = require('./task');

var $titleInput = $('#title')
var $bodyInput = $('#body')
var $taskList = $('#task-list')
var $save = $('#save')
var $search = $('#search')
var $showMoreTasks = $('#show-more-tasks')


var ToDoList = {

  taskArray : [],
  showCompleted : false,
  maxNumberOfTasksToDisplay: 10,


  addTask : function(title, body) {
    var newTask = new Task (title, body);
    this.taskArray.unshift(newTask);
    this.storeTasks();
    return newTask;
  },

  toggleSaveButton: function(){
    $save.attr('disabled', ($titleInput.val()==='' || $bodyInput.val().length > 120 || $bodyInput.val()===''));
  },

  clearInputFields : function(){
    $titleInput.val('');
    $bodyInput.val('');
  },

  updateCharacterCounts: function(){
    $('#body-char-count').text($bodyInput.val().length)
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

        <header class="card-header" id="card-buttons">
          <button class="task-complete" tabindex="0">Completed</button>
          <label for="card-delete"></label>
          <button class="card-delete" tabindex="0"></button>
        </header>

        <main>
          <h2 class="card-title" contenteditable="true">${task.title}</h2>
          <p class="card-body" contenteditable="true">${task.body}</p>
        </main>

        <footer class="card-footer">
          <button class="up-vote vote" tabindex="0"></button>
          <button class="down-vote vote" tabindex="0"></button>
          <p class="importance-level">Importance: <span class="importance-text">${convertedImportance}</span></p>
        </footer>
        
      </li>`;
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

    var tasksRendered = false
    var currentTaskCount = 0;

    while(tasksRendered === false){
      this.taskArray.forEach(function(task){
        if(task.completed === false && tasksRendered === false){
          $taskList.append(this.generateTaskHTML(task));
          currentTaskCount++
        }
        if(currentTaskCount === this.maxNumberOfTasksToDisplay || currentTaskCount===this.taskArray.length){
          tasksRendered = true;
          return;
        }
      }.bind(this));
      tasksRendered = true;
    }
    this.toggleSaveButton();
  },

  showMoreTasks: function(){
      this.maxNumberOfTasksToDisplay = this.maxNumberOfTasksToDisplay + 10;
      this.renderTaskList();
  },

  filterTasksByImportance: function(importance){
    for (var i = 0; i < this.taskArray.length; i++) {
      if(this.taskArray[i].importance !== importance){
          $taskList.children("#"+this.taskArray[i].id+"").hide();
      } else {
          $taskList.children("#"+this.taskArray[i].id+"").show();
      }
    }
  },

  toggleShowCompletedTasks: function(){
    if(this.showCompleted === false){
      this.retrieveTasks();
      this.taskArray.forEach(function(task){
        if(task.completed === true){
          $taskList.prepend(this.generateTaskHTML(task));
          $taskList.children("#"+task.id+"").children('.task-complete').text('Uncomplete Task')
          $taskList.children("#"+task.id+"").addClass('completed');
        }
      }.bind(this));
      $('#toggle-completed').text('Hide Completed Tasks')
      this.showCompleted = true;
      }else{
      this.showCompleted = false;
      this.renderTaskList()
      $('#toggle-completed').text('Show Completed Tasks')
    }
  },

  showOrHideTasks: function(searchString){
   for (var i = 0; i < this.taskArray.length; i++) {
     var existingTask = this.taskArray[i];
     if(!(this.taskArray[i].title.includes(searchString)) && !(this.taskArray[i].body.includes(searchString))){
        $taskList.children("#"+this.taskArray[i].id+"").hide();
     } else {
       $taskList.children("#"+this.taskArray[i].id+"").show();
     }
    }
  },
  toggleTaskCompleted: function(id, ctx){
    if(ToDoList.findTaskById(id).completed === true){
      ToDoList.findTaskById(id).completed = false;
      ctx.closest('li').removeClass('completed');
      ctx.text('Complete Task')
    }else{
      ToDoList.findTaskById(id).completed = true;
      ctx.closest('li').addClass('completed');
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

$save.on('click', function() {
  var task = ToDoList.addTask($titleInput.val(), $bodyInput.val());
  $taskList.prepend(ToDoList.generateTaskHTML(task));
  ToDoList.clearInputFields();
});

$titleInput.on('keyup', function(){
  ToDoList.toggleSaveButton();
});

$bodyInput.on('keyup', function(){
  ToDoList.toggleSaveButton();
  ToDoList.updateCharacterCounts();
});

$('#toggle-completed').on('click', function(){
  ToDoList.toggleShowCompletedTasks();
});

$('#filt-critical').on('click', function(){
  ToDoList.filterTasksByImportance(1);
});
$('#filt-high').on('click', function(){
  ToDoList.filterTasksByImportance(2);
});
$('#filt-normal').on('click', function(){
  ToDoList.filterTasksByImportance(3);
});
$('#filt-low').on('click', function(){
  ToDoList.filterTasksByImportance(4);
});
$('#filt-none').on('click', function(){
  ToDoList.filterTasksByImportance(5);
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

$showMoreTasks.on('click', function(){
  ToDoList.showMoreTasks();
});
