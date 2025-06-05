export class Visitor{
    #Id;
    #Name;
    #PhoneNumber;

    constructor() {
        this.#Id = 0;
        this.#Name = "";
        this.#PhoneNumber = "";
    }

    get Id() { return this.#Id; } 
    get Name() { return this.#Name; } 
    get PhoneNumber() { return this.#PhoneNumber; } 

    set Id(value) { this.#Id = value; }
    set Name(value) { this.#Name = value; }
    set PhoneNumber(value) { this.#PhoneNumber = value; }

    Display() {
        console.log(`ID: ${this.#Id}`);
        console.log(`Name: ${this.#Name}`);
        console.log(`Phone Number: ${this.#PhoneNumber}`);
    }
}