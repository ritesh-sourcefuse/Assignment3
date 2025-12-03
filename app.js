var Roles;
(function (Roles) {
    Roles["ADMIN"] = "Admin";
    Roles["USER"] = "User";
    Roles["MANAGER"] = "Manager";
})(Roles || (Roles = {}));
var User = /** @class */ (function () {
    function User(first, middle, last, email, phone, role, address, editing) {
        if (editing === void 0) { editing = false; }
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.address = address;
        this.editing = editing;
    }
    return User;
}());
var userData = [
    new User("Ritesh", "K", "Kumar", "ritesh@mail.com", "9876543210", Roles.USER, "HP"),
    new User("Aman", "K", "Singh", "aman@mail.com", "8765432109", Roles.MANAGER, "Mumbai"),
    new User("Aniket", "D", "sharma", "anni123@mail.com", "9988776655", Roles.ADMIN, "UNA")
];
var originalData = JSON.parse(JSON.stringify(userData));
var UserCrud = /** @class */ (function () {
    function UserCrud() {
        var _this = this;
        this.table = document.getElementById('userTable');
        this.tableBody = document.querySelector("#userTable tbody");
        this.loadBtn = document.getElementById("loadBtn");
        this.loadBtn.addEventListener("click", function () {
            if (_this.loadBtn.innerText === "Load Data")
                _this.load();
            else
                _this.refresh();
        });
    }
    UserCrud.prototype.load = function () {
        this.renderTable();
        this.table.style.display = "table";
        this.loadBtn.innerText = "Refresh Data";
    };
    UserCrud.prototype.refresh = function () {
        userData = JSON.parse(JSON.stringify(originalData));
        this.renderTable();
    };
    UserCrud.prototype.edit = function (index) {
        userData[index].editing = true;
        this.renderTable();
    };
    UserCrud.prototype.save = function (index) {
        var row = this.tableBody.children[index];
        var inputs = row.querySelectorAll("input");
        userData[index].first = inputs[0].value;
        userData[index].middle = inputs[1].value;
        userData[index].last = inputs[2].value;
        userData[index].email = inputs[3].value;
        userData[index].phone = inputs[4].value;
        userData[index].role = inputs[5].value;
        userData[index].address = inputs[6].value;
        userData[index].editing = false;
        this.renderTable();
    };
    UserCrud.prototype.cancel = function (index) {
        userData[index].editing = false;
        this.renderTable();
    };
    UserCrud.prototype.delete = function (index) {
        userData.splice(index, 1);
        this.renderTable();
    };
    UserCrud.prototype.renderTable = function () {
        var _this = this;
        this.tableBody.innerHTML = "";
        userData.forEach(function (user, index) {
            var row = document.createElement("tr");
            if (user.editing) {
                row.innerHTML = "\n          <td><input class=\"edit-input\" value=\"".concat(user.first, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.middle, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.last, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.email, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.phone, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.role, "\"></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.address, "\"></td>\n          <td>\n            <button onclick=\"crud.save(").concat(index, ")\">Save</button>\n            <button onclick=\"crud.cancel(").concat(index, ")\">Cancel</button>\n          </td>\n        ");
            }
            else {
                row.innerHTML = "\n          <td>".concat(user.first, "</td>\n          <td>").concat(user.middle, "</td>\n          <td>").concat(user.last, "</td>\n          <td>").concat(user.email, "</td>\n          <td>").concat(user.phone, "</td>\n          <td>").concat(user.role, "</td>\n          <td>").concat(user.address, "</td>\n          <td>\n            <button onclick=\"crud.edit(").concat(index, ")\">Edit</button>\n            <button onclick=\"crud.delete(").concat(index, ")\">Delete</button>\n          </td>\n        ");
            }
            _this.tableBody.appendChild(row);
        });
    };
    return UserCrud;
}());
// @ts-ignore
window.crud = new UserCrud();
