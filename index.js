let myNotes = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const notesFromLocalStorage = JSON.parse(localStorage.getItem('myNotes'));
const tabBtn = document.getElementById('tab-btn');
const allTabsBtn = document.getElementById('all-tabs-btn');

function render(notes) {
  let listItems = '';
  for (let i = 0; i < notes.length; i += 1) {
    if (notes[i][0] === 'icon') {
      listItems += `
            <li>
                <img src='${notes[i][1]}'/>               
        `;
    } else if (notes[i][0] === 'link') {
      listItems += `
            
                <a target='_blank' href='${notes[i][1]}'>
                    ${notes[i][2]}
                </a>
                
            </li>
        `;
    } else if (notes[i][0] === 'text') {
      listItems += `
            <li>
                <p>
                    ${notes[i][1]}
                </p>
            </li>
        `;
    }
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
    myNotes.push(['icon', tabs[0].favIconUrl]);
    myNotes.push(['link', tabs[0].url, tabs[0].title]);
    localStorage.setItem('myNotes', JSON.stringify(myNotes));
    render(myNotes);
  });
});

allTabsBtn.addEventListener('click', () => {
  // eslint-disable-next-line
  chrome.tabs.query({ windowType: 'normal' }, (tabs) => {
    for (let i = 0; i < tabs.length; i += 1) {
      myNotes.push(['icon', tabs[i].favIconUrl]);
      myNotes.push(['link', tabs[i].url, tabs[i].title]);
    }
    localStorage.setItem('myNotes', JSON.stringify(myNotes));
    render(myNotes);
  });
});

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myNotes = [];
  render(myNotes);
});

inputBtn.addEventListener('click', () => {
  myNotes.push(['text', inputEl.value]);
  inputEl.value = '';
  localStorage.setItem('myNotes', JSON.stringify(myNotes));
  render(myNotes);
});
