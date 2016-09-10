
var ideaBox;

$('document').ready(function(){
  populateDomFromLocalStorage();
});

//why do we need this code?????? project breaks without it. needs to be a part of the populate function
if(localStorage.getItem('ideas')) {
  ideaBox = JSON.parse(localStorage.getItem('ideas'));
} else {
  ideaBox = [];
}

$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id)
  this.closest('li').remove();
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
})

$('#save').on('click', function() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();
});

function populateDomFromLocalStorage () {
  var ideas = JSON.parse(localStorage.getItem('ideas'));
  ideas.forEach(function(idea){
    addNewCard(idea.title, idea.body, idea.id);
  });
}

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

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id
  })
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
         <p class="quality-level">Quality: <span class="idea-quality-level">${'Swill'}</span></p>
      </footer></li>`
    );
}

$(document).ready(function(){
    $('#search').keyup(function(){
        var filter = $(this).val(), count = 0;
        $('.card li').each(function(){

            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              debugger
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
    });
});


$('ul').on('click', '.up-vote', function () {
  ideaBox = upVoteIdea(this.closest('.quality-inner-text').id)
  this.closest('.quality-inner-text').val();
  stringIdeas = JSON.stringify(ideaBox);
  localStorage.setItem('ideas', stringIdeas);
})


function upVoteIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) === idea.id
  })
}

idea.prototype.levelUp = function () {
  this.level++;
  ideaBox.store();
};

idea.prototype.levelDown = function () {
  if (this.level > 1) {
    this.level--;
    ideaBox.store();
  }
};

// function levelUpPlausible () {
//   if ('.quality-inner-text' === )
// }


//
//
// $(function(id) {
//   var editable = $('.card-title');
//   $(editable).blur(function (id) {
//     findID(id);
//     var currentIdea = findID(id);
//     currentIdea.title = title;
// });
//
//   if(localStorage.getItem(ideaBox)) {
//     editable.innerHTML = localStorage.getItem(ideaBox);
// }
// });
//
// function findID(id) {
//   return ideaBox.filter(function(idea) {
//   return parseInt(id) === idea.id;
// });
// }
