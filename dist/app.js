"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Roles = void 0;
// ---------------------------
//  ENUM for Roles
// ---------------------------
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "Admin";
    Roles["USER"] = "User";
    Roles["MANAGER"] = "Manager";
})(Roles || (exports.Roles = Roles = {}));
// ---------------------------
//  USER Model Class
// ---------------------------
class User {
    constructor(first, middle, last, email, phone, role, address, editing = false) {
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.address = address;
        this.editing = editing;
    }
}
exports.User = User;
// ---------------------------
// Sample JSON Data
// ---------------------------
let userData = [
    new User("Ritesh", "K", "Kumar", "ritesh@mail.com", "9876543210", Roles.USER, "Delhi"),
    new User("Aman", "K", "Singh", "aman@mail.com", "8765432109", Roles.MANAGER, "Mumbai"),
    new User("John", "D", "Doe", "john@mail.com", "9988776655", Roles.ADMIN, "Bangalore")
];
// ---------------------------
// MAIN CRUD Class
// ---------------------------
class UserCrud {
    constructor() {
        this.tableBody = document.querySelector("#userTable tbody");
        this.loadBtn = document.getElementById("loadBtn");
        this.loadBtn.addEventListener("click", () => {
            if (this.loadBtn.innerText === "Load Data")
                this.load();
            else
                this.refresh();
        });
    }
    load() {
        this.renderTable();
        this.loadBtn.innerText = "Refresh Data";
    }
    refresh() {
        this.renderTable(); // reload original array
    }
    edit(index) {
        userData[index].editing = true;
        this.renderTable();
    }
    save(index) {
        const row = this.tableBody.children[index];
        const inputs = row.querySelectorAll("input");
        userData[index].first = inputs[0].value;
        userData[index].middle = inputs[1].value;
        userData[index].last = inputs[2].value;
        userData[index].email = inputs[3].value;
        userData[index].phone = inputs[4].value;
        userData[index].role = inputs[5].value;
        userData[index].address = inputs[6].value;
        userData[index].editing = false;
        this.renderTable();
    }
    cancel(index) {
        userData[index].editing = false;
        this.renderTable();
    }
    delete(index) {
        userData.splice(index, 1);
        this.renderTable();
    }
    // ---------------------------
    // RENDERING TABLE
    // ---------------------------
    renderTable() {
        this.tableBody.innerHTML = "";
        userData.forEach((user, index) => {
            const row = document.createElement("tr");
            if (user.editing) {
                row.innerHTML = `
          <td><input class="edit-input" value="${user.first}"></td>
          <td><input class="edit-input" value="${user.middle}"></td>
          <td><input class="edit-input" value="${user.last}"></td>
          <td><input class="edit-input" value="${user.email}"></td>
          <td><input class="edit-input" value="${user.phone}"></td>
          <td><input class="edit-input" value="${user.role}"></td>
          <td><input class="edit-input" value="${user.address}"></td>
          <td>
            <button onclick="crud.save(${index})">Save</button>
            <button onclick="crud.cancel(${index})">Cancel</button>
          </td>
        `;
            }
            else {
                row.innerHTML = `
          <td>${user.first}</td>
          <td>${user.middle}</td>
          <td>${user.last}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.role}</td>
          <td>${user.address}</td>
          <td>
            <button onclick="crud.edit(${index})">Edit</button>
            <button onclick="crud.delete(${index})">Delete</button>
          </td>
        `;
            }
            this.tableBody.appendChild(row);
        });
    }
}
// Create object accessible in window
// @ts-ignore
window.crud = new UserCrud();
