
function addNewCard() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  $('.card-title').prepend($titleInput);
  $('.card-body').append($bodyInput);
}


$('#save').on('click', function() {
  addNewCard();
});
