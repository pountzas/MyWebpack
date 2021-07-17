import './style.css';
import updateStorage from './storage';
import checkStatus from './status';

const list = [
  {
    description: 'test',
    completed: false,
    index: 0,
  },
  {
    description: 'test 2',
    completed: false,
    index: 1,
  },
  {
    description: 'test 3',
    completed: false,
    index: 2,
  },
  {
    description: 'test 4',
    completed: false,
    index: 3,
  },
];

let sortList = list.sort((a, b) => a.index - b.index);

function listShow() {
  for (let i = 0; i < sortList.length; i += 1) {
    const checked = sortList[i].completed === 'true' ? 'checked' : '';
    document.getElementById('list').insertAdjacentHTML('beforeend', `
    <div class="listItem" draggable="true">
      <div>
        <input class="checkbox" ${checked} id="${i}" type="checkbox">  
        <p>${sortList[i].description}</p>
      </div>
      <button type="button">
        <img src="https://static.thenounproject.com/png/2854151-200.png" width="12" alt="Dots">
      </button>
    </div>`);
  }
}

if (localStorage.getItem('index') === null) {
  window.onload = listShow();
} else {
  const descr = localStorage.getItem('description') ? localStorage.getItem('description').split(',') : [];
  const completed = localStorage.getItem('completed') ? localStorage.getItem('completed').split(',') : [];
  sortList = [];
  for (let i = 0; i < completed.length; i += 1) {
    const obj = {
      description: descr[i],
      completed: completed[i],
      index: i,
    };
    sortList.push(obj);
  }
  window.onload = listShow();
}

let dragged;
const container = document.getElementById('list');
document.addEventListener('dragstart', (event) => {
  dragged = event.target;
  event.target.style.opacity = 0.5;
}, false);

document.addEventListener('dragend', (event) => {
  event.target.style.opacity = '';
}, false);

document.addEventListener('dragover', (event) => {
  event.preventDefault();
}, false);

document.addEventListener('drop', (event) => {
  event.preventDefault();
  dragged.parentNode.insertBefore(dragged, event.target);
  if (dragged !== event.target) {
    const targetId = event.target.children[0].children[0].id;
    const draggedId = dragged.children[0].children[0].id;
    event.target.children[0].children[0].id = draggedId;
    dragged.children[0].children[0].id = targetId;

    localStorage.clear();
    for (let i = 0; i < container.children.length; i += 1) {
      sortList = [];
      const obj = {
        description: dragged.parentNode.children[i].firstElementChild.lastElementChild.textContent,
        completed: dragged.parentNode.children[i].firstElementChild.firstElementChild.checked,
        index: i,
      };
      sortList.push(obj);
      updateStorage(obj);
    }
  }
}, false);

const checkboxes = document.querySelectorAll('.checkbox');

for (let i = 0; i < checkboxes.length; i += 1) {
  checkboxes[i].addEventListener('change', (event, sortList) => {
    checkStatus(event, sortList);
  }, false);
}