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


let userData: User[] = [
  new User("Ritesh", "K", "Kumar", "ritesh@mail.com", "9876543210", Roles.USER, "HP"),
  new User("Aman", "K", "Singh", "aman@mail.com", "8765432109", Roles.MANAGER, "Mumbai"),
  new User("Aniket", "D", "sharma", "anni123@mail.com", "9988776655", Roles.ADMIN, "UNA")
];


const originalData: User[] = JSON.parse(JSON.stringify(userData));


class UserCrud {
  private table=document.getElementById('userTable') as HTMLTableElement;
  private tableBody = document.querySelector("#userTable tbody") as HTMLTableSectionElement;
  private loadBtn = document.getElementById("loadBtn") as HTMLButtonElement;

  constructor() {
    this.loadBtn.addEventListener("click", () => {
      if (this.loadBtn.innerText === "Load Data") this.load();
      else this.refresh();
    });
  }

  load(): void {
    this.renderTable();
    this.table.style.display="table";
    this.loadBtn.innerText = "Refresh Data";
  }

  
  refresh(): void {
    userData = JSON.parse(JSON.stringify(originalData));
    this.renderTable();
  }

  edit(index: number): void {
    userData[index].editing = true;
    this.renderTable();
  }

  save(index: number): void {
    const row = this.tableBody.children[index] as HTMLTableRowElement;
    const inputs = row.querySelectorAll("input");

    userData[index].first = (inputs[0] as HTMLInputElement).value;
    userData[index].middle = (inputs[1] as HTMLInputElement).value;
    userData[index].last = (inputs[2] as HTMLInputElement).value;
    userData[index].email = (inputs[3] as HTMLInputElement).value;
    userData[index].phone = (inputs[4] as HTMLInputElement).value;
    userData[index].role = (inputs[5] as HTMLInputElement).value as Roles;
    userData[index].address = (inputs[6] as HTMLInputElement).value;

    userData[index].editing = false;
    this.renderTable();
  }

  cancel(index: number): void {
    userData[index].editing = false;
    this.renderTable();
  }

  delete(index: number): void {
    userData.splice(index, 1);
    this.renderTable();
  }

  private renderTable(): void {
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
      } else {
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

// @ts-ignore
window.crud = new UserCrud();
