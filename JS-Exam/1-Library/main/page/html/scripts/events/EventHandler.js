import { BookManagement } from "../managers/BookManagement.js";
import { BookEventManager } from "./BookEventManager.js";

export class EventHandler {
    constructor() {
        this.bookManager = BookManagement.getInstance();
        this.bookEventManager = BookEventManager.getInstance();
        this.loadData();
    }

    loadData(){
        window.localStorage.clear()

        let storedData = JSON.parse(window.localStorage.getItem('book')) || { data: [] };
        if (storedData.data.length === 0) {
            const booksToAdd = [
                { name: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", year: 1960, numberOfPages: 281, numberOfCopies: 5 },
                { name: "1984", author: "George Orwell", publisher: "Secker & Warburg", year: 1949, numberOfPages: 328, numberOfCopies: 4 },
                { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", publisher: "Bloomsbury", year: 1997, numberOfPages: 223, numberOfCopies: 7 },
                { name: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Charles Scribner's Sons", year: 1925, numberOfPages: 180, numberOfCopies: 3 },
                { name: "The Hobbit", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", year: 1937, numberOfPages: 310, numberOfCopies: 6 },
                { name: "Pride and Prejudice", author: "Jane Austen", publisher: "T. Egerton", year: 1813, numberOfPages: 279, numberOfCopies: 4 },
                { name: "The Catcher in the Rye", author: "J.D. Salinger", publisher: "Little, Brown and Company", year: 1951, numberOfPages: 214, numberOfCopies: 5 },
                { name: "The Lord of the Rings", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", year: 1954, numberOfPages: 1178, numberOfCopies: 2 },
                { name: "The Da Vinci Code", author: "Dan Brown", publisher: "Doubleday", year: 2003, numberOfPages: 454, numberOfCopies: 6 },
                { name: "The Alchemist", author: "Paulo Coelho", publisher: "HarperTorch", year: 1988, numberOfPages: 208, numberOfCopies: 5 }
            ];

            booksToAdd.forEach(book =>
                this.bookManager.addBook(book.name, book.author, book.publisher, book.year, book.numberOfPages, book.numberOfCopies)
            );
        }

        // Optionally, update the table display if needed
        this.bookEventManager.loadTableData();

        console.log("All Books:", this.bookManager.getAllBooks())

        // bookEventManager.loadTableData()
    }
}

