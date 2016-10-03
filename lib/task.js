


function Task (title, body, id, importance) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 3 ;
}


Task.prototype.upVote = function () {
  this.importance < 5 ? this.importance++ : this.importance;
};

Task.prototype.downVote = function () {
  this.importance > 0 ? this.importance-- : this.importance;
};


Task.prototype.editTitle = function (newTitle) {
  this.title = newTitle;
};

Task.prototype.editBody = function (newBody) {
  this.body = newBody;
};


module.exports = Task;
