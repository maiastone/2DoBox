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

	__webpack_require__ (1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Task = __webpack_require__(2);

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
	      this.taskList[i] = new Task(tasksFromStorage[i].title, tasksFromStorage[i].body, tasksFromStorage[i].id, tasksFromStorage[i].importance);
	    }
	    return this.taskList;
	    }
	  },

	  populateDomFromLocalStorage: function(){
	    $taskList.html('');
	    this.retrieveTasks();
	    this.taskArray.forEach(function(task){
	      $ideaList.prepend(generateTaskHTML(task));
	    });
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