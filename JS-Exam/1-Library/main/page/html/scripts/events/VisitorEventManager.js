import { VisitorManager } from '../managers/VisitorManager.js';


export class VisitorEventHandler {
    constructor() {
        this.visitorManager = VisitorManager.getInstance();
        this.visitors = this.visitorManager.getAllVisitors();
        this.loadTableData();
    }

    loadVisitorData() {
        //window.localStorage.clear(); // Clear localStorage for testing purposes

        let storedData = JSON.parse(window.localStorage.getItem("visitor")) || {
        data: [],
        };

        if (storedData.data.length === 0 &&this.visitorManager.getAllVisitors().length === 0) {
            visitorsToAdd = [
                { name: "Alice", phone: "123-456-7890" },
                { name: "Bob", phone: "987-654-3210" },
                { name: "Charlie", phone: "555-555-5555" },
            ];
        }

        visitorsToAdd.forEach((visitor) => {
            this.visitorManager.addVisitor(visitor.name, visitor.phone);
        });

        this.visitorEventManager.loadTableData();
        console.log("All Visitors:", this.visitorManager.getAllVisitors());
    }

    loadTableData(visitorsToDisplay = this.visitors) {
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
}