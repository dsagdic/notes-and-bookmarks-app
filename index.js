let myNotes = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const notesFromLocalStorage = JSON.parse(localStorage.getItem('myNotes'));
const tabBtn = document.getElementById('tab-btn');

function render(notes) {
  let listItems = '';
  for (let i = 0; i < notes.length; i += 1) {
    listItems += `
            <li>
                <a target='_blank' href='${notes[i]}'>
                    ${notes[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

if (notesFromLocalStorage) {
  myNotes = notesFromLocalStorage;
  render(myNotes);
}

tabBtn.addEventListener('click', () => {
  // eslint-disable-next-line
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    myNotes.push(tabs[0].url);
    localStorage.setItem('mynotes', JSON.stringify(myNotes));
    render(myNotes);
  });
});

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myNotes = [];
  render(myNotes);
});

inputBtn.addEventListener('click', () => {
  myNotes.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('mynotes', JSON.stringify(myNotes));
  render(myNotes);
});
