var $titleInput = $('#title');
var $bodyInput = $('#body');

function addNewCard() {
$('.card').prepend(`<header>
  <h3 class="card-title">${$titleInput.val()}</h3>
  <button class="card-delete">delete</button>
</header>
<p class="card-body">${$bodyInput.val()}</p>
<footer>
  <button class="up-vote">up</button>
  <button class="down-vote">down</button>
  <p class="quality">Quality</p>
</footer>`);
}

$('#save').on('click', function() {
  addNewCard();
});


$('.card').on('click', '.card-delete', function() {
  $('.card').remove();
});
