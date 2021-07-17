/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
import './style.css';
import Status from './status';
import dragStart from './drag';
import dragEnd from './drag';
import dragOver from './drag';
import drop from './drag';

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

// eslint-disable-next-line no-unused-expressions
dragStart; dragEnd; dragOver; drop;

// eslint-disable-next-line import/no-mutable-exports
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

function loadCheckboxes() {
  const checkboxes = document.querySelectorAll('.checks');
  for (let i = 0; i < checkboxes.length; i += 1) {
    const status = new Status();
    checkboxes[i].addEventListener('change', status.validation);
  }
}
document.addEventListener('DOMContentLoaded', loadCheckboxes);

export default sortList;
