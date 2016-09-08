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
  $('.card').prepend(`<section id=${id}><header><h3 class="card-title">${title}</h3>
    <button class="card-delete">delete</button>
  </header>
  <p class="card-body">${body}</p>
  <footer>
    <button class="up-vote">up</button>
    <button class="down-vote">down</button>
    <p class="quality">Quality</p>
  </footer></section>`);
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
  var stringIdea = JSON.stringify(idea);
  localStorage.setItem('ideas', stringIdea);
}

function clearIdeaInput(){
  $('#title').val('')
  $('#body').val('')
};


// stringify this new idea and set it to localStorage

// store new ideas into array available everywhere and set into localStorage
// push each new item into array

// $('.card').on('click', '.card-delete', function() {
//   $('.card').remove();
// });
