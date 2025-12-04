// enum for roles
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "Admin";
    Roles["USER"] = "User";
    Roles["MANAGER"] = "Manager";
})(Roles || (Roles = {}));
// basic user class
var User = /** @class */ (function () {
    function User(f, m, l, e, p, r, a) {
        this.editing = false;
        this.first = f;
        this.middle = m;
        this.last = l;
        this.email = e;
        this.phone = p;
        this.role = r;
        this.address = a;
    }
    return User;
}());
// JSON data (must match enum exactly)
var jsonData = [
    { first: "Ritesh", middle: "K", last: "Kumar", email: "ritesh@mail.com", phone: "9876543210", role: "Admin", address: "HP" },
    { first: "Aman", middle: "K", last: "Singh", email: "aman@mail.com", phone: "8765432109", role: "Manager", address: "Mumbai" },
    { first: "Aniket", middle: "D", last: "Sharma", email: "anni123@mail.com", phone: "9988776655", role: "Admin", address: "UNA" }
];
// convert json to user objects
var userData = [];
var originalData = JSON.parse(JSON.stringify(jsonData));
// simple crud object
var crud = {
    load: function () {
        userData = [];
        for (var i = 0; i < jsonData.length; i++) {
            var u = jsonData[i];
            // FIXED: cast JSON role to enum safely
            var roleValue = u.role;
            userData.push(new User(u.first, u.middle, u.last, u.email, u.phone, roleValue, u.address));
        }
        document.getElementById("userTable").style.display = "table";
        document.getElementById("loadBtn").innerText = "Refresh data";
        crud.renderTable();
    },
    refresh: function () {
        jsonData = JSON.parse(JSON.stringify(originalData));
        crud.load();
    },
    edit: function (index) {
        userData[index].editing = true;
        crud.renderTable();
    },
    save: function (index) {
        var row = document.getElementById("tableBody").children[index];
        var inputs = row.getElementsByTagName("input");
        userData[index].first = inputs[0].value;
        userData[index].middle = inputs[1].value;
        userData[index].last = inputs[2].value;
        userData[index].email = inputs[3].value;
        userData[index].phone = inputs[4].value;
        // FIXED: casting input value to enum
        userData[index].role = inputs[5].value;
        userData[index].address = inputs[6].value;
        userData[index].editing = false;
        crud.renderTable();
    },
    cancel: function (index) {
        var d = jsonData[index];
        userData[index].first = d.first;
        userData[index].middle = d.middle;
        userData[index].last = d.last;
        userData[index].email = d.email;
        userData[index].phone = d.phone;
        userData[index].role = d.role;
        userData[index].address = d.address;
        userData[index].editing = false;
        crud.renderTable();
    },
    delete: function (index) {
        userData.splice(index, 1);
        crud.renderTable();
    },
    renderTable: function () {
        var body = document.getElementById("tableBody");
        body.innerHTML = "";
        for (var i = 0; i < userData.length; i++) {
            var u = userData[i];
            var row = document.createElement("tr");
            if (u.editing) {
                row.innerHTML =
                    "<td><input value='" + u.first + "'></td>" +
                        "<td><input value='" + u.middle + "'></td>" +
                        "<td><input value='" + u.last + "'></td>" +
                        "<td><input value='" + u.email + "'></td>" +
                        "<td><input value='" + u.phone + "'></td>" +
                        "<td><input value='" + u.role + "'></td>" +
                        "<td><input value='" + u.address + "'></td>" +
                        "<td>" +
                        "<button onclick='crud.save(" + i + ")'>Save</button>" +
                        "<button onclick='crud.cancel(" + i + ")'>Cancel</button>" +
                        "</td>";
            }
            else {
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
document.getElementById("loadBtn").onclick = function () {
    var btn = this; // 👈 FIX
    var text = btn.innerText.trim().toLowerCase();
    if (text === "load data") {
        crud.load();
    }
    else {
        crud.refresh();
    }
};
// allow HTML buttons to access crud
window.crud = crud;
