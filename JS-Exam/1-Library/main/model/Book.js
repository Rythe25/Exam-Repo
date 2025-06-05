export class Book {
  #id;
  #name;
  #authorName;
  #publishYear;
  #publisherName;
  #pages;
  #copies;

  constructor() {
    this.#id = 0;
    this.#name = "";
    this.#authorName = "";
    this.#publishYear = new Date();
    this.#publisherName = "";
    this.#pages = 0;
    this.#copies = 0;
  }

  get Id() { return this.#id; }
  get Name() { return this.#name; }
  get AuthorName() { return this.#authorName; }
  get PublishYear() { return this.#publishYear; }
  get PublisherName() { return this.#publisherName; }
  get Pages() { return this.#pages; }
  get Copies() { return this.#copies; }

  set Id(value) { this.#id = value; }
  set Name(value) { this.#name = value; }
  set AuthorName(value) { this.#authorName = value; }
  set PublishYear(value) { this.#publishYear = value; }
  set PublisherName(value) { this.#publisherName = value; }
  set Pages(value) { this.#pages = value; }
  set Copies(value) { this.#copies = value; }

  Display() {
    console.log(`ID: ${this.#id}`);
    console.log(`Name: ${this.#name}`);
    console.log(`Author's Name: ${this.#authorName}`);
    console.log(
      `Year of Publishing: ${
        this.#publishYear instanceof Date
          ? this.#publishYear.getFullYear()
          : this.#publishYear
      }`
    );
    console.log(`Publisher Name: ${this.#publisherName}`);
    console.log(`Number of Pages: ${this.#pages}`);
    console.log(`Number of Copies: ${this.#copies}`);
  }
}