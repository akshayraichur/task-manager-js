const addNewTask = (event) => {
  // Instead of the below, we can do parentNode.parentNode
  // const parentElement = event.path.find((item) => {
  //   if (item.classList) return item.classList.contains('project-container');
  //   else return false;
  // });

  // console.log(parentElement);

  const addNewCardContainer = event.target.parentNode;
  const cardDescription = event.target.previousElementSibling;
  const cardTitle = cardDescription.previousElementSibling;

  const projectRoot = event.target.parentNode.parentNode;

  if (cardTitle.value.trim() && cardDescription.value.trim()) {
    const newCardContainer = document.createElement('div');
    newCardContainer.classList.add('card-container');

    newCardContainer.innerHTML = `
        <div class="card-heading">
          <h5 class="card-title">${cardTitle.value}</h5>
          <button class="close-card-btn">
              <i class="fas fa-close close-card"></i>
            </button>
        </div>
        <p class="card-description">${cardDescription.value}</p>
        <select name="task-progress" id="task-progress" class="task-progress">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="in-review">In Review</option>
            <option value="testing">Testing</option>
            <option value="completed">Completed</option>
          </select>
      `;

    projectRoot.insertBefore(newCardContainer, addNewCardContainer);

    // let oldData = JSON.stringify(localStorage.getItem('tasks'));

    // let allCards = projectRoot.querySelectorAll('.card-container');

    cardTitle.value = '';
    cardDescription.value = '';
  }
};

const deleteTask = (event) => {
  // TODO: Evaluate the below process
  // this is not an effecient process if we decide to have much more elements in the future.
  // in such case, it would be good to use event.path but this would loop through an array to find out. whose complexity will be o(n)
  const targetCardContainer = event.target.parentNode.parentNode.parentNode;
  const projectRoot = event.target.parentNode.parentNode.parentNode.parentNode;

  projectRoot.removeChild(targetCardContainer);
};

const addNewProject = (event) => {
  const mainContainer = event.target.parentNode.parentNode.parentNode;
  const currentProjectContainer = event.target.parentNode.parentNode;

  const inputEl = event.target.previousElementSibling;
  if (inputEl.value.trim()) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');
    projectContainer.setAttribute('data-project-name', inputEl.value);
    projectContainer.innerHTML = `
    <div class="title-container">
      <h4>${inputEl.value}</h4>
      <button class="close-btn">
        <i class="fas fa-close project-close-btn"></i>
      </button>
    </div>
    <div class="add-new-card">
      <input
        type="text"
        placeholder="Card title...."
        class="card-new-title common-input-styles"
      />
      <input
        type="text"
        placeholder="Card description...."
        class="card-new-description common-input-styles"
      />
      <button class="add-new-card-btn common-btn-styles">Add</button>
    </div>
    `;

    mainContainer.insertBefore(projectContainer, currentProjectContainer);

    let oldData = JSON.parse(localStorage.getItem('projects'));
    let newData = oldData ? [...oldData, inputEl.value] : [inputEl.value];
    localStorage.setItem('projects', JSON.stringify(newData));

    inputEl.value = '';
  }
};

const deleteProject = (event) => {
  const mainContainer =
    event.target.parentNode.parentNode.parentNode.parentNode;
  const projectContainer = event.target.parentNode.parentNode.parentNode;
  mainContainer.removeChild(projectContainer);
};

const handleClickListener = (event) => {
  if (event.target.classList.contains('add-new-card-btn')) {
    addNewTask(event);
  }

  if (event.target.classList.contains('close-card')) {
    deleteTask(event);
  }

  if (event.target.classList.contains('add-new-list-btn')) {
    addNewProject(event);
  }

  if (event.target.classList.contains('project-close-btn')) {
    deleteProject(event);
  }
};

const App = () => {
  document.addEventListener('click', handleClickListener);
};

App();
