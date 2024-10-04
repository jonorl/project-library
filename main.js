let myLibrary = [];

const cardsContainerDiv = document.querySelector(".cardsContainer");
const addBookButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel")
const modalButton = document.querySelector("[data-open-modal]")
const dialog = document.querySelector("dialog")
const modal = document.querySelector("[data-modal]")

// Constructor function

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(id, name, author, numberOfPages, read) {
    let addedBook = new Book(id, name, author, numberOfPages, read);
    myLibrary.push(addedBook);
}

function loopArray() {

    // delete everything under the CardsContainer div to avoid duplication

    while (cardsContainerDiv.firstChild) {
        cardsContainerDiv.removeChild(cardsContainerDiv.firstChild);
    }

    // loop and get all the books from myLibrary and display it in cards

    for (let [index, item] of myLibrary.entries()) {
        let newCard = document.createElement("div");
        newCard.className = `card${index}`;
        newCard.innerHTML = `
            <div class="bookIndex">Book&nbsp${ + index + 1}</div>
            <div class="bookName">${item.title}</div>
            <div class="bookAuthor">${item.author}</div>
            <div class="bookNumberOfPages">${item.pages}</div>
            <label for="readCard">Read?</label><input class="readCard" type="checkbox" ${item.read ? 'checked' : ''}><br>
            <button id="deleteCard" class="delete">X</button>
            `;
        cardsContainerDiv.appendChild(newCard);

        // The read button changes the status on myLibrary

        const readButton = newCard.querySelector(".readCard");
        readButton.addEventListener("click", () => {
            item.read = !item.read;
            readButton.checked = item.read;
        });

        // create the delete button and asign a function to delete the card upon clicking

        const deleteButton = newCard.querySelector("button.delete");
        deleteButton.addEventListener("click", function() {
            cardsContainerDiv.removeChild(this.parentElement)
            myLibrary = myLibrary.filter(book => book !== item);
        });
    }
}

function addBookButtonFunction(event) {

    // This code snippet prevents the add button from sending data to the server

    event.preventDefault();

    // Take the values from the form and push them to the MyLibrary Array of Objects.

    let name = document.querySelector(".name").value;
    let author = document.querySelector(".author").value
    let numberOfPages = document.querySelector(".numberOfPages").value
    let read = document.querySelector(".read").checked
    addBookToLibrary(myLibrary.length, name, author, numberOfPages, read);

    loopArray()

    // Return the values to blank

    document.querySelector(".name").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".numberOfPages").value = "";
    document.querySelector(".read").checked = false;

    dialog.close()
}

addBookButton.addEventListener("click", addBookButtonFunction);

// modals

modalButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("[data-open-modal]").blur();
    modal.showModal();
})

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
})

dialog.addEventListener("mousedown", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      e.preventDefault;
      dialog.close()
    }
  })
