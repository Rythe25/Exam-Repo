import { Manager } from "../managers/Manager.js";
import { BookManagement } from "../managers/BookManagement.js";

export class BookEventManager extends Manager {
    static #instance = null

    constructor(key = 'event') {
        super(key)
    }

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new BookEventManager()
        }
        return this.#instance
    }

    loadTableData(){
        const bookManager = BookManagement.getInstance()
        const books = bookManager.getAllBooks()
        const tableBody = document.querySelector(".table-body")
        tableBody.innerHTML = ""

        books.forEach(book => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>${book.year}</td>
                <td>${book.numberOfPages}</td>
                <td>${book.numberOfCopies}</td>
                <td>
                    <button class="edit-buttons-style">
                        <img class="button-icons-style" src="icon/pencil.png" alt="Edit">
                    </button>
                    <button class="edit-buttons-style">
                        <img class="button-icons-style" src="icon/trash-xmark.png" alt="Edit">
                    </button>
                </td>
            `
            tableBody.appendChild(row)
        })
    }
}