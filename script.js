const myLibrary = [];

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

addBookToLibrary("Rings", "Tolkien", "425");
console.log(myLibrary);