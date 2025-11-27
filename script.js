const myLibrary = [];
const bookList = document.querySelector("ol");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const id = self.crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    document.querySelectorAll("li").forEach(book => book.remove());
    myLibrary.forEach(bookObj => {
        const li = document.createElement("li");
        li.textContent = `${bookObj.title} by ${bookObj.author} (${bookObj.pages} pages), ${bookObj.read}`;
        bookList.appendChild(li);
    });
}

function setupFormControls() {
    const openDialogButton = document.querySelector("button");
    const closeDialogButton = document.getElementById("close-button");
    openDialogButton.addEventListener("click", () => dialog.showModal());
    closeDialogButton.addEventListener("click", () => dialog.close());
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.getElementById("book-read").checked;

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310");
addBookToLibrary("Dune", "Frank Herbert", "412");
addBookToLibrary("1984", "George Orwell", "328");
addBookToLibrary("The Martian", "Andy Weir", "369");
setupFormControls();
displayLibrary();