console.log('Welcome to notes app.this is app.js')


// start
showNotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    console.log(notesObj);

    showNotes();
})

//for show function
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">delete note</button>
        </div>
    </div>`;
    });

    let noteselm = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `Nothing to show! use 'Add a note' section above to add notes.`;
    }
}


//function to delete note.

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();
}


let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("input event", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})