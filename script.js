var ideaBox;

$('document').ready(function(){
  populateDomFromLocalStorage();
});

function populateDomFromLocalStorage(){
  var ideas = JSON.parse(localStorage.getItem('ideas'));
  ideas.forEach(function(idea){
    addNewCard(idea.title, idea.body, idea.id);
  });
}

if(localStorage.getItem('ideas')) {
  ideaBox = JSON.parse(localStorage.getItem('ideas'));
} else {
  ideaBox = [];
}


$('#save').on('click', function() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();
});

$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id);
  this.closest('li').remove();
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
});

function Idea (title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'swill';
}



function addNewCard(title, body, id) {
  $('.card').prepend(`
    <li id=${id}>
      <header id="card-header">
        <h2 class="card-title" contenteditable="true" onkeyup="editIdea">${title}</h2>
        <button class="card-delete">delete</button>
      </header>
      <p class="card-body" contenteditable="true" onkeyup="editIdea">${body}</p>
      <footer id="card-footer">
        <button class="up-vote">up</button>
        <button class="down-vote">down</button>
        <p class="quality">quality: </p>
      </footer></li>`
    );
}

function buildAndRenderIdea(title, body) {
  var idea = new Idea(title, body);
  addNewCard(idea.title, idea.body, idea.id);
  addEntry(idea);
  var stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
}

// each new idea is a stringified object
function addEntry (idea) {
   ideaBox.push(idea);
}

function clearIdeaInput() {
  $('#title').val('');
  $('#body').val('');
}



function removeIdea (id) {
  return ideaBox.filter(function(idea) {
  return parseInt(id) !== idea.id;
  });
}

function editIdea (title, body) {
  // update object with new Idea & set to localStorage
  this.title = title;
  this.body = body;
}

//
$(function(id) {
  var editable = $('.card-title');
  $(editable).blur(function (id) {
    findID(id);
    var currentIdea = findID(id);
    currentIdea.title = title;
});
  // debugger;
  if(localStorage.getItem(ideaBox)) {
    editable.innerHTML = localStorage.getItem(ideaBox);
}
});

function findID(id) {
  return ideaBox.filter(function(idea) {
  return parseInt(id) === idea.id;
});
}
