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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const id = self.crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    document.querySelectorAll(".book-item").forEach(book => book.remove());
    
    myLibrary.forEach((bookObj, index) => {
        const bookData = [
            index + 1,
            bookObj.title,
            bookObj.author,
            bookObj.pages
        ];

        bookData.forEach(data => {
            const div = document.createElement("div");
            div.classList.add("grid-cell", "book-item");
            div.textContent = data;
            bookList.appendChild(div);
        });

        const readDiv = document.createElement("div");
        readDiv.classList.add("grid-cell", "book-item");
        const readButton = document.createElement("button");
        readButton.textContent = bookObj.read ? "✔" : "✘";

        readButton.addEventListener("click", () => {
            bookObj.toggleRead();
            displayLibrary();
        });

        readDiv.appendChild(readButton);
        bookList.appendChild(readDiv);

        const removeDiv = document.createElement("div");
        removeDiv.classList.add("grid-cell", "book-item");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.dataset.id = bookObj.id;

        removeButton.addEventListener("click", (e) => {
            const idToRemove = e.target.dataset.id;
            const index = myLibrary.findIndex((b) => b.id === idToRemove);
            if (index > -1 ) myLibrary.splice(index, 1);
            displayLibrary();
        });

        removeDiv.appendChild(removeButton);
        bookList.appendChild(removeDiv);
    });
}

function setupFormControls() {
    const openDialogButton = document.getElementById("add-button");
    const closeDialogButton = document.getElementById("close-button");
    openDialogButton.addEventListener("click", () => {
        dialog.showModal();
        form.reset();
    });
    closeDialogButton.addEventListener("click", () => dialog.close());
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.getElementById("book-read").checked;

    addBookToLibrary(title, author, pages, read);
    dialog.close();
    displayLibrary();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", true);
addBookToLibrary("Dune", "Frank Herbert", "412", false);
addBookToLibrary("1984", "George Orwell", "328", true);
addBookToLibrary("The Martian", "Andy Weir", "369", false);
setupFormControls();
displayLibrary();