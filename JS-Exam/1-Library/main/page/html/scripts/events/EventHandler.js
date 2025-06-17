import { BookManagement } from "../managers/BookManagement.js";
import { BookEventManager } from "./BookEventManager.js";

export class EventHandler {
    constructor() {
        this.bookManager = BookManagement.getInstance();
        this.bookEventManager = new BookEventManager();
        this.insertData();
    }

    insertData() {
        //window.localStorage.clear(); // Clear localStorage for testing purposes
        // Check if 'book' key exists in localStorage
        let storedData = JSON.parse(window.localStorage.getItem('book')) || { data: [] };

        // Only add default books if no data exists in localStorage
        if (storedData.data.length === 0 && this.bookManager.getAllBooks().length === 0) {
            const booksToAdd = [
                { name: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", publish: 1960, pages: 281, copies: 5 },
                { name: "1984", author: "George Orwell", publisher: "Secker & Warburg", publish: 1949, pages: 328, copies: 4 },
                { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", publisher: "Bloomsbury", publish: 1997, pages: 223, copies: 7 },
                { name: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Charles Scribner's Sons", publish: 1925, pages: 180, copies: 3 },
                { name: "The Hobbit", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", publish: 1937, pages: 310, copies: 6 },
                { name: "Pride and Prejudice", author: "Jane Austen", publisher: "T. Egerton", publish: 1813, pages: 279, copies: 4 },
                { name: "The Catcher in the Rye", author: "J.D. Salinger", publisher: "Little, Brown and Company", publish: 1951, pages: 214, copies: 5 },
                { name: "The Lord of the Rings", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", publish: 1954, pages: 1178, copies: 2 },
                { name: "The Da Vinci Code", author: "Dan Brown", publisher: "Doubleday", publish: 2003, pages: 454, copies: 6 },
                { name: "The Alchemist", author: "Paulo Coelho", publisher: "HarperTorch", publish: 1988, pages: 208, copies: 5 }
            ];

            booksToAdd.forEach(book =>
                this.bookManager.addBook(book.name, book.author, book.publisher, book.publish, book.pages, book.copies)
            );
        }

        this.bookEventManager.loadTableData();
        console.log("All Books:", this.bookManager.getAllBooks());
    }
}