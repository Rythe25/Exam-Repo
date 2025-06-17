import { BookManagement } from "../managers/BookManagement.js";
import { Manager } from "../managers/Manager.js";

export class BookEventManager {
    constructor() {
        this.bookManager = BookManagement.getInstance();
        this.books = this.bookManager.getAllBooks(); // Initial load of books
        this.loadTableData();
        this.initBookEvent();
        this.initAddBookEvent();
        this.initEditBookEvent();
    }

    initBookEvent() {
        const tableBody = document.querySelector(".table-body");
        tableBody.addEventListener("click", (event) => {
            const deleteButton = event.target.closest("button img[alt='Delete']");
            if (deleteButton) {
                const row = deleteButton.closest("tr");
                const id = parseInt(row.cells[0].textContent); // Get ID from first column
                this.deleteBook(id);
            }
        });

        const sortButton = document.querySelector("#sort-button");
        sortButton.addEventListener("click", () => {
            const sortColumn = document.querySelector("#sort-column").value;
            this.sortTable(sortColumn);
        });

        const searchButton = document.querySelector("#search-button");
        const searchInput = document.querySelector("#search-input");
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.trim().toLowerCase();
            this.searchTable(query);
        });
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const query = searchInput.value.trim().toLowerCase();
                this.searchTable(query);
            }
        });
    }

    initEditBookEvent() {
        console.log("Initializing edit book event handlers...");
        const tableBody = document.querySelector(".table-body");
        tableBody.addEventListener("click", (event) => {
            event.preventDefault();
            const editButton = event.target.closest("button img[alt='Edit']");
            if (editButton) {
                const row = editButton.closest("tr");
                const id = parseInt(row.cells[0].textContent); // Get ID from first column
                const book = this.bookManager.getBookById(id);
                console.log("Populating edit form with book ID:", id, book);
                if (book) {
                    // Populate the edit form with book details
                    document.getElementById("edit-book").value = book.name;
                    document.getElementById("edit-author").value = book.author;
                    document.getElementById("edit-publisher").value = book.publisher;
                    document.getElementById("edit-publish").value = book.publish;
                    document.getElementById("edit-pages").value = book.pages;
                    document.getElementById("edit-copies").value = book.copies;

                    const editPopUp = document.getElementById("edit-pop-up");
                    editPopUp.classList.add("active-pop-up");

                    // Store the book ID in a data attribute for use in confirm handler
                    editPopUp.dataset.bookId = id;
                }
            }
        });

        const editCancelButton = document.getElementById("edit-cancel-button");
        editCancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            const editPopUp = document.getElementById("edit-pop-up");
            editPopUp.classList.remove("active-pop-up");
            this.resetEditBookForm();
        });

        const editConfirmButton = document.getElementById("edit-confirm-button");
        editConfirmButton.addEventListener("click", (event) => {
            event.preventDefault();
            const editPopUp = document.getElementById("edit-pop-up");
            const bookId = parseInt(editPopUp.dataset.bookId);

            const updatedBook = {
                id: bookId,
                name: document.getElementById("edit-book").value,
                author: document.getElementById("edit-author").value,
                publisher: document.getElementById("edit-publisher").value,
                publish: parseInt(document.getElementById("edit-publish").value),
                pages: parseInt(document.getElementById("edit-pages").value),
                copies: parseInt(document.getElementById("edit-copies").value)
            };

            console.log("Updating book with values:", updatedBook);

            // Validate that no fields are empty
            for (const inputField in updatedBook) {
                if (updatedBook[inputField] === "" || isNaN(updatedBook[inputField])) {
                    alert(`Please fill out the ${inputField} field with a valid value.`);
                    return;
                }
            }

            // Update the book in the manager
            const success = this.bookManager.updateBook(updatedBook);
            if (success) {
                this.books = this.bookManager.getAllBooks();
                this.loadTableData();
                editPopUp.classList.remove("active-pop-up");
                this.resetEditBookForm();
            } else {
                alert("Failed to update the book. Please try again.");
            }
        });
    }

    initAddBookEvent() {
        console.log("Initializing new book event handlers...");
        const addBookButton = document.getElementById("new-book-button");
        const addBookPopUp = document.getElementById("add-pop-up");

        addBookButton.addEventListener("click", (event) => {
            event.preventDefault();
            addBookPopUp.classList.add("active-pop-up");
        });

        const addBookCancelButton = document.getElementById("new-cancel-button");
        addBookCancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            addBookPopUp.classList.remove("active-pop-up");
            this.resetNewBookForm();
        });

        const addBookCreateButton = document.getElementById("new-create-button");
        addBookCreateButton.addEventListener("click", (event) => {
            event.preventDefault();

            const newBook = {
                id: this.bookManager.getLastId() + 1, // Increment lastId for new book 
                name: document.getElementById("new-book").value,
                author: document.getElementById("new-author").value,
                publisher: document.getElementById("new-publisher").value,
                publish: parseInt(document.getElementById("new-publish").value),
                pages: parseInt(document.getElementById("new-pages").value),
                copies: parseInt(document.getElementById("new-copies").value)
            };

            console.log("Creating new book with values:", newBook);

            for (const inputField in newBook) {
                if (newBook[inputField] === "" || isNaN(newBook[inputField])) {
                    alert(`Please fill out the ${inputField} field with a valid value.`);
                    return;
                }
            }

            this.bookManager.addBook(newBook.name, newBook.author, newBook.publisher, newBook.publish, newBook.pages, newBook.copies);
            this.books = this.bookManager.getAllBooks();
            this.loadTableData();
            addBookPopUp.classList.remove("active-pop-up");
            this.resetNewBookForm();
        });
    }

    loadTableData(booksToDisplay = this.books) {
        const tableBody = document.querySelector(".table-body");
        tableBody.innerHTML = "";
        booksToDisplay.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>${book.publish}</td>
                <td>${book.pages}</td>
                <td>${book.copies}</td>
                <td>
                    <button class="edit-buttons-style">
                        <img class="button-icons-style" src="icon/pencil.png" alt="Edit">
                    </button>
                    <button class="edit-buttons-style">
                        <img class="button-icons-style" src="icon/trash-xmark.png" alt="Delete">
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    deleteBook(bookId) {
        console.log("Delete book with ID:", bookId);
        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }
        const success = this.bookManager.deleteBook(bookId);
        console.log("Deletion successful:", success);
        this.books = this.bookManager.getAllBooks(); // Refresh books after deletion
        this.loadTableData();
    }

    sortTable(column) {
        this.books.sort((a, b) => {
            const isNumeric = ['publish', 'pages', 'copies', 'id'].includes(column);
            const valA = isNumeric ? a[column] : a[column].toString().toLowerCase();
            const valB = isNumeric ? b[column] : b[column].toString().toLowerCase();
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });
        this.loadTableData();
    }

    searchTable(query) {
        query = query.trim().toLowerCase();
        console.log("Search query:", query);

        if (!query) {
            this.loadTableData(this.books); // Show all books if query is empty
            return;
        }

        const filteredBooks = this.books.filter(book => {
            // Check all relevant fields for a match
            return (
                book.name.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.publisher.toLowerCase().includes(query) ||
                book.publish.toString().includes(query) ||
                book.pages.toString().includes(query) ||
                book.copies.toString().includes(query)
            );
        });
        console.log("Filtered books count:", filteredBooks.length); // Debug the number of matches
        this.loadTableData(filteredBooks); // Render only the filtered results
    }

    resetNewBookForm() {
        document.getElementById("new-book").value = "";
        document.getElementById("new-author").value = "";
        document.getElementById("new-publisher").value = "";
        document.getElementById("new-publish").value = "";
        document.getElementById("new-pages").value = "";
        document.getElementById("new-copies").value = "";
    }

    resetEditBookForm() {
        document.getElementById("edit-book").value = "";
        document.getElementById("edit-author").value = "";
        document.getElementById("edit-publisher").value = "";
        document.getElementById("edit-publish").value = "";
        document.getElementById("edit-pages").value = "";
        document.getElementById("edit-copies").value = "";
        const editPopUp = document.getElementById("edit-pop-up");
        delete editPopUp.dataset.bookId; // Clear stored book ID
    }
}