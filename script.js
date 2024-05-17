const myLibrary = [
  new Book(
    "Cure Tooth Decay: Remineralize Cavities & Repair Your Teeth Naturally with Good Food",
    "Ramiel Nagel",
    358,
    false
  ),
  new Book("Mastery", "Robert Greene", 505, false),
  new Book(
    "Building a Second Brain: A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential",
    "Tiago Forte",
    453,
    true
  ),
  new Book(
    "The Showman: Inside the Invasion That Shook the World and Made a Leader of Volodymyr Zelensky",
    "Simon Shuster",
    430,
    false
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
  this.read = read ? "read" : "not read yet";
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.read}.`;
};

Book.prototype.toggleRead = function () {
  this.read = this.read === "read" ? "not read yet" : "read";
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
  title.textContent = book.title;

  const author = document.createElement("h3");
  author.classList.add("author");
  author.textContent = book.author;

  const pages = document.createElement("h3");
  pages.classList.add("pages");
  pages.textContent = book.pages;

  const read = document.createElement("h3");
  read.classList.add("read");
  read.textContent = book.read;

  const changeReadButton = document.createElement("button");
  changeReadButton.type = "button";
  changeReadButton.classList.add("change-read-button");
  changeReadButton.textContent = "Change";
  changeReadButton.addEventListener("click", (event) => {
    const containingBookCard = changeReadButton.closest(".book-card");
    const bookToChangeIndex = containingBookCard.dataset.indexNumber;
    const bookToChange = myLibrary[bookToChangeIndex];
    bookToChange.toggleRead();
    const siblingRead = changeReadButton.previousElementSibling;
    siblingRead.textContent = bookToChange.read;
  });

  const readInfoContainer = document.createElement("div");
  readInfoContainer.classList.add("read-info-container");
  readInfoContainer.appendChild(read);
  readInfoContainer.appendChild(changeReadButton);

  const removeBookButton = document.createElement("button");
  removeBookButton.type = "button";
  removeBookButton.classList.add("remove-book-button");
  removeBookButton.textContent = "Remove Book";
  removeBookButton.addEventListener("click", (event) => {
    const containingBookCard = removeBookButton.closest(".book-card");
    const bookToRemoveIndex = containingBookCard.dataset.indexNumber;
    myLibrary.splice(bookToRemoveIndex, 1);
    containingBookCard.remove();
  });

  const bookCard = document.createElement("div");
  const bookIndex = myLibrary.indexOf(book);
  bookCard.dataset.indexNumber = bookIndex;
  bookCard.classList.add("book-card");
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readInfoContainer);
  bookCard.appendChild(removeBookButton);

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
    readInput.checked
  );

  addBookToLibrary(newBook);
  dialog.close();
});
