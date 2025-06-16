import {Manager} from "./Manager.js";
import {Book} from "../models/Book.js";

export class BookManagement extends Manager{
    static #instance = null

    constructor(key = 'book') {
        super(key)
    }

    /**
     * Singleton instance
     * @returns {BookManagement}
     */

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new BookManagement()
        }
        return this.#instance
    }

    addBook(name, author, publisher, year, numberOfPages, numberOfCopies) {
        const book = new Book(++this.lastId, name, author, publisher, year, numberOfPages, numberOfCopies)
        this.data.push(book)
        this.storeData()
        return book
    }

    updateBook(bookInfo){
        const index = this.indexOf(bookInfo.id)
        if(index != -1){
            //TODO check for duplicate book name
            Object.assign(this.data[index], bookInfo)
            this.storeData()
        }
        return index != -1
    }

    deleteBook(bookId){
        const index = this.indexOf(bookId)
        if(index != -1){
            for(let i=index+1;i<this.data.length;i++){
                this.data[i-1] = this.data[i]
            }
            this.data.length--
            this.storeData()
        }
        return index != -1
    }

    getAllBooks() {
        return this.data
    }
}