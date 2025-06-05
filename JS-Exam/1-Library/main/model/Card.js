export class Card {
    #Id;
    #VisitorId;
    #BookId;
    #BorrowDate;
    #ReturnDate;

    constructor() {
        this.#Id = 0;
        this.#VisitorId = 0;
        this.#BookId = 0;
        this.#BorrowDate = new Date();
        this.#ReturnDate = null;
    }

    get Id() { return this.#Id; } 
    get VisitorId() { return this.#VisitorId; } 
    get BookId() { return this.#BookId; } 
    get BorrowDate() { return this.#BorrowDate; } 
    get ReturnDate() { return this.#ReturnDate; } 
    
    set Id(value) { this.#Id = value; }
    set VisitorId(value) { this.#VisitorId = value; }
    set BookId(value) { this.#BookId = value; }
    set BorrowDate(value) { this.#BorrowDate = value; }
    set ReturnDate(value) { this.#ReturnDate = value; }

    Display() {
        console.log(`ID: ${this.#Id}`);
        console.log(`Visitor's ID: ${this.#VisitorId}`);
        console.log(`Book's ID: ${this.#BookId}`);
        console.log(`Borrow Date: ${this.#BorrowDate instanceof Date ? this.#BorrowDate.toLocaleDateString() : this.#BorrowDate}`);
        console.log(`Return Date: ${this.#ReturnDate instanceof Date ? this.#ReturnDate.toLocaleDateString() : this.#ReturnDate}`);
    }
}