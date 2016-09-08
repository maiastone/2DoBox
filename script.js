// saveButtonEnabled();
//
// function saveButtonEnabled () {
// if($('#title').val('') || $('#body').val('')) {
// disableSaveButton.disabled = true;
// } else {
// disableSaveButton.disabled = false;
//   }
// };
//
// var disableSaveButton = document.querySelector('#save');

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


// array of new ideas//
// var array = JSON.parse(stringIdea);

var ideaBox = [];
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
  //this delete button
  //this delete button has a parent with an idea id
  this.closest('li').remove();
  ideaBox.splice(this.closest('li'),1);
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);

  //delete from localStorage as well as site
})
  // this.closest('li').id;
  // console.log(this.closest('li').id);





// stringify this new idea and set it to localStorage

// store new ideas into array available everywhere and set into localStorage
// push each new item into array

// $('.card').on('click', '.card-delete', function() {
//   $('.card').remove();
// });
