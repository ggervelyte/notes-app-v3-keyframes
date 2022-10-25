"use strict"

const notes = document.querySelector(".notes")
const add = document.querySelector("#add")

add.addEventListener("click", function() {
    createNote("")
})

//create funkcija
function createNote(text) {
    let newNote = document.createElement("div")
    newNote.classList.add("note")
    newNote.innerHTML = 
    `
    <div class="tools">
        <button class="edit"><i class="fa fa-edit"></i></button>
        <button class="delete"><i class="fa fa-trash-alt"></i></button>
    </div>
    <div class="text">${text}</div>
    <textarea class="hidden">${text}</textarea>
    `
    notes.prepend(newNote)

    //edit funkcijos paleidimas
    editNotes()

    //deletenotes funkcijos paleidimas
    deleteNotes()
}

// edit funkcija
function editNotes() {
    let editBtn = document.querySelector(".edit")
    let text = document.querySelector(".text")
    let textArea = document.querySelector("textarea")

    editBtn.addEventListener("click", function() {
        textArea.classList.toggle("hidden")
        text.classList.toggle("hidden")
    })

    textArea.addEventListener("change", function() {
        text.innerText = textArea.value
    // updatememory funkcijos paleidimas
    updateMemory()
    })
}

//delete funkcija
function deleteNotes() {
    const deleteBtn = document.querySelector(".delete")
    deleteBtn.addEventListener("click", function() {
        
        this.parentNode.parentNode.classList.add("removeAnim")

        setTimeout(function() {
            const removeAnim = document.querySelector(".removeAnim")
            removeAnim.remove()

             //update memory 
            updateMemory()
        }, 300)
    })
}

function updateMemory() {
    const notesText = document.querySelectorAll(".text")
    let notesArray = []

    notesText.forEach(x => {
        notesArray.unshift(x.innerText)
        // console.log(notesText)
        // console.log(x.innerText)
    })

    localStorage.setItem("notesArray", notesArray)

    console.log(notesArray)
}

//load from localstorage
const notesFromMemory = localStorage.getItem("notesArray").split(",")
console.log(notesFromMemory)

if(notesFromMemory) {
    notesFromMemory.forEach(x => {
        if(x === "") return
        createNote(x)
        // console.log(x)
    })
}