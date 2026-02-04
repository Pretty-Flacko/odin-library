class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const id = self.crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    this.books.push(newBook);
  }

  removeBook(idToRemove) {
    const index = this.books.findIndex((b) => b.id === idToRemove);
    if (index !== -1) this.books.splice(index, 1);
  }

  getAllBooks() {
    return this.books;
  }
}

const myLibrary = new Library();
const bookList = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

function displayLibrary() {
  document.querySelectorAll(".book-item").forEach((book) => book.remove());

  myLibrary.getAllBooks().forEach((bookObj, bookNum) => {
    const bookData = [
      bookNum + 1,
      bookObj.title,
      bookObj.author,
      bookObj.pages,
    ];

    bookData.forEach((data) => {
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
      myLibrary.removeBook(e.target.dataset.id);
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

  const title = document.getElementById("book-title");
  const author = document.getElementById("book-author");
  const pages = document.getElementById("book-pages");
  const read = document.getElementById("book-read");

  clearError(title);
  clearError(author);
  clearError(pages);

  if (!title.validity.valid) {
    showError(title, "The book title must be filled!");
    return;
  } else if (!author.validity.valid) {
    showError(author, "The author name must be filled!");
    return;
  } else if (!pages.validity.valid) {
    showError(pages, "The number of pages must be at least 1!");
    return;
  }

  myLibrary.addBook(title.value, author.value, pages.value, read.checked);

  dialog.close();
  displayLibrary();
});

function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.className = "error active";
  input.focus();
}

function clearError(input) {
  const error = input.nextElementSibling;
  error.textContent = "";
  error.className = "error";
}

myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", "310", true);
myLibrary.addBook("Dune", "Frank Herbert", "412", false);
myLibrary.addBook("1984", "George Orwell", "328", true);
myLibrary.addBook("The Martian", "Andy Weir", "369", false);
setupFormControls();
displayLibrary();
