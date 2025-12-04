const books = [];
const booksDisplay = document.querySelector("#books");

document.querySelector("form button").addEventListener("click", (e) => {
  if (!document.querySelector("form").checkValidity()) { return; }

  e.preventDefault();
  
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const completed = document.querySelector("#completed").checked;

  document.querySelector("form").reset();

  addBookToLibrary(title, author, pages, completed);
});

function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
  this.id = crypto.randomUUID();
  
  this.el = document.createElement("div");
  this.el.classList.add("book");
  
  const firstSection = document.createElement("div");

  const titleDisplay = document.createElement("h1");
  titleDisplay.textContent = this.title;
  titleDisplay.classList.add("title");
  firstSection.appendChild(titleDisplay);

  const authorDisplay = document.createElement("h2");
  authorDisplay.textContent = this.author;
  authorDisplay.classList.add("author");
  firstSection.appendChild(authorDisplay);

  const secondSection = document.createElement("div");

  const pagesDisplay = document.createElement("p");
  pagesDisplay.textContent = `${this.pages} pages`;
  pagesDisplay.classList.add("pages");
  secondSection.appendChild(pagesDisplay);

  const completedButton = document.createElement("button");
  completedButton.textContent = (this.completed ? "Completed" : "Not complete");
  completedButton.classList.add("completed");
  completedButton.addEventListener("click", () => {
    this.completed = !this.completed;
    completedButton.textContent = (this.completed ? "Completed" : "Not complete");
  });
  secondSection.appendChild(completedButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => removeBookFromLibrary(this.id));
  secondSection.appendChild(deleteButton);

  this.el.appendChild(firstSection);
  this.el.appendChild(secondSection);
}

function addBookToLibrary(title, author, pages, completed) {
  const book = new Book(title, author, pages, completed);
  books.push(book);
  booksDisplay.appendChild(book.el);
}

function removeBookFromLibrary(id) {
    books.find(book => book.id === id).el.remove();
    books.splice(books.findIndex(book => book.id === id), 1);
}