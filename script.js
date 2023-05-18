// DECLARATIONS
const addNote = document.querySelector('#addNote')
const notes = JSON.parse(localStorage.getItem('notes'))
const allNotes = document.querySelector('.all-notes');
const deleteAll = document.querySelector('.delete-note')
const notesContainer = document.createElement('div')
notesContainer.classList.add('.notes-container', 'd-flex', 'justify-content-start')

if(notes){
    notes.forEach(note=>{
        addNotes(note)
    })
}
// ADD NOTE TO DOCUMENT
addNote.addEventListener('click',()=>{
    addNotes()
})
// DELETE ALL NOTES
deleteAll.addEventListener('click',()=>{
    if(notesContainer.innerHTML == ''){
        Swal.fire('you haven\'t any note')
    }
    else{Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#222',
        cancelButtonColor: '#E6C713',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                notesContainer.remove()
                notesContainer.innerHTML = ''
                saveNote()
              Swal.fire(
                'Deleted!',
                'Your notes have been deleted.',
                'success'
              )
            }
        })
    }
    
  
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
    
    <textarea class='noteText' rows='5' cols='10'>${text}</textarea>`
    notesContainer.appendChild(notes)
    allNotes.appendChild(notesContainer)

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
