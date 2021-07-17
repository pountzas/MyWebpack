export default class Status {
  validation() {
    if (this.checked === true) {
      this.nextSibling.style['text-decoration'] = 'line-through';
      this.nextSibling.style.color = '#909090';
      // Save in Local Storage
      Status.saveChanges();
    } else {
      this.nextSibling.style['text-decoration'] = 'none';
      this.nextSibling.style.color = '#000';
      // Save in Local Storage
      Status.saveChanges();
    }
  }

  static saveChanges() {
    const newList = [];
    const listLi = document.querySelectorAll('.item');
    for (let i = 0; i < listLi.length; i += 1) {
      newList.push({
        index: i + 1,
        description: listLi[i].firstChild.firstChild.nextSibling.value,
        completed: listLi[i].firstChild.firstChild.checked,
      });
    }
    localStorage.setItem('ToDoList', JSON.stringify(newList));
  }
}