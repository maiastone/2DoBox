const toDoList = require ('..lib/2Do');

var $titleInput = $('#title');
var $bodyInput = $('#body');


$('document').ready(function(){
  // populateDomFromLocalStorage();
});


var ToDoList = new toDoList();


$('#save').on('click', function() {
  var task = ToDoList.addTask($titleInput.val(), $bodyInput.val());
  $('#taskList').prepend(ToDoList.generateTaskHTML(task));
  clearIdeaInput();
});

$('ul').on('click', '.card-delete', function () {
  ToDoList.removeTask(this.closest('li').id);
  this.closest('li').remove();
});
