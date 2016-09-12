
$('document').ready(function(){
  populateDomFromLocalStorage();
});


if (localStorage.getItem('ideaBox')) {
  ideaBox = JSON.parse(localStorage.getItem('ideaBox'));
} else {
  ideaBox = [];
}


$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id);
  this.closest('li').remove();
  storeIdeasPlease();

});


function Idea (title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'swill';
}

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id;
  });

}


$('#save').on('click', function() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();
});



function populateDomFromLocalStorage () {
  var ideas = JSON.parse(localStorage.getItem('ideaBox'));
  ideas.forEach(function(idea){
    addNewCard(idea.title, idea.body, idea.id, idea.quality);
  });
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



function addNewCard(title, body, id, quality) {
  $('.card').prepend(`
    <li id=${id}>
      <header id="card-header">
        <h2 class="card-title" contenteditable="true" onkeyup="">${title}</h2>
        <button class="card-delete"></button>
      </header>
      <p class="card-body" contenteditable="true" onkeyup="addEntry">${body}</p>
      <footer id="card-footer">
        <button class="up-vote"></button>
        <button class="down-vote"></button>
         <p class="quality-level">Quality: <span class="idea-quality-level">${quality}</span></p>
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
   var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
    editQuality(id, newQuality.text());
    return newQuality;
      } else if (this.id === this.id && quality === 'plausible') {
        var newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('genius');
        editQuality(id, newQuality.text());
          return newQuality;
  }
});

function editQuality (thisID, newQuality) {
  var idea = findIdeaById(thisID);
  idea.quality = newQuality;
  storeIdeasPlease();
}


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

// $('ul').on('click', '.down-vote', function () {
//   var id = parseInt($(this).parent().parent().attr('id'));
//   var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();
//
//   if (this.id === this.id && quality === 'genius') {
//     newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();
//     return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
//       } else if (this.id === this.id && quality === 'plausible') {
//         newQuality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('swill');
//         debugger;
//           return newQuality;
//   }
//
//   editQuality(id, newQuality.text());
//
// });




function storeIdeasPlease () {
  localStorage.setItem('ideaBox', JSON.stringify(ideaBox));
}

//store to local, clear the page, render again with new stuff


// needs to store also

// function storeIdea () {
//
// localStorage.setItemideasstringify
//
// }




$('.ideas').on('blur','.card-title', function () {
var thisID = parseInt($(this).parents('li').prop('id'));
var newTitle = $(this).text();
editTitle(thisID, newTitle);

});

function findIdeaById(thisID) {
  return this.ideaBox.find(function(idea){
    return idea.id === thisID;
  });
}

//   search ideabox array for an idea by the id
//   return the idea that matches this ID
//   don't forget to parseInt the ID
// }

// ideaBox.find(thisID).editTitle(newTitle);

function editTitle (thisID, newTitle) {
  var idea = findIdeaById(thisID);
  idea.title = newTitle;
  storeIdeasPlease();
}

function editBody (body) {
  this.body = body;
}

//TODO: get edit body working
//TODO: get down-vote working
//TODO: get rid of comments
//TODO: clean up and refactor
//TODO: function to set key 13 to trigger blur
