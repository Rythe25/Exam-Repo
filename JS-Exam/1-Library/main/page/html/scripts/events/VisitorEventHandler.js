import { VisitorManager } from "../managers/VisitorManager.js";

export class VisitorEventHandler {
  constructor() {
    this.visitorManager = VisitorManager.getInstance();
    this.visitors = this.visitorManager.getAllVisitors();
    this.loadVisitorTableData();
    this.initAddVisitorEvent();
    this.initVisitorEvent();
  }

  loadVisitorTableData(visitorsToDisplay = this.visitors) {
    // console.log(visitorsToDisplay);
    const tableBody = document.querySelector(".visitor-table-body");
    tableBody.innerHTML = "";
    visitorsToDisplay.forEach((visitor) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${visitor.id}</td>
                    <td>${visitor.name}</td>
                    <td>${visitor.phone}</td>
                    <td>
                        <button class="edit-buttons-style">
                            <img class="button-icons-style" src="icon/pencil.png" alt="Edit">
                        </button>
                    </td>
                `;
      tableBody.appendChild(row);
    });
  }

  initVisitorEvent(){
    const sortButton = document.getElementById('sort-button');
    sortButton.addEventListener('click', () => {
        const sortColumn = document.getElementById('sort-column').value;
        this.sortTable(sortColumn)
    })

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById("search-input");
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
      this.searchTable(query);
    });
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();
        this.searchTable(query);
      }
    });
  }

  initAddVisitorEvent() {
    console.log("Initializing new visitor event handlers...");

    const addVisitorButton = document.getElementById("new-visitor-button");
    const addVisitorPopUp = document.getElementById("add-visitor-pop-up");
 
    addVisitorButton.addEventListener('click', (event) => {
        event.preventDefault();
        addVisitorPopUp.classList.add("active-pop-up");
    });

    const addVisitorCancelButton = document.getElementById("add-cancel-button");
    
    addVisitorCancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.resetNewVisitorForm();
        addVisitorPopUp.classList.remove("active-pop-up");
    });

    const addVisitorCreateButton = document.getElementById('add-create-button');
    addVisitorCreateButton.addEventListener('click', (event) => {
        event.preventDefault();

        const newVisitor = {
            id: this.visitorManager.getLastId() + 1,
            name: document.getElementById('add-name').value,
            phone: document.getElementById('add-phone').value
        };

        console.log("createing new book with values: ", newVisitor);

        for (const inputField in newVisitor){
            if (newVisitor[inputField] === ''){
                alert(`Please fill out the ${inputField} field with a valid value`);
                return;
            }
        }

        this.visitorManager.addVisitor(newVisitor.name,newVisitor.phone);
        this.visitors = this.visitorManager.getAllVisitors();
        this.loadVisitorTableData();
        addVisitorPopUp.classList.remove('active-pop-up')
        this.resetNewVisitorForm();
    });

    }

    resetNewVisitorForm(){
        document.getElementById('add-name').value = '';
        document.getElementById('add-phone').value = '';
    }

    sortTable(column){
        this.visitors.sort((a, b) => {
        const isNumeric = ["id"].includes(column);
        const valA = isNumeric ? a[column] : a[column].toString().toLowerCase();
        const valB = isNumeric ? b[column] : b[column].toString().toLowerCase();
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
        });
        this.loadVisitorTableData();
    }

    searchTable(query){
        query = query.trim().toLowerCase();
        console.log("Search query:", query);

        if (!query) {
            this.loadVisitorTableData(this.visitors); // Show all books if query is empty
            return;
        }

        const filteredVisitors = this.visitors.filter((visitor) => {
            return (
                visitor.name.toLowerCase().includes(query) || visitor.phone.toLowerCase().includes(query) 
            );
        });
        console.log("Filtered books count:", filteredVisitors.length); // Debug the number of matches
        this.loadVisitorTableData(filteredVisitors); // Render only the filtered results
    }
}   
