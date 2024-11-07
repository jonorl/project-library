let myLibrary = [];

const cardsContainerDiv = document.querySelector(".cardsContainer");
const addBookButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel");
const modalButton = document.querySelector("[data-open-modal]");
const dialog = document.querySelector("dialog");
const modal = document.querySelector("[data-modal]");
const form = document.querySelector(".addNewBook")
let nameInput;
let authorInput;
let pagesInput;
const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
const numRegex = /^[0-9]+$/;
let error;

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
            <div class="bookIndex">Book&nbsp${+index + 1}</div>
            <div class="bookName">${item.title}</div>
            <div class="bookAuthor">${item.author}</div>
            <div class="bookNumberOfPages">${item.pages}</div>
            <label for="readCard">Read?</label><input class="readCard" type="checkbox" ${
              item.read ? "checked" : ""
            }><br>
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
    deleteButton.addEventListener("click", function () {
      cardsContainerDiv.removeChild(this.parentElement);
      myLibrary = myLibrary.filter((book) => book !== item);
    });
  }
}

function addBookButtonFunction(event) {
  // This code snippet prevents the add button from sending data to the server

  event.preventDefault();

  // Take the values from the form and push them to the MyLibrary Array of Objects.

  let name = document.querySelector("#name").value;
  let author = document.querySelector("#author").value;
  let numberOfPages = document.querySelector("#numberOfPages").value;
  let read = document.querySelector("#read").checked;
  addBookToLibrary(myLibrary.length, name, author, numberOfPages, read);

  loopArray();

  // Return the values to blank

  document.querySelector("#name").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#numberOfPages").value = "";
  document.querySelector("#read").checked = false;

  dialog.close();
}

addBookButton.addEventListener("click", function(event) {
    addBookButtonFunction(event);
});

// modals

modalButton.addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("[data-open-modal]").blur();
  modal.showModal();
  currentInput = event.target;

  // JS validation stuff

  nameInput = document.querySelector("#name");
  authorInput = document.querySelector("#author");
  pagesInput = document.querySelector("#numberOfPages")

  const isValidName = nameInput.value.length === 0 || nameRegex.test(nameInput.value);
  const isValidAuthor = authorInput.value.length === 0 || nameRegex.test(authorInput.value);
  const isValidPages = pagesInput.value.length === 0 || numRegex.test(pagesInput.value);

  nameInput.className = isValidName ? "valid" : "invalid";
  authorInput.className = isValidAuthor ? "valid" : "invalid";
  pagesInput.className = isValidPages ? "valid" : "invalid";

  nameInput.addEventListener("input", function(event) {
    error = event.target.nextElementSibling;
    validation(event);
    const isValidName = nameInput.value.length === 0 || nameRegex.test(nameInput.value);
    if (isValidName) {
      nameInput.className = "valid";
      error.textContent = "";
      error.className = "error";
    } 
    else {
      nameInput.className = "invalid";
    }
  });

  authorInput.addEventListener("input", function(event) {
    error = event.target.nextElementSibling;
    validation(event);
    const isValidAuthor = authorInput.value.length === 0 || nameRegex.test(authorInput.value);
    if (isValidAuthor) {
      authorInput.className = "valid";
      error.textContent = "";
      error.className = "error";
    } 
    else {
      authorInput.className = "invalid";
    }
  });

  pagesInput.addEventListener("input", function(event) {
    error = event.target.nextElementSibling;
    validation(event);
    if(pagesInput.validity.badInput) {
      pagesInput.setCustomValidity("Please enter an integer")
      pagesInput.className = "invalid";
    } else {
      pagesInput.setCustomValidity("");
      pagesInput.className = "valid";
      error.textContent = "";
      error.className = "error";
    }
  }); 
});

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

dialog.addEventListener("mousedown", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    e.preventDefault();
    dialog.close();
  }
});

function validation (event) {
    let checkIfValid;
    inputSelection = event.target;
    if(inputSelection.id !== "numberOfPages"){
      checkIfValid = inputSelection.value.length === 0 || nameRegex.test(inputSelection.value);
    }
    else {
      checkIfValid = numRegex.test(inputSelection.value);
    }
    if (!checkIfValid) {
        inputSelection.className = "invalid";
        error.textContent = "Invalid char!";
        error.className = "error active";
    } else {
        inputSelection.className = "valid";
        error.textContent = "";
        error.className = "error";
    }
}