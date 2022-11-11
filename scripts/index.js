import { managementContainer } from './constants.js';

const addNewTask = (event) => {
  const addNewCardContainer = event.target.parentNode;
  const cardDescription = event.target.previousElementSibling;
  const cardTitle = cardDescription.previousElementSibling;

  // instead of having to run a loop, we can get the data like this as well.
  const attributeName = event.target.getAttribute('data-project-name');
  const projectRoot = managementContainer.querySelector(
    `[data-project-name="${attributeName}"]`
  );

  // event.path gives out the path through which event got bubbled up.
  // in this path, we are finding the parent element of the container.
  // const projectRoot = event.path.find((el) =>
  //   el.classList?.contains('project-container')
  // );

  // const projectRoot = event.target.parentNode.parentNode;

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

    cardTitle.value = '';
    cardDescription.value = '';
  }
};

const deleteTask = (event) => {
  /**
   * this is not an effecient process if we decide to have much more elements in the future. in such case, it would be good to use event.path but this would loop through an array to find out. whose complexity will be o(n)
   */
  // const targetCardContainer = event.target.parentNode.parentNode.parentNode;
  // const projectRoot = event.target.parentNode.parentNode.parentNode.parentNode;

  const targetCardContainer = event.path.find((el) =>
    el.classList?.contains('card-container')
  );
  const projectRoot = event.path.find((el) =>
    el.classList?.contains('project-container')
  );

  projectRoot.removeChild(targetCardContainer);
};

const addNewProject = (event) => {
  // managementContainer
  const mainContainer = event.path.find((el) =>
    el.classList?.contains('management-container')
  );
  const currentProjectContainer = event.path.find((el) =>
    el.classList?.contains('project-container')
  );

  // const mainContainer = event.target.parentNode.parentNode.parentNode;
  // const currentProjectContainer = event.target.parentNode.parentNode;

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
      <button class="add-new-card-btn common-btn-styles" data-project-name="${inputEl.value}">Add</button>
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
  const mainContainer = event.path.find((el) =>
    el.classList?.contains('management-container')
  );

  const projectContainer = event.path.find((el) =>
    el.classList?.contains('project-container')
  );

  // const mainContainer =
  //   event.target.parentNode.parentNode.parentNode.parentNode;
  // const projectContainer = event.target.parentNode.parentNode.parentNode;
  mainContainer.removeChild(projectContainer);
};

const updateTaskProgress = (event) => {
  if (event.target.value === 'completed') {
    const cardContainer = event.target.parentNode;
    const projectContainer = event.target.parentNode.parentNode;

    const cardDescription = event.target.previousElementSibling;
    const cardTitle = cardDescription.previousElementSibling;

    const completedTasks = document.querySelector('.completed');
    const newCompletedTask = document.createElement('div');
    newCompletedTask.className = 'completed-card card-container';
    newCompletedTask.innerHTML = `
      <div class="card-heading">
        <h5 class="card-title">${cardTitle.textContent}</h5>
      </div>
      <p class="card-description">${cardDescription.textContent}</p>
    `;

    completedTasks.appendChild(newCompletedTask);

    // before this, add it inside completed tasks
    projectContainer.removeChild(cardContainer);
  }
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

const handleChangeListener = (e) => {
  if (e.target.classList.contains('task-progress')) {
    updateTaskProgress(e);
  }
};

const App = () => {
  document.addEventListener('click', handleClickListener);
  document.addEventListener('change', handleChangeListener);
};

App();
