import { Manager } from "./Manager.js"
import { BookManager } from "./BookManager.js"
import { Card } from "../models/Card.js"

export class CardManager extends Manager{
    static instance = null

    constructor(key='card'){
        super(key)
    }

    static getInstance(){
        if(CardManager.instance == null){
            CardManager.instance = new CardManager()
            CardManager.instance.loadData()
        }
        return CardManager.instance
    }

    addCard(visitorId, bookId, borrowDate = new Date()){
        const book = BookManager.getInstance().findById(parseInt(bookId))
        console.log("Books : ", book);
        if(book == null || book.numberOfCopies == 0){
            throw 'No book available'
        }
        const card = new Card(
            ++this.lastId,
            visitorId, bookId, borrowDate
        )
        this.data.push(card)
        this.storeData()
        book.copies--
        BookManager.getInstance().updateBook(book)
        return card
    }

    returnBook(cardId){
        const index = this.indexOf(cardId)
        if(index != -1){
            this.data[index].returnDate = new Date()
            this.storeData()
            const book = BookManager.getInstance().findById(this.data[index].bookId)
            if(book){
                book.copies++
                BookManager.getInstance().updateBook(book)
            }
        }
        return index != -1
    }
    
    deleteCard(cardId){
        const index = this.indexOf(cardId)
        if(index != -1){
            for(let i=index+1;i<this.data.length;i++){
                this.data[i-1] = this.data[i]
            }
            this.data.length--
            this.storeData()
        }
        return index != -1
    }

    getAllCards(){
        return this.data;
    }

    getLastId(){
        return this.lastId;
    }
}