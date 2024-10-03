const myLibrary = [];

const addBookButton = document.querySelector(".add");

// Constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, numberOfPages, read) {
    let addedBook = new Book(name, author, numberOfPages, read);
    myLibrary.push(addedBook);
}

function addBookButtonFunction(event) {
    
    // This code snippet prevents the add button from sending data to the server
    event.preventDefault();

    // Take the values from the form and push them to the MyLibrary Array of Objects.
    let name = document.querySelector(".name").value;
    let author = document.querySelector(".author").value
    let numberOfPages = document.querySelector(".numberOfPages").value
    let read = document.querySelector(".read").checked
    addBookToLibrary(name, author, numberOfPages, read);

    // Return the values to blank
    document.querySelector(".name").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".numberOfPages").value = "";
    document.querySelector(".read").checked = false;

    //display the contents of myLibrary
    console.table(myLibrary);
}

addBookButton.addEventListener("click", addBookButtonFunction);