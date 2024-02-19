let myLibrary = []
const libraryGrid = document.querySelector(".my-library-grid");
const addBookBtn = document.querySelector("#add-book-btn");

//add books dialog elements
const addBookDialogName = document.querySelector('#name')
const addBookDialogAuthor = document.querySelector('#author')
const addBookDialogPages = document.querySelector("#pages")
const addBookDialogReadingStatus = document.querySelector('#reading-status')
const addBookDialogCancelButton = document.querySelector("#add-book-dialog-cancel-btn")
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookDialogAddImg = document.querySelector("#img-url");
const addBookDialogConfirmationButton = document.querySelector("#add-book-dialog-confirmation-btn");
const addBookForm = document.querySelector("form");


addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal()
});

addBookDialogConfirmationButton.addEventListener("click", (e) => {
    e.preventDefault()
    let book = new Book(addBookDialogName.value, addBookDialogAuthor.value, addBookDialogPages.value, addBookDialogReadingStatus.value, addBookDialogAddImg.value);
    myLibrary.push(book)

    addBook(book, myLibrary.length - 1)

    addBookDialog.close();
    addBookForm.reset();

})
addBookDialogCancelButton.addEventListener("click", () => addBookForm.reset())


let Book = function (name, author, pages, read, imgUrl) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.imgUrl = imgUrl;
    this.switchBookStatus = function () {
        alert(this.read + "before")
        this.read = ((read == true) ? false : true);
        alert(this.read + "after")

    }

}


function addBook(book, bookId) {

    let div = ` <div class="book-card" id ="book-card-${bookId}">
    <img src=${book.imgUrl}> </img>
    <div class= "card-info" >
    <p>${book.name}</p>
    <p>by ${book.author}</p>
    <p>${book.pages} Pages</p>
    <p id =${book.read == true ? "read-status" : "not-read-status"} >${book.read == true ? "Read" : "Not read yet"}</p>
    <div class="book-actions">
        <button id="remove-btn-${bookId}">Remove</button>
        <button id="switch-status-btn-${bookId}">Change status</button>
    </div>
    </div>
</div>`;
    libraryGrid.insertAdjacentHTML("afterbegin", div)
    document.querySelector(`#remove-btn-${bookId}`).addEventListener('click', () => {
        removeBook(bookId)
    });
    document.querySelector(`#switch-status-btn-${bookId}`).addEventListener('click', () => {
        switchBookStatus(bookId)
    });

}
function removeBook(id) {
    myLibrary.splice(id, 1)
    refreshBookList()
}

function generateRandomBooks(numOfBooks) {
    for (let i = 0; i < numOfBooks; i++) {
        let read = Math.random() > 0.5;
        console.log(read)
        let book = new Book(`Book${i + 1}`, `Author${i + 1}`, `Book${(i + 1) * 100}`, read, "https://storage.googleapis.com/du-prd/books/images/9780385534246.jpg");
        myLibrary.push(book)
        addBook(book, i)
    }
}

function generateBooks() {
    let listOfBooks = [
        new Book("THE WOMAN", "Kristin Hannah", getRandomNumber(200, 2000), false, "https://storage.googleapis.com/du-prd/books/images/9781250178633.jpg"),
        new Book("THE TEACHER", "Frieda McFadden", getRandomNumber(200, 2000), false, 'https://storage.googleapis.com/du-prd/books/images/9781728296210.jpg'),
        new Book("HOUSE OF FLAME AND SHADOW", "Sarah J. Maas", getRandomNumber(200, 2000), false, 'https://storage.googleapis.com/du-prd/books/images/9781635574104.jpg'),
        new Book("BRIDE", "Ali Hazelwood", getRandomNumber(200, 2000), false, 'https://storage.googleapis.com/du-prd/books/images/9780593550403.jpg'),
        new Book("FOURTH WING", "Rebecca Yarros", getRandomNumber(200, 2000), false, 'https://storage.googleapis.com/du-prd/books/images/9781649374042.jpg'),
        new Book("KILLERS OF THE FLOWER MOON", "David Grann", getRandomNumber(200, 2000), false, 'https://storage.googleapis.com/du-prd/books/images/9780385534246.jpg'),
    ]
    for (let i = 0; i < listOfBooks.length; i++) {
        myLibrary.push(listOfBooks[i]);
        addBook(listOfBooks[i], i)
    }

}
function refreshBookList() {
    emptyGrid()
    for (let i = 0; i < myLibrary.length; i++) {
        addBook(myLibrary[i], i)
    }
}
function emptyGrid() {
    libraryGrid.innerHTML = ''
}
function switchBookStatus(bookId) {
    myLibrary[bookId].read = myLibrary[bookId].read == true ? false : true;
    // myLibrary[bookId].switchBookStatus();
    // alert(bookId + " " + myLibrary[bookId].read)
    document.querySelector(`#book-card-${bookId} > .card-info > p:nth-child(4)`).innerHTML = ((myLibrary[bookId].read == true) ? "Read" : "Not Yet Read")
    document.querySelector(`#book-card-${bookId} > .card-info >p:nth-child(4)`).id = ((myLibrary[bookId].read == true) ? "read-status" : "not-read-status")


}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

generateBooks();

