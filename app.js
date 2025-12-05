var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsonData = [
    { first: "Ritesh", middle: "K", last: "Kumar", email: "ritesh@mail.com", phone: "9876543210", role: "Admin", address: "HP" },
    { first: "Aman", middle: "K", last: "Singh", email: "aman@mail.com", phone: "8765432109", role: "Manager", address: "Mumbai" },
    { first: "Aniket", middle: "D", last: "Sharma", email: "anni123@mail.com", phone: "9988776655", role: "Admin", address: "UNA" }
];
var userData = [];
var originalData = JSON.parse(JSON.stringify(jsonData));
var crud = {
    load: function () {
        userData = [];
        for (var i = 0; i < jsonData.length; i++) {
            var u = jsonData[i];
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
        var select = row.querySelector("select[name='role']");
        userData[index].first = inputs[0].value;
        userData[index].middle = inputs[1].value;
        userData[index].last = inputs[2].value;
        userData[index].email = inputs[3].value;
        userData[index].phone = inputs[4].value;
        userData[index].role = select.value; // ✔ FIXED
        userData[index].address = inputs[5].value;
        userData[index].editing = false;
        jsonData[index] = __assign({}, userData[index]);
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
        var _loop_1 = function (i) {
            var u = userData[i];
            var row = document.createElement("tr");
            if (u.editing) {
                row.innerHTML =
                    "<td><input value='" + u.first + "'></td>" +
                        "<td><input value='" + u.middle + "'></td>" +
                        "<td><input value='" + u.last + "'></td>" +
                        "<td><input value='" + u.email + "'></td>" +
                        "<td><input value='" + u.phone + "'></td>" +
                        "<td><select name=\"role\">\n            ".concat(Object.values(Roles)
                            .map(function (r) { return "<option value=\"".concat(r, "\" ").concat(r === u.role ? "selected" : "", ">").concat(r, "</option>"); })
                            .join(""), "\n          </select></td>") +
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
        };
        for (var i = 0; i < userData.length; i++) {
            _loop_1(i);
        }
    }
};
document.getElementById("loadBtn").onclick = function () {
    var btn = this;
    var text = btn.innerText.trim().toLowerCase();
    if (text === "load data") {
        crud.load();
    }
    else {
        crud.refresh();
    }
};
window.crud = crud;
