import { BookManager } from './bookManager.js';
import { BookEventListener } from './bookEventListener.js';

const bookManager = new BookManager();
bookManager.loadData();
const bookEventListener = new BookEventListener(bookManager);
window.bookEventListener = bookEventListener; // Expose for inline onclick handlers
bookEventListener.renderBooks();