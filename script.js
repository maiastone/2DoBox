// array of new ideas//
// var array = JSON.parse(stringIdea);
var ideaBox;

if(localStorage.ideas) {
  ideaBox = JSON.parse(localStorage.getItem('ideas'))
} else {
  ideaBox = [];
}

function addNewCard(title, body, id) {
  $('.card').prepend(`
    <li id=${id}>
      <header>
        <h3 class="card-title">${title}</h3>
        <button class="card-delete">delete</button>
      </header>
      <p class="card-body">${body}</p>
      <footer>
        <button class="up-vote">up</button>
        <button class="down-vote">down</button>
        <p class="quality">Quality</p>
      </footer></li>`
    );
}

$('#save').on('click', function() {

  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();

  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();

});

function Idea (title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'swill';
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

$('ul').on('click', '.card-delete', function () {
  console.log('hello');
  this.closest('li').remove();
  ideaBox.splice(this.closest('li'),1);
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
})


// window.onload = function keepContent () {
//  var storedIdeas = JSON.parse.localStorage;
//   $('.card').prepend(storedIdeas);
// }

// window.onload = function keepContent () {
//   //  console.log();
//   var parseIdeas = JSON.parse(localStorage.getItem(ideaBox));
//   console.log(ideaBox);
// }



// stringify this new idea and set it to localStorage

// store new ideas into array available everywhere and set into localStorage
// push each new item into array

// $('.card').on('click', '.card-delete', function() {
//   $('.card').remove();
// });
