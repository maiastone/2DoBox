module.exports = function(task, convertedImportance){
  return `
  <li id=${task.id}>

    <header class="card-header card-buttons">
      <button class="task-complete" tabindex="0">Completed</button>
      <label for="card-delete"></label>
      <button class="card-delete" aria-label="delete task" tabindex="0"></button>
    </header>

    <main>
      <h2 class="card-title" contenteditable="true">${task.title}</h2>
      <p class="card-body" contenteditable="true">${task.body}</p>
    </main>

    <footer class="card-footer">
      <button class="up-vote vote" aria-label="increase task importance" tabindex="0"></button>
      <button class="down-vote vote" aria-label="decrease task importance" tabindex="0"></button>
      <p class="importance-level">Importance: <span class="importance-text">${convertedImportance}</span></p>
    </footer>

  </li>`;
}
