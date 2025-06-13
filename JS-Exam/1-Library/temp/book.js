export class Book {
    #id;
    #number;
    #name;
    #authorName;
    #publishYear;
    #publisherName;
    #pages;
    #copies;

    constructor() {
        this.#id = 0;
        this.#number = 0;
        this.#name = "";
        this.#authorName = "";
        this.#publishYear = new Date().getFullYear();
        this.#publisherName = "";
        this.#pages = 0;
        this.#copies = 0;
    }

    get Id() { return this.#id; }
    get Number() { return this.#number; }
    get Name() { return this.#name; }
    get AuthorName() { return this.#authorName; }
    get PublishYear() { return this.#publishYear; }
    get PublisherName() { return this.#publisherName; }
    get Pages() { return this.#pages; }
    get Copies() { return this.#copies; }

    set Id(value) { this.#id = value; }
    set Number(value) { this.#number = value; }
    set Name(value) { this.#name = value; }
    set AuthorName(value) { this.#authorName = value; }
    set PublishYear(value) { this.#publishYear = value; }
    set PublisherName(value) { this.#publisherName = value; }
    set Pages(value) { this.#pages = value; }
    set Copies(value) { this.#copies = value; }

    toJSON() {
        return {
            id: this.#id,
            number: this.#number,
            name: this.#name,
            authorName: this.#authorName,
            publishYear: this.#publishYear,
            publisherName: this.#publisherName,
            pages: this.#pages,
            copies: this.#copies
        };
    }

    static fromJSON(data) {
        const book = new Book();
        book.Id = data.id;
        book.Number = data.number || 0; // Handle legacy data without number
        book.Name = data.name;
        book.AuthorName = data.authorName;
        book.PublishYear = data.publishYear;
        book.PublisherName = data.publisherName;
        book.Pages = data.pages;
        book.Copies = data.copies;
        return book;
    }
}