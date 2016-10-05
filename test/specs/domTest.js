const assert = require('assert');

describe('welcome page', function(){
  it('should be able to grab the page title', function(){
    browser.url('/');
    var title = browser.getTitle();
    assert.equal(title, '2DoList');
  });
});

describe('on save', function(){
  it('should clear the input fields', function(){
    browser.url('/')
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')

    assert.equal(taskTitle.getValue(), "")
    assert.equal(taskBody.getValue(), "")
  });

  it('should add the task to the page and check its validity', function(){
    browser.url('/')
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')

    var taskList = browser.element('#task-list')

    asserts.include( taskList.getText(), taskTitle.getValue())
    asserts.include( taskList.getText(), taskBody.getValue())
  });

  it('should add the task to the page, check validity, refresh page, check validity', function(){
    browser.url('/')

    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')

    taskTitle.setValue('this is a cool title')
    taskBody.setValue('this is a super cool body')

    browser.click('#save')

    var taskList = browser.element('#task-list')

    var titleTextList = taskList.elements('li').elements('.card-title').getText()
    var bodyTextList = taskList.elements('li').elements('.card-body').getText()


    assert.equal(titleTextList[0], 'this is a cool title');
    assert.equal(bodyTextList[0], 'this is a super cool body');

    browser.refresh();

    assert.equal(titleTextList[0], 'this is a cool title');
    assert.equal(bodyTextList[0], 'this is a super cool body');

  });

  it('allows me to upvote the importance of a task', function(){
    browser.url('/');
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')
    var taskList = browser.element('#task-list')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')

    var initialImportance = taskList.elements('li').elements('.importance-text').getText()
    assert.equal(initialImportance[0], 'Normal');
    browser.click('.up-vote')
    var importanceAfterUpvote = taskList.elements('li').elements('.importance-text').getText()
    assert.equal(importanceAfterUpvote[0], 'High');
  });

  it('allows me to downvote the importance of a task', function(){
    browser.url('/');
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')
    var taskList = browser.element('#task-list')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')

    var initialImportance = taskList.elements('li').elements('.importance-text').getText()
    assert.equal(initialImportance[0], 'Normal');
    browser.click('.down-vote')
    var importanceAfterUpvote = taskList.elements('li').elements('.importance-text').getText()
    assert.equal(importanceAfterUpvote[0], 'Low');
  });

  it('allows me to delete a single idea from the page', function(){
    browser.url('/');
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')
    var ideaCountBeforeDelete = browser.elements('li').getText().length;
    browser.click('.card-delete')
    var ideaCountAfterDelete = browser.elements('li').getText().length;
    assert.equal(ideaCountAfterDelete,ideaCountBeforeDelete-1);
  });

  it('allows me to delete a single idea from the page', function(){
    browser.url('/');
    var taskTitle = browser.element('#title')
    var taskBody = browser.element('#body')

    taskTitle.setValue('this is a title')
    taskBody.setValue('this is a body')

    browser.click('#save')
    browser.click('#save')

    var ideaCountBeforeDelete = browser.elements('li').getText().length;

    browser.click('.card-delete')
    browser.click('.card-delete')

    var ideaCountAfterDelete = browser.elements('li').getText().length;

    assert.equal(ideaCountAfterDelete,ideaCountBeforeDelete-2);
  });







});
