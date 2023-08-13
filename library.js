let myLibrary = [
    { title: 'Batman', author: "Bruce Wayne", pages: 100, read: "not yet read"},
    { title: 'Batman', author: "Bruce Wayne", pages: 100, read: "not yet read"},
    { title: 'Batman', author: "Bruce Wayne", pages: 100, read: "not yet read"},
    { title: 'Batman', author: "Bruce Wayne", pages: 100, read: "not yet read"},
    { title: 'Batman', author: "Bruce Wayne", pages: 100, read: "not yet read"},
];

const bookTable = document.querySelector('.bookTable');
const newBookButton = document.querySelector('#newBookButton');
const bookDialog = document.querySelector('#bookDialog');

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
        bookTable.appendChild(row);
    });
}

newBookButton.addEventListener('click', () => {
    bookDialog.showModal();
})
