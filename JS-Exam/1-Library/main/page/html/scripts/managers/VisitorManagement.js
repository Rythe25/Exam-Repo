// export class VisitorManagement extends Manager {
//     static #instance = null

//     constructor(key = 'visitor') {
//         super(key)
//     }

//     static getInstance() {
//         if (this.#instance === null) {
//             this.#instance = new VisitorManagement()
//             this.#instance.loadData()
//         }
//         return this.#instance

//     }
//     addVisitor(name, age, phone) {
//         const visitor = new Visitor(name, age, phone)
//         this.data.push(visitor)
//         this.storeData()
//         return visitor
//     }

//     updateVisitor(id, name, age, phone) {
//         const index = this.indexOf(id)
//         if (index === -1) return null
//         const visitor = this.data[index]
//         visitor.name = name
//         visitor.age = age
//         visitor.phone = phone
//         this.storeData()
//         return visitor
//     }

//     deleteVisitor(id) {
//         const index = this.indexOf(id)
//         if (index === -1) return null
//         const visitor = this.data[index]
//         this.data.splice(index, 1)
//         this.storeData()
//         return visitor
//     }

//     getAllVisitors() {
//         return this.data
//     }
// }