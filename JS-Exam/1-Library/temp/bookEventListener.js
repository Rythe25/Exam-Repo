export class BookEventListener {
    constructor(bookManager) {
        this.bookManager = bookManager;
        this.currentEditId = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const newBookBtn = document.getElementById('newBookBtn');
        if (newBookBtn) {
            newBookBtn.addEventListener('click', () => this.showAddBookPopup());
        }

        document.getElementById('sortBtn').addEventListener('click', () => this.sortBooks());
        document.querySelectorAll('th[data-sort]').forEach(th =>
            th.addEventListener('click', () => this.sortByField(th.dataset.sort))
        );
        document.getElementById('searchInput').addEventListener('input', e =>
            this.searchBooks(e.target.value)
        );
        document.getElementById('searchBtn').addEventListener('click', () => {
            const term = document.getElementById('searchInput').value;
            this.searchBooks(term);
        });

        const addBookForm = document.getElementById('addBookForm');
        if (addBookForm) {
            addBookForm.addEventListener('submit', e => {
                e.preventDefault();
                this.addBook();
            });
        }

        document.getElementById('cancelAddBtn').addEventListener('click', () => this.hideAddBookPopup());
        document.getElementById('editBookForm').addEventListener('submit', e => {
            e.preventDefault();
            this.updateBook();
        });

        document.getElementById('cancelEditBtn').addEventListener('click', () => this.hideEditBookPopup());

        document.getElementById('bookAddPopup').addEventListener('click', e => {
            if (e.target.id === 'bookAddPopup') this.hideAddBookPopup();
        });

        document.getElementById('bookEditPopup').addEventListener('click', e => {
            if (e.target.id === 'bookEditPopup') this.hideEditBookPopup();
        });
    }

    validateBookForm(type) {
        const prefix = type === 'add' ? 'add' : 'edit';
        let isValid = true;
        const form = document.getElementById(`${prefix}BookForm`);
        form.querySelectorAll('.error').forEach(e => e.textContent = '');

        const fields = ['BookName', 'AuthorName', 'PublisherName', 'PublishYear', 'Pages', 'Copies'];
        fields.forEach(field => {
            const input = document.getElementById(`${prefix}${field}`);
            const errorDiv = document.getElementById(`${prefix}${field}Error`);
            if (!input.value.trim()) {
                errorDiv.textContent = 'This field is required';
                isValid = false;
            } else if (['Pages', 'Copies'].includes(field) && parseInt(input.value) < 1) {
                errorDiv.textContent = 'Value must be positive';
                isValid = false;
            } else if (field === 'PublishYear') {
                const year = parseInt(input.value);
                if (year < 1 || year > 2025) {
                    errorDiv.textContent = 'Year must be between 1 and 2025';
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    addBook() {
        if (!this.validateBookForm('add')) return;
        const formData = new FormData(document.getElementById('addBookForm'));
        this.bookManager.addBook(formData);
        this.renderBooks();
        this.hideAddBookPopup();
        this.resetForm('addBookForm');
    }

    updateBook() {
        if (!this.validateBookForm('edit')) return;
        const formData = new FormData(document.getElementById('editBookForm'));
        this.bookManager.updateBook(this.currentEditId, formData);
        this.renderBooks();
        this.hideEditBookPopup();
        this.currentEditId = null;
    }

    deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            this.bookManager.deleteBook(id);
            this.renderBooks();
        }
    }

    sortBooks() {
        const sortField = document.getElementById('sortSelect').value;
        this.sortByField(sortField);
    }

    sortByField(field) {
        this.bookManager.sortBooks(field);
        this.updateSortIndicators();
        this.renderBooks();
    }

    updateSortIndicators() {
        document.querySelectorAll('.sort-indicator').forEach(el => el.textContent = '');
        const header = document.querySelector(`th[data-sort="${this.bookManager.currentSort.field}"] .sort-indicator`);
        if (header) header.textContent = this.bookManager.currentSort.direction === 'asc' ? '↑' : '↓';
    }

    searchBooks(term) {
        const filtered = this.bookManager.searchBooks(term);
        this.renderFilteredBooks(filtered);
    }

    renderBooks() {
        this.renderFilteredBooks(this.bookManager.getBooks());
    }

    renderFilteredBooks(books) {
        const tbody = document.getElementById('booksTableBody');
        if (books.length === 0) {
            tbody.innerHTML = '<tr class="no-books"><td colspan="8">No books found.</td></tr>';
            return;
        }
        tbody.innerHTML = books.map(book => `
            <tr>
                <td>${book.Number}</td>
                <td>${book.Name}</td>
                <td>${book.AuthorName}</td>
                <td>${book.PublisherName}</td>
                <td>${book.PublishYear}</td>
                <td>${book.Pages}</td>
                <td>${book.Copies}</td>
                <td>
                    <button class="edit-buttons-style" onclick="bookEventListener.showEditBookPopup(${book.Id})">✏️</button>
                    <button class="edit-buttons-style" onclick="bookEventListener.deleteBook(${book.Id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    showAddBookPopup() {
        const popup = document.getElementById('bookAddPopup');
        if (popup) {
            popup.classList.remove('hidden');
            document.getElementById('addBookName').focus();
        }
    }

    hideAddBookPopup() {
        const popup = document.getElementById('bookAddPopup');
        if (popup) {
            popup.classList.add('hidden');
            this.resetForm('addBookForm');
        }
    }

    showEditBookPopup(id) {
        const book = this.bookManager.getBooks().find(b => b.Id === id);
        if (!book) return;
        this.currentEditId = id;
        document.getElementById('editBookName').value = book.Name;
        document.getElementById('editAuthorName').value = book.AuthorName;
        document.getElementById('editPublisherName').value = book.PublisherName;
        document.getElementById('editPublishYear').value = book.PublishYear;
        document.getElementById('editPages').value = book.Pages;
        document.getElementById('editCopies').value = book.Copies;
        document.getElementById('bookEditPopup').classList.remove('hidden');
    }

    hideEditBookPopup() {
        document.getElementById('bookEditPopup').classList.add('hidden');
        this.resetForm('editBookForm');
        this.currentEditId = null;
    }

    resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            form.querySelectorAll('.error').forEach(e => e.textContent = '');
        }
    }
}