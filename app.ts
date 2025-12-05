
enum Roles {
    ADMIN = "Admin",
    USER = "User",
    MANAGER = "Manager"
}


class User {
  constructor(
    public first: string,
    public middle: string,
    public last: string,
    public email: string,
    public phone: string,
    public role: Roles,
    public address: string,
    public editing: boolean = false
  ) {}
}


interface CrudActions {
    load(): void;
    refresh(): void;
    edit(index: number): void;
    save(index: number): void;
    cancel(index: number): void;
    delete(index: number): void;
    renderTable(): void;      
}


let jsonData = [
    { first: "Ritesh", middle: "K", last: "Kumar", email: "ritesh@mail.com", phone: "9876543210", role: "Admin", address: "HP" },
    { first: "Aman", middle: "K", last: "Singh", email: "aman@mail.com", phone: "8765432109", role: "Manager", address: "Mumbai" },
    { first: "Aniket", middle: "D", last: "Sharma", email: "anni123@mail.com", phone: "9988776655", role: "Admin", address: "UNA" }
];

let userData: User[] = [];
let originalData = JSON.parse(JSON.stringify(jsonData));


let crud: CrudActions = {
    load: function () {
        userData = [];

        for (let i = 0; i < jsonData.length; i++) {
            let u = jsonData[i];

          
            let roleValue: Roles = u.role as Roles;

            userData.push(new User(u.first, u.middle, u.last, u.email, u.phone, roleValue, u.address));
        }

        document.getElementById("userTable")!.style.display = "table";
        document.getElementById("loadBtn")!.innerText = "Refresh data"; // work on condition

        crud.renderTable();
    },

    refresh: function () {
        jsonData = JSON.parse(JSON.stringify(originalData));
        crud.load();
    },

    edit: function (index: number) {
        userData[index].editing = true;
        crud.renderTable();
    },

   save: function (index: number) {
    let row = document.getElementById("tableBody")!.children[index] as HTMLElement;

    let inputs = row.getElementsByTagName("input");// here we take input
    let select = row.querySelector<HTMLSelectElement>("select[name='role']")!;

    userData[index].first = inputs[0].value;
    userData[index].middle = inputs[1].value;
    userData[index].last = inputs[2].value;
    userData[index].email = inputs[3].value;
    userData[index].phone = inputs[4].value;

    userData[index].role = select.value as Roles;   // FIXED

    userData[index].address = inputs[5].value;

    userData[index].editing = false;
        jsonData[index] = { ...userData[index] };
    crud.renderTable();
},


    cancel: function (index: number) {
        let d = jsonData[index];

        userData[index].first = d.first;
        userData[index].middle = d.middle;
        userData[index].last = d.last;
        userData[index].email = d.email;
        userData[index].phone = d.phone;
        userData[index].role = d.role as Roles;
        userData[index].address = d.address;

        userData[index].editing = false; // editing mode off 
        crud.renderTable();
    },

    delete: function (index: number) {
        userData.splice(index, 1);
        crud.renderTable();
    },

    renderTable: function () {
        let body = document.getElementById("tableBody")!;
        body.innerHTML = ""; //clear the information and create new table 

        for (let i = 0; i < userData.length; i++) {
            let u = userData[i]; 
            let row = document.createElement("tr");

            if (u.editing) {
                row.innerHTML =
                    "<td><input value='" + u.first + "'></td>" +
                    "<td><input value='" + u.middle + "'></td>" +
                    "<td><input value='" + u.last + "'></td>" +
                    "<td><input value='" + u.email + "'></td>" +
                    "<td><input value='" + u.phone + "'></td>" +
                    `<td><select name="role">
            ${Object.values(Roles)
              .map(r => `<option value="${r}" ${r === u.role ? "selected" : ""}>${r}</option>`)
              .join("")}
          </select></td>` +
                    "<td><input value='" + u.address + "'></td>" +
                    "<td>" +
                    "<button onclick='crud.save(" + i + ")'>Save</button>" +
                    "<button onclick='crud.cancel(" + i + ")'>Cancel</button>" +
                    "</td>";
            } else {
                row.innerHTML =
                    "<td>" + u.first + "</td>" +
                    "<td>" + u.middle + "</td>" +
                    "<td>" + u.last + "</td>" +
                    "<td>" + u.email + "</td>" +
                    "<td>" + u.phone + "</td>" +
                    "<td>" + u.role + "</td>" +
                    "<td>" + u.address + "</td>" +
                    "<td>" +
                    "<button onclick='crud.edit(" + i + ")'>Edit</button>" +
                    "<button onclick='crud.delete(" + i + ")'>Delete</button>" +
                    "</td>";
            }

            body.appendChild(row);
        }
    }
};

(document.getElementById("loadBtn") as HTMLButtonElement).onclick = function () {

    const btn = this as HTMLButtonElement;   
    
    let text = btn.innerText.trim().toLowerCase();

    if (text === "load data") {
        crud.load();
    } else {
        crud.refresh();
    }
};



(window as any).crud = crud;
