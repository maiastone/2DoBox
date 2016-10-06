function Task (title, body, id, importance, completed) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 3 ;
  this.completed = completed || false;
}


Task.prototype.upVote = function () {
  this.importance > 1 ? this.importance-- : null;
};

Task.prototype.downVote = function () {
  this.importance < 5 ? this.importance++ : null;
};


Task.prototype.editTitle = function (newTitle) {
  this.title = newTitle;
};

Task.prototype.editBody = function (newBody) {
  this.body = newBody;
};


module.exports = Task;
