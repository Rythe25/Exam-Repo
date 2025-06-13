import { Book } from './book.js';

export class BookManager {
    #books = [];
    #nextId = 1;
    currentSort = { field: 'no', direction: 'asc' };

    loadData() {
        const savedBooks = localStorage.getItem('books');
        if (savedBooks) {
            this.#books = JSON.parse(savedBooks).map(Book.fromJSON);
            this.#nextId = Math.max(...this.#books.map(b => b.Id), 0) + 1;
            this.#books.forEach((book, index) => {
                book.Number = index + 1;
            });
        } else {
            // Initialize with default books
            const defaultBooks = [
                { name: "To Kill a Mockingbird", authorName: "Harper Lee", publisherName: "J.B. Lippincott", publishYear: 1960, pages: 281, copies: 5 },
                { name: "1984", authorName: "George Orwell", publisherName: "Secker & Warburg", publishYear: 1949, pages: 328, copies: 3 },
                { name: "Pride and Prejudice", authorName: "Jane Austen", publisherName: "T. Egerton", publishYear: 1813, pages: 432, copies: 4 }
            ];
            defaultBooks.forEach((data, index) => {
                const book = new Book();
                book.Id = this.#nextId++;
                book.Number = index + 1;
                book.Name = data.name;
                book.AuthorName = data.authorName;
                book.PublisherName = data.publisherName;
                book.PublishYear = data.publishYear;
                book.Pages = data.pages;
                book.Copies = data.copies;
                this.#books.push(book);
            });
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('books', JSON.stringify(this.#books));
    }

    addBook(formData) {
        const book = new Book();
        book.Id = this.#nextId++;
        book.Number = this.#books.length + 1;
        book.Name = formData.get('BookName');
        book.AuthorName = formData.get('AuthorName');
        book.PublisherName = formData.get('PublisherName');
        book.PublishYear = parseInt(formData.get('PublishYear'));
        book.Pages = parseInt(formData.get('Pages'));
        book.Copies = parseInt(formData.get('Copies'));
        this.#books.push(book);
        this.saveData();
    }

    updateBook(id, formData) {
        const book = this.#books.find(b => b.Id === id);
        if (book) {
            book.Name = formData.get('BookName');
            book.AuthorName = formData.get('AuthorName');
            book.PublisherName = formData.get('PublisherName');
            book.PublishYear = parseInt(formData.get('PublishYear'));
            book.Pages = parseInt(formData.get('Pages'));
            book.Copies = parseInt(formData.get('Copies'));
            this.saveData();
        }
    }

    deleteBook(id) {
        this.#books = this.#books.filter(b => b.Id !== id);
        this.#books.forEach((book, index) => {
            book.Number = index + 1;
        });
        this.saveData();
    }

    getBooks() {
        return [...this.#books];
    }

    sortBooks(field) {
        if (this.currentSort.field === field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }

        this.#books.sort((a, b) => {
            let aValue = a[field.charAt(0).toUpperCase() + field.slice(1)];
            let bValue = b[field.charAt(0).toUpperCase() + field.slice(1)];
            
            if (field === 'no') {
                aValue = a.Number;
                bValue = b.Number;
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return this.currentSort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });

        if (field === 'no') {
            this.#books.forEach((book, index) => {
                book.Number = this.currentSort.direction === 'asc' ? index + 1 : this.#books.length - index;
            });
        }
    }

    searchBooks(term) {
        term = term.toLowerCase();
        return this.#books.filter(book =>
            book.Name.toLowerCase().includes(term) ||
            book.AuthorName.toLowerCase().includes(term) ||
            book.PublisherName.toLowerCase().includes(term) ||
            book.PublishYear.toString().includes(term)
        );
    }
}