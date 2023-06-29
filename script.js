let captions = [];
let notes = [];
let deletedCaptions = [];
let deletedNotes = [];
load();

function darkMode() {
    document.getElementById('brightmode').classList.remove('hide');
    document.getElementById('darkmode').classList.add('hide');
    document.body.classList.add('dark-mode');
    document.body.classList.remove('bright-mode');
}

function brightMode() {
    document.getElementById('darkmode').classList.remove('hide');
    document.getElementById('brightmode').classList.add('hide');
    document.body.classList.add('bright-mode');
    document.body.classList.remove('dark-mode');
}

function searchNotes() {
    let input = document.getElementById("searchInput").value;
    let content = document.getElementById("savedNotes");
    content.innerHTML = "";
  
    for (i = 0; i < captions.length; i++) {
      let caption = captions[i];
      let note = notes[i];
  
      if (caption.toLowerCase().includes(input.toLowerCase()) || note.toLowerCase().includes(input.toLowerCase())) {
        content.innerHTML += /*html*/`
          <div class="savedNote">
            <h2>${caption}</h2>
            <span>${note}</span>
            <div class="deletebutton">
              <a href="#" onclick="notesToTrash(${i})">
                <img src="img/trash.png" class="icon-delete">
              </a>
            </div>
          </div>`;
      }
    }
  }

function showNotes() {
    document.getElementById('notebox').classList.remove('hide');
    document.getElementById('notez').classList.add('add-color');
    document.getElementById('notez-mobile').classList.add('add-color');
    document.getElementById('trash').classList.remove('add-color');
    document.getElementById('trash-mobile').classList.remove('add-color');
    let content = document.getElementById('savedNotes');
    content.innerHTML = '';

    for (i = 0; i < captions.length; i++) {
        const caption = captions[i];
        const note = notes[i];

        content.innerHTML += /*html*/`<div class="savedNote">
        <h2>${caption}</h2>
        <span>${note}</span>
        <div class="deletebutton">
        <a href="#" onclick="notesToTrash(${i})"><img src="img/trash.png" class="icon-delete"></a>
        </div>
    </div>`;
    }
}

function showDeletedNotes() {
    document.getElementById('notebox').classList.add('hide');
    document.getElementById('notez').classList.remove('add-color');
    document.getElementById('notez-mobile').classList.remove('add-color');
    document.getElementById('trash').classList.add('add-color');
    document.getElementById('trash-mobile').classList.add('add-color');
    let content = document.getElementById('savedNotes');
    content.innerHTML = '';

    for (i = 0; i < deletedCaptions.length; i++) {
        const deletedCaption = deletedCaptions[i];
        const deletedNote = deletedNotes[i];

        content.innerHTML += /*html*/`<div class="savedNote">
        <h2>${deletedCaption}</h2>
        <span>${deletedNote}</span>
        <div class="deletebutton">
        <a href="#" onclick="notesToNotes(${i})"><img src="img/restore.png" class="icon-delete"></a>
        <a href="#" onclick="deleteNote(${i})"><img src="img/trash.png" class="icon-delete"></a>
        </div>
    </div>`;
    }
}

function showRecycleBin() {
    document.getElementById('notebox').classList.add('hide');
    document.getElementById('recyclebin').classList.remove('hide');
}

function load() {
    let captionsAsText = localStorage.getItem('captions');
    let notesAsText = localStorage.getItem('notes');
    let deletedCaptionsAsText = localStorage.getItem('deletedCaptions');
    let deletedNotesAsText = localStorage.getItem('deletedNotes');
    if (captionsAsText && notesAsText && deletedCaptionsAsText && deletedNotesAsText) {
        captions = JSON.parse(captionsAsText);
        notes = JSON.parse(notesAsText);
        deletedCaptions = JSON.parse(deletedCaptionsAsText);
        deletedNotes = JSON.parse(deletedNotesAsText);
    }
}

function save() {
    let captionsAsText = JSON.stringify(captions);
    let notesAsText = JSON.stringify(notes);
    let deletedCaptionsAsText = JSON.stringify(deletedCaptions);
    let deletedNotesAsText = JSON.stringify(deletedNotes);
    localStorage.setItem('captions', captionsAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('deletedCaptions', deletedCaptionsAsText);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}

function notesToTrash(i) {
    deletedCaptions.push(captions[i]);
    deletedNotes.push(notes[i]);
    captions.splice(i, 1);
    notes.splice(i, 1);

    save();
    render();
}

function notesToNotes(i) {
    captions.push(deletedCaptions[i]);
    notes.push(deletedNotes[i]);
    deletedCaptions.splice(i, 1);
    deletedNotes.splice(i, 1);

    save();
    showDeletedNotes();
}

function deleteNote(i) {
    deletedCaptions.splice(i, 1);
    deletedNotes.splice(i, 1);

    save();
    showDeletedNotes();
}

function addNote() {
    let caption = document.getElementById('title');
    let note = document.getElementById('takenote');

    if (caption.value == '') {
        alert('Please enter your title');
    } else {
        if (note.value == '') {
            alert('Please enter your notes');
        } else {
            captions.push(caption.value);
            notes.push(note.value);
            caption.value = '';
            note.value = '';

            save();
            render();
            displayDateTime();
        }
    }
}

function render() {
    let content = document.getElementById('savedNotes');
    document.getElementById('notez').classList.add('add-color');
    document.getElementById('notez-mobile').classList.add('add-color');
    content.innerHTML = '';

    for (i = 0; i < captions.length; i++) {
        const caption = captions[i];
        const note = notes[i];

        content.innerHTML += /*html*/`<div class="savedNote">
        <h2>${caption}</h2>
        <span>${note}</span>
        <div class="deletebutton">
        <p id="datetime"></p>
        <a href="#" onclick="notesToTrash(${i})"><img src="img/trash.png" class="icon-delete"></a>
        </div>
    </div>`;
    }
}