function Task (title, body, id = Date.now(), importance = 3, completed = false) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.importance = importance;
  this.completed = completed;
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
