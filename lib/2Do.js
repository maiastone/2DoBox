const Task = require('./task');

function ToDoList() {
  this.taskArray = [];


  this.addTask = function(title, body) {
    var newTask = new Task (title, body);
    // this.renderNewTask(newTask.title, newTask.body, newTask.id, newTask.importance);
    this.taskArray.push(newTask);
    this.storeTasks();
    return newTask;
  };

  this.removeTask = function(id){
    this.taskArray = taskArray.filter(function(task){
      return parseInt(id) !== task.id;
    });
    this.storeTasks();
  };

  this.findIdeaById = function(id) {
    return this.ideaBox.find(function(task){
    return task.id === id;
    });
  };

  this.generateTaskHTML = function(task){
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
  };


}
module.exports = ToDoList;
