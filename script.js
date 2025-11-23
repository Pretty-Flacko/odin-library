const myLibrary = [];
const bookList = document.querySelector("ol");

function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const id = self.crypto.randomUUID();
    const newBook = new Book(id, title, author, pages);
    myLibrary.push(newBook);
}

function displayLibrary() {
    myLibrary.forEach(bookObj => {
        const li = document.createElement("li");
        li.textContent = `${bookObj.title} by ${bookObj.author} (${bookObj.pages} pages)`;
        bookList.appendChild(li);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310");
addBookToLibrary("Dune", "Frank Herbert", "412");
addBookToLibrary("1984", "George Orwell", "328");
addBookToLibrary("The Martian", "Andy Weir", "369");
displayLibrary();