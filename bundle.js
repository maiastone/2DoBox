/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const toDoList = __webpack_require__ (1);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Task = __webpack_require__(2);

	function ToDoList() {
	  this.taskArray = [];


	  this.addTask = function(title, body) {
	    var newTask = new Task (title, body);
	    // this.renderNewTask(newTask.title, newTask.body, newTask.id, newTask.quality);
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
	        <p class="quality-level">Quality: <span class="idea-quality-level">${task.importance}</span></p>
	      </footer></li>`;
	  };


	}
	module.exports = ToDoList;


/***/ },
/* 2 */
/***/ function(module, exports) {

	


	function Task (title, body, id, importance) {
	  this.title = title;
	  this.body = body;
	  this.id = id || Date.now();
	  this.importance = importance || 3 ;
	}


	Task.prototype.upVote = function () {
	  this.importance < 5 ? this.importance++ : this.importance;
	};

	Task.prototype.downVote = function () {
	  this.importance > 0 ? this.importance-- : this.importance;
	};


	Task.prototype.editTitle = function (newTitle) {
	  this.title = newTitle;
	};

	Task.prototype.editBody = function (newBody) {
	  this.body = newBody;
	};


	module.exports = Task;


/***/ }
/******/ ]);