// DECLARATIONS
const addNote = document.querySelector('#addNote')
const notes = JSON.parse(localStorage.getItem('notes'))
const allNotes = document.querySelector('.all-notes');
const deleteAll = document.querySelector('.delete-note')
if(notes){
    notes.forEach(note=>{
        addNotes(note)
    })
}
// ADD NOTE TO DOCUMENT
addNote.addEventListener('click',()=>{
    addNotes()
})
deleteAll.addEventListener('click',()=>{
    allNotes.remove()
    saveNote()
})
// ADD NOTE FUNCTION 
function addNotes(text = ''){
    const notes = document.createElement('div')
    notes.classList.add('note')
    notes.innerHTML =
    `
    <span class="delete">
        <i class="font-weight-bold">X</i>
    </span>
    
    <textarea class='noteText' rows='5' cols='10' maxlength='240'>${text}</textarea>`
    allNotes.appendChild(notes)

    const deleteButton = notes.querySelector('.delete')
    const textArea = notes.querySelector('textarea')    
    textArea.addEventListener('keyup',()=>{
        saveNote()
    })
    deleteButton.addEventListener('click',()=>{
        notes.remove()
        saveNote()
    })
}
// SAVE NOTES TO LOCAL STORAGE 
function saveNote(){
    const noteText = document.querySelectorAll('.noteText');
    let notes = []
    noteText.forEach(note=> {
        if(note.value){
          notes.push(note.value)
        }
    });
    localStorage.setItem('notes',JSON.stringify(notes))
}