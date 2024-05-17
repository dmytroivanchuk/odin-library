const myLibrary = [
  new Book(
    "Cure Tooth Decay: Remineralize Cavities & Repair Your Teeth Naturally with Good Food",
    "Ramiel Nagel",
    358,
    "not read yet"
  ),
  new Book("Mastery", "Robert Greene", 505, "not read yet"),
  new Book(
    "Building a Second Brain: A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential",
    "Tiago Forte",
    453,
    "read"
  ),
  new Book(
    "The Showman: Inside the Invasion That Shook the World and Made a Leader of Volodymyr Zelensky",
    "Simon Shuster",
    430,
    "not read yet"
  ),
];
const bookContainer = document.querySelector(".book-container");
const newBookButton = document.querySelector(".new-book-button");
const dialog = document.querySelector(".new-book-dialog");
const newBookButtonDialog = document.querySelector(".new-book-button-dialog");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.read}.`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  addBookCard(book);
}

myLibrary.forEach((book) => {
  addBookCard(book);
});

function addBookCard(book) {
  const title = document.createElement("h2");
  title.classList.add("title");
  const titleText = document.createTextNode(book.title);
  title.appendChild(titleText);

  const author = document.createElement("h3");
  author.classList.add("author");
  const authorText = document.createTextNode(book.author);
  author.appendChild(authorText);

  const pages = document.createElement("h3");
  pages.classList.add("pages");
  const pagesText = document.createTextNode(book.pages);
  pages.appendChild(pagesText);

  const read = document.createElement("h3");
  read.classList.add("read");
  const readText = document.createTextNode(book.read);
  read.appendChild(readText);

  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);

  bookContainer.appendChild(bookCard);
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

newBookButtonDialog.addEventListener("click", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title-input");
  const authorInput = document.querySelector("#author-input");
  const pagesInput = document.querySelector("#pages-input");
  const readInput = document.querySelector("#read-input");

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );

  addBookToLibrary(newBook);
  dialog.close();
});
