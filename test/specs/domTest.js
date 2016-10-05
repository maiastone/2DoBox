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
