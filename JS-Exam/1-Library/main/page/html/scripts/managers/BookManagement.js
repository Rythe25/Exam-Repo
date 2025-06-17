import { Manager } from "./Manager.js";
import { Book } from "../models/Book.js";

export class BookManagement extends Manager {
    static #instance = null;

    constructor(key = 'book') {
        super(key);
    }

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new BookManagement();
            this.#instance.loadData();
        }
        return this.#instance;
    }

    addBook(name, author, publisher, publish, pages, copies) {
        const book = new Book(++this.lastId, name, author, publisher, publish, pages, copies);
        this.data.push(book);
        this.storeData();
        return book;
    }

    updateBook(bookInfo) {
        const index = this.indexOf(bookInfo.id);
        if (index !== -1) {
            Object.assign(this.data[index], bookInfo);
            this.storeData();
        }
        return index !== -1;
    }

    deleteBook(bookId) {
        const index = this.indexOf(bookId);
        if (index !== -1) {
            this.data.splice(index, 1); // Remove the book
            // Reassign IDs to remaining books
            this.data.forEach((book, i) => {
                book.id = i + 1; // Re-index to 1, 2, 3, ...
            });
            this.lastId = this.data.length; // Update lastId to the new count
            this.storeData(); // Save the updated data
        }
        return index !== -1;
    }

    getBookById(id) {
        return this.data.find(b => b.id === id);
    }

    getLastId(){
        return this.lastId;
    }

    getAllBooks() {
        return this.data;
    }

    indexOf(id) {
        return this.data.findIndex(b => b.id === id);
    }
}