// array of new ideas//
// var array = JSON.parse(stringIdea);

// var ideaBox = JSON.parse(localStorage.ideas) || []

var ideaBox;
if(localStorage.getItem('ideas')) {
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
      <p class="card-body" contenteditable="true">${body}</p>
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
      debugger;
      // $('.quality').replaceAll(value);
  });
}
vote();
