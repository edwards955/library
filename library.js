let myLibrary = [
    new Book('Batman: Year One', "Frank Miller", 250, "not yet read"),
    new Book('Gotham by Gaslight', 'Brian Augustyn', 350, 'read'),
    new Book('Joker War', 'James Tynion IV', 250, 'not yet read'),
]

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

Book.prototype.toggleRead = function() {
    if (this.read === 'not yet read') {
        this.read = 'read';
    } else {
        this.read = 'not yet read';
    }
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
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        let toggleCell = document.createElement('td');
        let toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Read';
        toggleButton.setAttribute("data-index", index)
        toggleReadEventHandler(toggleButton, index);
        toggleCell.appendChild(toggleButton);
        row.appendChild(toggleCell);

        index++;
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
    let toggleCell = document.createElement('td');
    toggleCell.textContent = 'Toggle';
    row.appendChild(toggleCell);
    bookTable.appendChild(row);
}

newBookButton.addEventListener('click', () => {
    bookDialog.showModal();
})

saveBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = new FormData(newBookForm);
    const book = Object.fromEntries(data.entries());
    addBookToLibrary(new Book(book.title, book.author, book.pages, book.read));
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

function toggleReadEventHandler(button, index) {
    button.addEventListener('click', (e) => {
        myLibrary[index].toggleRead();
        updateBookTable();
    })
}