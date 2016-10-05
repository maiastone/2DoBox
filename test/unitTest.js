const assert = require('chai').assert;
const Task = require('../lib/task.js')
require('../lib/2Do.js')

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
