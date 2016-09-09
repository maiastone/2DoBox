
// array of new ideas//
// var array = JSON.parse(stringIdea);

// var ideaBox = JSON.parse(localStorage.ideas) || []

// window.onload =
//
// function loadElementsOnPage() {
//
// }


var ideaBox = [];

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
  ideaBox = removeIdea(this.closest('li').id)
  this.closest('li').remove();
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
})

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id
  })
}

// function findThisIdea (id) {
//   ideaBox.forEach(function(idea) {
//     if (idea.id === parse(id)) {
//     return idea;
//     }
//   });
// };

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



// function searchIdeas() {
//   var $searchValue = $('#search').val();
//   if ($inputTitle.val() || $inputBody.val() === $searchValue.val()) {
//     ideas.document.style.visibility = visible;
//   } else {
//     ideas.document.style.visibility = hidden;
//   }
// }

$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id)
  debugger
  this.closest('li').remove();
  // ideaBox.splice(this.closest('li'),1);
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
})

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id
  })
}
