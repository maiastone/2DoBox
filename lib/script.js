
$('document').ready(function(){
  populateDomFromLocalStorage();
});

if (localStorage.getItem('ideaBox')) {
  ideaBox = JSON.parse(localStorage.getItem('ideaBox'));
} else {
  ideaBox = [];
}


function Idea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
}




function populateDomFromLocalStorage () {
  if (ideaBox.length !== 0) {
    var ideas = JSON.parse(localStorage.getItem('ideaBox'));
    ideas.forEach(function(idea){
      addNewCard(idea.title, idea.body, idea.id, idea.quality);
    });
  }
}

function buildAndRenderIdea(title, body, id, quality) {
  var idea = new Idea(title, body);
  addNewCard(idea.title, idea.body, idea.id, idea.quality);
  addEntry(idea);
  storeIdeasPlease();
}

function addEntry (idea) {
  ideaBox.push(idea);
}

function clearIdeaInput() {
  $('#title').val('');
  $('#body').val('');
}

function findIdeaById(id) {
  return this.ideaBox.find(function(idea){
  return idea.id === id;
  });
}

function removeIdea (id) {
  return ideaBox.filter(function(idea){
  return parseInt(id) !== idea.id;
  });
}

function editQuality (id, newQuality) {
  var idea = findIdeaById(id);
  idea.quality = newQuality;
  storeIdeasPlease();
}

function editTitle (id, newTitle) {
  var idea = findIdeaById(id);
  idea.title = newTitle;
  storeIdeasPlease();
}

function editBody (id, newBody) {
  var idea = findIdeaById(id);
  idea.body = newBody;
  storeIdeasPlease();
}

function storeIdeasPlease () {
  localStorage.setItem('ideaBox', JSON.stringify(ideaBox));
}

function addNewCard(title, body, id, quality) {
  $('.card').prepend(`
    <li id=${id}>
    <header class="card-header">
      <h2 class="card-title" contenteditable="true">${title}</h2>
      <button class="card-delete"></button>
    </header>
    <p class="card-body" contenteditable="true">${body}</p>
    <footer class="card-footer">
      <button class="up-vote vote"></button>
      <button class="down-vote vote"></button>
      <p class="quality-level">Quality: <span class="idea-quality-level">${quality}</span></p>
    </footer></li>`
  );
}

$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id);
  this.closest('li').remove();
  storeIdeasPlease();
});

$('#save').on('click', function() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();
});

$('.ideas').on('blur','.card-title', function () {
  var id = parseInt($(this).parents('li').prop('id'));
  var newTitle = $(this).text();
  editTitle(id, newTitle);
});

$('.ideas').on('blur','.card-body', function () {
  var id = parseInt($(this).parents('li').prop('id'));
  var newBody = $(this).text();
  editBody(id, newBody);
});

$('ul').on('click', '.up-vote', function () {

  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();
  if (this.id === this.id && quality === 'swill') {
   var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
   editQuality(id, newQuality.text());
   return newQuality;
  } else if (this.id === this.id && quality === 'plausible') {
      var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('genius');
      editQuality(id, newQuality.text());
      return newQuality;
  }
});

$('ul').on('click', '.down-vote', function () {
  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();
  if (this.id === this.id && quality === 'genius') {
   var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
   editQuality(id, newQuality.text());
   return newQuality;
  } else if (this.id === this.id && quality === 'plausible') {
      var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('swill');
      editQuality(id, newQuality.text());
      return newQuality;
  }
});

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
