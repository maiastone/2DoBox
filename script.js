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

function Idea (title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'swill';
}



function addNewCard(title, body, id) {
  $('.card').prepend(`
    <li id=${id}>
      <header id="card-header">
        <h2 class="card-title" contenteditable="true">${title}</h2>
        <button class="card-delete"></button>
      </header>
      <p class="card-body" contenteditable="true">${body}</p>
      <footer id="card-footer">
        <button class="up-vote"></button>
        <button class="down-vote"></button>
        <p class="quality-level">quality: <span class="idea-quality-level">${'swill'}</span></p>
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


// needs to store also

// function storeIdea () {
//
// localStorage.setItemideasstringify
//
// }

$('.ideas').on('blur','.card-title', function () {
var thisID = parseInt($(this).parents('li').prop('id'));
var newTitle = $(this).text();

// function editTitle(thisID, newTitle);

});

//function findIdeaById(id) {
  //search ideabox array for an idea by the id
  //return the idea that matches this ID
  //don't forget to parseInt the ID
// }

// ideaBox.find(thisID).editTitle(newTitle);

function editTitle (thisID, newTitle) {
  var idea = findIdeaById(id); //TODO: write this function
  idea.title = newTitle;
  storeIdeasPlease(); //TODO: write this function
}

function editBody (body) {
  this.body = body;
}

function storeIdeasPlease () {
  localStorage.setItem('ideas', ideaBox);
}
