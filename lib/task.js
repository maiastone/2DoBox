


function Task (title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 3 ;
}


Task.prototype.upVote = function () {
  // var idea = findIdeaById(id);
  // idea.quality = newQuality;
  // if (this.importance < 5) {
  //   this.importance ++;
  //   }

  this.importance < 5 ? this.importance++ : this.importance;



  storeIdeasPlease();
};

Task.prototype.downVote = function () {
  var idea = findIdeaById(id);
  idea.quality = newQuality;
  storeIdeasPlease();
};





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


module.exports = Task;
