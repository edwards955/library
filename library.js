let myLibrary = [
    { title: 'Batman: Year One', author: "Frank Miller", pages: 250, read: "not yet read"},
    { title: 'Batman: Hush', author: "Jeph Loeb", pages: 300, read: "read"},
    { title: 'Batman: The Killing Joke', author: "Alan Moore", pages: 200, read: "read"},
    { title: 'Gotham by Gaslight', author: "Brian Augustyn", pages: 350, read: "not yet read"},
    { title: 'Joker War', author: "James Tynion IV", pages: 250, read: "not yet read"},
];

const bookTable = document.querySelector('.bookTable');
const newBookButton = document.querySelector('#newBookButton');
const bookDialog = document.querySelector('#bookDialog');
const saveBookButton = document.querySelector('#saveBook');
const newBookForm = document.querySelector('#newBookForm');
const cancelButton = document.querySelector('#cancel');

updateBookTable();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => `${title} by ${author}, ${pages} pages, ${read}`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function updateBookTable() {
    clearBookTable();
    createHeaderRow();
    let index = 0;
    myLibrary.forEach((book) => {
        let row = document.createElement('tr');
        let titleCell = document.createElement('td');
        titleCell.textContent = `${book.title}`;
        row.appendChild(titleCell);
        let authorCell = document.createElement('td');
        authorCell.textContent = `${book.author}`;
        row.appendChild(authorCell);
        let pagesCell = document.createElement('td');
        pagesCell.textContent = `${book.pages}`;
        row.appendChild(pagesCell);
        let readCell = document.createElement('td');
        readCell.textContent = `${book.read}`;
        row.appendChild(readCell);

        let removeCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'REMOVE'
        removeButton.setAttribute("data-index", index)
        removeBookEventHandler(removeButton, index);
        index++;

        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        bookTable.appendChild(row);
    });
}

function clearBookTable() {
    while (bookTable.hasChildNodes()) {
        bookTable.removeChild(bookTable.firstChild);
    }
}

function createHeaderRow() {
    let row = document.createElement('tr');
    let titleCell = document.createElement('td');
    titleCell.textContent = `Title`;
    row.appendChild(titleCell);
    let authorCell = document.createElement('td');
    authorCell.textContent = `Author`;
    row.appendChild(authorCell);
    let pagesCell = document.createElement('td');
    pagesCell.textContent = `Pages`;
    row.appendChild(pagesCell);
    let readCell = document.createElement('td');
    readCell.textContent = `Read`;
    row.appendChild(readCell);
    let removeCell = document.createElement('td');
    removeCell.textContent = 'Remove';
    row.appendChild(removeCell);
    bookTable.appendChild(row);
}

newBookButton.addEventListener('click', () => {
    bookDialog.showModal();
})

saveBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = new FormData(newBookForm);
    const book = Object.fromEntries(data.entries());
    console.log(book);
    addBookToLibrary(book);
    bookDialog.close();
    updateBookTable();
})

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
})

function removeBookEventHandler(button, index) {
    button.addEventListener('click', (e) => {
        myLibrary.splice(index, 1);
        updateBookTable();
    })
}