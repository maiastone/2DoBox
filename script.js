var $titleInput = $('#title');
var $bodyInput = $('#body');

function addNewCard() {
$('.card').append(`<header>
  <h3 class="card-title">${$titleInput.val()}</h3>
  <button class="card-delete"></button>
</header>
<p class="card-body">${$bodyInput.val()}</p>
<footer>
  <button class="up-vote"></button>
  <button class="down-vote"></button>
  <p class="quality">Quality</p>
</footer>`);
}


$('#save').on('click', function() {
  addNewCard();
});
