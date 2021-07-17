import updateStorage from './storage';
import sortList from './index';

let dragged;
const container = document.getElementById('list');
const dragStart = document.addEventListener('dragstart', (event) => {
  dragged = event.target;
  event.target.style.opacity = 0.5;
}, false);

const dragEnd = document.addEventListener('dragend', (event) => {
  event.target.style.opacity = '';
}, false);

const dragOver = document.addEventListener('dragover', (event) => {
  event.preventDefault();
}, false);

const drop = document.addEventListener('drop', (event) => {
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

export default {
  dragStart, dragEnd, dragOver, drop,
};
