import { BookEventHandler } from "./BookEventHandler.js";
import { VisitorEventHandler } from "./VisitorEventHandler.js";
import { BookManager } from "../managers/BookManager.js";
import { VisitorManager } from "../managers/VisitorManager.js";

export class EventHandler {
  constructor() {
    this.initialize();
  }

  initialize() {
    const currentPage = window.location.pathname;
    console.log("Current page:", currentPage);

    switch (true) {
      case currentPage.includes("index.html"):
        console.log("Initializing BookEventHandler...");
        this.loadBookData();
        break;
      case currentPage.includes("visitor.html"):
        console.log("Initializing VisitorEventHandler...");
        this.loadVisitorData();
        break;
      default:
        console.warn("No matching event handler for page:", currentPage);
        break;
    }
  }

  loadBookData() {
    // window.localStorage.clear(); // Clear localStorage for testing purposes
    const bookManager = new BookManager();
    const bookEventHandler = new BookEventHandler();
    let storedData = JSON.parse(window.localStorage.getItem("book")) || {data: [],};

    if ( storedData.data.length === 0 && bookManager.getAllBooks().length === 0) {
      const booksToAdd = [
        { name: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", publish: 1960, pages: 281, copies: 5 },
        { name: "1984", author: "George Orwell", publisher: "Secker & Warburg", publish: 1949, pages: 328, copies: 4 },
        { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", publisher: "Bloomsbury", publish: 1997, pages: 223, copies: 7 },
        { name: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Charles Scribner's Sons", publish: 1925, pages: 180, copies: 3 },
        { name: "The Hobbit", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", publish: 1937, pages: 310, copies: 6 },
      ];

      booksToAdd.forEach((book) =>
        bookManager.addBook(
          book.name,
          book.author,
          book.publisher,
          book.publish,
          book.pages,
          book.copies
        )
      );
    }

    bookEventHandler.loadBookTableData();
    console.log("All Books:", bookManager.getAllBooks());
  }

  loadVisitorData() {
    // window.localStorage.clear(); // Clear localStorage for testing purposes
    const visitorManager = new VisitorManager();
    const visitorEventHandler = new VisitorEventHandler();
    let storedData = JSON.parse(window.localStorage.getItem("visitor")) || {data: [],};

    if ( storedData.data.length === 0 && visitorManager.getAllVisitors().length === 0) {
      const visitorsToAdd = [
        { name: "Charlie", phone: "555-555-5555" },
        { name: "Alice", phone: "123-456-7890" },
        { name: "Bob", phone: "987-654-3210" },
      ];

      visitorsToAdd.forEach((visitor) => {
        visitorManager.addVisitor(visitor.name, visitor.phone);
      });
    }

    visitorEventHandler.loadVisitorTableData();
    console.log("All Visitors:", visitorManager.getAllVisitors());
  }
}
