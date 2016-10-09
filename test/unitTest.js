const assert = require('chai').assert;
const Task = require('../lib/task.js')
const ToDoList = require('../lib/2Do.js')

describe('Task Object Unit Tests', function(){
  var task = new Task();

  it('Task should be an object', function(){
    assert.isObject(task, true);
  });

  it('Task should have a default importance of 3', function(){
    assert.equal(task.importance, 3);
  });

  it('Task should have a default completed status of false', function(){
    assert.equal(task.completed, false);
  })

  it('Task.upVote should decrease importance by 1', function(){
    var startingImportance = task.importance;
    task.upVote();
    assert.equal(task.importance, startingImportance-1)
  })

  it('Task.downVote should increase importance by 1', function(){
    var startingImportance = task.importance;
    task.downVote();
    assert.equal(task.importance, startingImportance+1)
  })

  it('Task.editTitle should change the title of the task to the input', function(){
    task.editTitle('new title');
    assert.equal(task.title, 'new title')
  })

  it('Task.editBody should change the body of the task to the input',
  function(){
    task.editBody('new body')
    assert.equal(task.body, 'new body')
  })
})

describe('2DoBox unit tests',function(){

  localStorage.clear();
  toDoList = ToDoList;
  console.log(toDoList.taskArray.length)

  toDoList.taskArray = [];


  it('ToDoList.add should add a new task to the list', function(){

    assert.equal(toDoList.taskArray.length, 0)
    toDoList.addTask('title', 'body')
    assert.equal(toDoList.taskArray.length, 1)
    assert.equal(toDoList.taskArray[0].title, 'title')
    assert.equal(toDoList.taskArray[0].body, 'body')
  })

  it('ToDoList.removeTask should remove a task from the list', function(){
    var startCount = toDoList.taskArray.length
    toDoList.removeTask(toDoList.taskArray[0].id)
    assert.equal(toDoList.taskArray.length, startCount - 1);
  })

})
