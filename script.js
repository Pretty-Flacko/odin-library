const myLibrary = [];
const bookList = document.querySelector(".books");
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
    document.querySelectorAll(".book-item").forEach(book => book.remove());
    
    myLibrary.forEach((bookObj, index) => {
        const indexDiv = document.createElement("div");
        indexDiv.classList.add("grid-cell", "book-item");
        indexDiv.textContent = index + 1;

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("grid-cell", "book-item");
        titleDiv.textContent = bookObj.title;

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("grid-cell", "book-item");
        authorDiv.textContent = bookObj.author;

        const pagesDiv = document.createElement("div");
        pagesDiv.classList.add("grid-cell", "book-item");
        pagesDiv.textContent = bookObj.pages;

        const readDiv = document.createElement("div");
        readDiv.classList.add("grid-cell", "book-item");
        readDiv.textContent = bookObj.read ? "✔" : "✘";

        const removeDiv = document.createElement("div");
        removeDiv.classList.add("grid-cell", "book-item");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.dataset.id = bookObj.id;
        removeDiv.appendChild(removeButton);

        removeButton.addEventListener("click", (e) => {
            const idToRemove = e.target.dataset.id;
            const index = myLibrary.findIndex((b) => b.id === idToRemove);
            if (index > -1 ) {
                myLibrary.splice(index, 1);
            }
            displayLibrary();
        });

        bookList.appendChild(indexDiv);
        bookList.appendChild(titleDiv);
        bookList.appendChild(authorDiv);
        bookList.appendChild(pagesDiv);
        bookList.appendChild(readDiv);
        bookList.appendChild(removeDiv);
    });
}

function setupFormControls() {
    const openDialogButton = document.getElementById("add-button");
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