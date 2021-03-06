module.exports = function(task, convertedImportance){
  return `
  <li id=${task.id}>

    <header class="card-header">

      <h2 class="card-title" contenteditable="true" title="task title">${task.title}</h2>

      <nav class="card-buttons">
        <button class="task-complete" aria-label="mark complete" tabindex="0">Complete</button>
        <button class="card-delete" aria-label="delete task" tabindex="0"></button>
      </nav>

    </header>

    <main>
      <p class="card-body" contenteditable="true">${task.body}</p>
    </main>

    <footer class="card-footer">
      <button class="up-vote vote" aria-label="increase task importance" tabindex="0"></button>
      <button class="down-vote vote" aria-label="decrease task importance" tabindex="0"></button>
      <p class="importance-level">Importance: <span class="importance-text">${convertedImportance}</span></p>
    </footer>

  </li>`;
}
