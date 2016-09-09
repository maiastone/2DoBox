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
        <h2 class="card-title" contenteditable="true" onkeyup="">${title}</h2>
        <button class="card-delete">delete</button>
      </header>
      <p class="card-body" contenteditable="true" onkeyup="addEntry">${body}</p>
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



// var i=0;
// var qualities = ['swill', 'plausible', 'genius'];
//
// $.each(qualities, function(index, value){
//   console.log(value);
//   return (value !== 'genius');
// });

// $('.up-vote').on('click', function () {
//

// on click of upvote, loop through the array and increase the value by 1.  var current = document.querySelector("#currentnote");

function vote() {

  var i=0;
  var qualities = ['swill', 'plausible', 'genius'];

  $.each(qualities, function(index, value){
    console.log(value);
    return (value !== 'genius');
  });

  $('.up-vote').on('click', function () {
      i = (i + 1) % qualities.length;
      console.log(value);

      // $('.quality').replaceAll(value);
  });
}
vote();
