
var ideaBox = [];


$('document').ready(function(){
  populateDomFromLocalStorage();
});

//why do we need this code?????? project breaks without it. needs to be a part of the populate function
if (localStorage.getItem('ideas')) {
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

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id
  })
}

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

function Idea (title, body, quality) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = quality || 'swill';
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
         <p class="quality-level">Quality: <span class="idea-quality-level">${'swill'}</span></p>
      </footer></li>`
    );
}

$(document).ready(function(){
    $('#search').keyup(function(){
        var filter = $(this).val(), count = 0;
        $('.card li').each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
    });
});

$('ul').on('click', '.up-vote', function () {
  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();

  if (this.id === this.id && quality === 'swill') {
    return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
      } else if (this.id === this.id && quality === 'plausible') {
          return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('genius');
  }

    storeIdeasPlease ();
    populateDomFromLocalStorage ();
});


$('ul').on('click', '.down-vote', function () {
  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();

  if (this.id === this.id && quality === 'genius') {
    return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
      } else if (this.id === this.id && quality === 'plausible') {
          return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('swill');
  }
      storeIdeasPlease ();
      populateDomFromLocalStorage ();
});


function storeIdeasPlease () {
  localStorage.setItem('ideas', ideaBox);
}

//store to local, clear the page, render again with new stuff
