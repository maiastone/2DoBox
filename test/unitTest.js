const assert = require('chai').assert;
const Task = require('../lib/task.js')
require('../lib/2Do.js')

describe('Task Object Unit Tests', function(){

  var task = new Task();

  it('Task should be an object', function(){
    assert.isObject(task, true);
  });
})
