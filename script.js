
function addNewCard() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  $('.cards').prepend($titleInput);
  $('.cards').append($bodyInput);
}


$('#save').on('click', function() {
  addNewCard();
});
