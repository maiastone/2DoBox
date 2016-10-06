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
	__webpack_require__ (3);
	__webpack_require__ (7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Task = __webpack_require__(2);

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
	    $save.attr('disabled', ($titleInput.val()===''&& $bodyInput.val()===''));
	  },

	  clearInputFields : function(){
	    $titleInput.val('');
	    $bodyInput.val('');
	  },

	  updateCharacterCounts: function(){
	    $('#title-char-count').text($titleInput.val().length)
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
	        <section id="card-buttons">
	          <button class="task-complete">Completed</button>
	          <label for="card-delete"></label>
	          <button class="card-delete"></button>
	        </section>
	        <h2 class="card-title" contenteditable="true">${task.title}</h2>
	        <header class="card-header">

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

	    var tasksRendered = false
	    var taskCount = 0
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
	      var existingTask = this.taskArray[i];
	      console.log(this.taskArray[i].importance)
	      console.log(importance)
	      if(this.taskArray[i].importance !== importance){
	          $taskList.children("[id="+this.taskArray[i].id+"]").hide();
	      } else {
	          $taskList.children("[id="+this.taskArray[i].id+"]").show();
	      }
	    }
	  },

	  toggleShowCompletedTasks: function(){
	    if(this.showCompleted === false){
	      this.retrieveTasks();
	      this.taskArray.forEach(function(task){
	        if(task.completed === true){
	          $taskList.prepend(this.generateTaskHTML(task));
	          $taskList.children("[id="+task.id+"]").children('.task-complete').text('Uncomplete Task')
	          $taskList.children("[id="+task.id+"]").addClass('completed');
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
	         $search.siblings().children("[id="+this.taskArray[i].id+"]").hide();
	     } else {
	         $search.siblings().children("[id="+this.taskArray[i].id+"]").show();
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
	  ToDoList.updateCharacterCounts();
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	


	function Task (title, body, id, importance, completed) {
	  this.title = title;
	  this.body = body;
	  this.id = id || Date.now();
	  this.importance = importance || 3 ;
	  this.completed = completed || false;
	}


	Task.prototype.upVote = function () {
	  this.importance > 1 ? this.importance-- : null;
	};

	Task.prototype.downVote = function () {
	  this.importance < 5 ? this.importance++ : null;
	};


	Task.prototype.editTitle = function (newTitle) {
	  this.title = newTitle;
	};

	Task.prototype.editBody = function (newBody) {
	  this.body = newBody;
	};


	module.exports = Task;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box; }\n\nbody {\n  font-family: 'Questrial', sans-serif;\n  letter-spacing: extended; }\n\nh1 {\n  font-family: 'Oswald', sans-serif;\n  color: #0076FF;\n  font-size: 24px;\n  text-align: center;\n  letter-spacing: .5px;\n  padding-top: 10px; }\n\nh2 {\n  font-family: 'Roboto Slab', serif;\n  color: #6d6e71;\n  font-size: 20px;\n  padding-top: 10px; }\n\np {\n  color: #939598; }\n\nli {\n  border-bottom: 3px solid #d1d3d4;\n  width: 75%;\n  margin: 0 auto; }\n\nul {\n  list-style: none; }\n\n.input {\n  background-color: #C7C7CD;\n  padding-bottom: 10px; }\n\n.card-body {\n  padding: 10px 0;\n  line-height: 1.2em;\n  font-stretch: expanded; }\n\n.importance-level {\n  color: #6d6e71;\n  font-size: 14px; }\n\n.vote {\n  border: none; }\n\n.importance-level {\n  color: #6d6e71;\n  font-size: 12px;\n  margin: 8px 0px 0px 8px; }\n\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 15px; }\n\n.card-footer {\n  display: flex;\n  margin-bottom: 5px; }\n\n#title, #body, #save, #search {\n  display: block;\n  margin: 10px auto;\n  width: 60%;\n  border: 1px solid #BFC3C4; }\n\n#title {\n  height: 25px; }\n\n#search, #save {\n  width: 60%;\n  height: 30px; }\n\n#toggle-completed {\n  margin-left: 20%;\n  margin-bottom: 10px; }\n\n#save {\n  background-color: #0076FF;\n  color: #ffffff;\n  font-size: 1.2em;\n  outline: 0px;\n  border: none;\n  padding: 0px; }\n\n#save:hover {\n  background-color: #54C7FC; }\n\n#save:disabled {\n  background-color: gray; }\n\n#body {\n  padding-bottom: 75px;\n  resize: none;\n  -webkit-appearance: textfield;\n  height: 35px; }\n\n.up-vote, .down-vote, #title, #body, #search {\n  outline: 0; }\n\n.task-complete {\n  background-color: white; }\n\n#card-buttons {\n  display: flex;\n  justify-content: flex-end; }\n\n#box {\n  color: #6d6e71; }\n\n::-webkit-input-placeholder {\n  font-size: 1.1em;\n  letter-spacing: 1px;\n  padding-left: 3px; }\n\n[contenteditable=\"true\"]:active, [contenteditable=\"true\"]:focus {\n  border: none;\n  outline: none; }\n\n.card-delete {\n  background: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../images/buttons-sprite.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") -6px -6px no-repeat;\n  width: 30px;\n  height: 30px;\n  border: none; }\n\n.up-vote {\n  background: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../images/buttons-sprite.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") no-repeat -38px 0px;\n  width: 20px;\n  height: 38px; }\n\n.down-vote {\n  background: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../images/buttons-sprite.svg\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ") no-repeat 0px -35px;\n  width: 20px;\n  height: 38px;\n  margin-left: 10px; }\n\n.task-complete {\n  width: auto; }\n\n.completed {\n  opacity: 0.1; }\n\n@media screen and (min-width: 300px) {\n  li {\n    padding: 2px 0 2px 5px; } }\n\n@media screen and (min-width: 600px) {\n  #body {\n    padding: 0px 2px 0px 2px;\n    height: 50px; } }\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);