function Idea (title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'swill';
}

// on click submit make new ideabox
var ideaBox = {
  idea: [];
  addIdea: addIdea();
  removeIdea:
  storeAndRetrieveIdea:
  renderIdea: renderIdea();
                    // filterIdea:
}

function addidea () {
  this.idea.push(newIdea(title, body))

}

function removeIdea () {
  var id = parseInt(id);
  this.idea = this.idea.filter(function(idea) {
    return idea.id !== id;
    storeAndRetrieveIdea();
  });
  })
}

function storeAndRetrieveIdea() {
  localStorage.setItem('ideas', JSON.stringify(this.idea));

  var retrieve = JSON.parse(localStorage.getItem('ideabox'));

  // go through the ideabox when you find the id, get the idea and give it back to me.



function renderIdea(title, body, id, quality) {
  $('.card').prepend(`
    <li id=${id}>
      <header id="card-header">
        <h2 class="card-title" contenteditable="true" onkeyup="">${title}</h2>
        <button class="card-delete">delete</button>
      </header>
      <p class="card-body" contenteditable="true" onkeyup="">${body}</p>
      <footer id="card-footer">
        <button class="up-vote">up</button>
        <button class="down-vote">down</button>
        <p class="quality">quality: </p>
      </footer></li>`
    );
}
