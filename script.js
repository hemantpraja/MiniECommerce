history.pushState(null, null, document.URL);
window.addEventListener('popstate', function(event) {
    history.pushState(null, null, document.URL);
});


const namePattern = /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/;
const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

var adminId = document.getElementById("adminId");
var adminPass = document.getElementById("adminPass");
console.log("before");
localStorage.setItem(JSON.stringify("admin",{admin:"admin",pass:"admin"}));
console.log("after");


var details = JSON.parse(localStorage.getItem("admin"));
// console.log(details);
var adminIdWarning = document.getElementById("adminIdWarning");
var adminPassWarning = document.getElementById("adminPassWarning");
adminId.addEventListener("keypress", () => {
    adminId.style.border = "1px solid blue";
    adminIdWarning.innerText = "";
});
adminPass.addEventListener("keypress", () => {
    adminPass.style.border = "1px solid blue";
    adminPassWarning.innerText = "";
});

var adminSignIn = () => {
    var check = 1;
    if (details.id !== adminId.value) {
        adminId.style.border = "3px solid red";
        adminIdWarning.innerText = " * Invalid id";
        adminIdWarning.style.color = "red";
        check = 0;
    }
    if (details.pass !== adminPass.value) {
        adminPass.style.border = "3px solid red";
        adminPassWarning.innerText = " * Invalid Password";
        adminPassWarning.style.color = "red";
        check = 0
    }
    if (check === 1) {
        window.location.href = "admin.html";
    }
}


/* User Sign Up */
var newUserName = document.getElementById("newUserName")
var newUserFullName = document.getElementById("newUserFullName")
var newUserPass = document.getElementById("newUserPass")
var newUserCnfPass = document.getElementById("newUserCnfPass");
var newUserNameWarning = document.getElementById("newUserNameWarning")
var newUserFullNameWarning = document.getElementById("newUserFullNameWarning");
var newUserPassWarning = document.getElementById("newUserPassWarning");
var newUserCnfPassWarning = document.getElementById("newUserCnfPassWarning");

let valid = true;
newUserName.addEventListener("keyup", () => {
    if (newUserName.value == "" || newUserName == null || newUserName == undefined || !usernamePattern.test(newUserName.value)) {
        newUserNameWarning.innerText = " * Invalid Username";
        newUserNameWarning.style.color = "red";
        newUserName.style.border = "3px solid red";
        valid = false;
    } else {
        newUserNameWarning.innerText = "";
        newUserName.style.border = "1px solid blue";
        valid = true;
    }

});
newUserFullName.addEventListener("keyup", () => {
    if (newUserFullName.value == "" || newUserFullName == null || newUserFullName == undefined || !namePattern.test(newUserFullName.value)) {
        newUserFullNameWarning.innerText = " * Invalid Name";
        newUserFullNameWarning.style.color = "red";
        newUserFullName.style.border = "3px solid red";
        valid = false;
    } else {
        newUserFullName.style.border = "1px solid blue";
        newUserFullNameWarning.innerText = "";
        valid = true;
    }
});
newUserPass.addEventListener("keyup", () => {
    if (newUserPass.value == "" || newUserPass == null || newUserPass == undefined) {
        newUserPassWarning.innerText = " * Make an Strong password";
        newUserPassWarning.style.color = "red";
        newUserPass.style.border = "3px solid red";
        valid = false;
    } else {
        newUserPass.style.border = "1px solid blue";
        newUserPassWarning.innerText = "";
        valid = true;
    }

});
newUserCnfPass.addEventListener("keyup", () => {
    if (newUserPass.value != newUserCnfPass.value) {
        newUserCnfPassWarning.innerText = " * Password does'nt match";
        newUserCnfPassWarning.style.color = "red";
        newUserCnfPass.style.border = "3px solid red";
        valid = false;
    } else {
        newUserCnfPass.border = "1px solid blue";
        newUserCnfPassWarning.innerText = "";
        valid = true;
    }
});

var uId;
function userSignUp(){
    if (valid) {
        var usersArr = JSON.parse(localStorage.getItem("users")) ?? [];
        usersArr.length != 0 ? usersArr.findLast((user) => { uId = user.userId }) : uId = 0;
        var newUser = {
            userId: uId + 1,
            userName: newUserName.value,
            fullName: newUserFullName.value,
            password: newUserPass.value
        }
        if (usersArr) {
            var check = 1;
            for (let i = 0; i < usersArr.length; i++) {
                if (newUserName.value === usersArr[i].userName) {
                    newUserName.style.border = "3px solid red";
                    alert("User Allready Exist.")
                    check = 0;
                }
            }
            if (check == 0) {
                return false;
            } else {
                usersArr.push(newUser);
            }
        }
        else {
            usersArr = []
            usersArr.push(newUser);
        }
        localStorage.setItem("users", JSON.stringify(usersArr));
        alert("!!!!!!Congrats!!!!!!\nSign Up Completed Successfully");
        sessionStorage.setItem("login", JSON.stringify(newUser))
        window.location.href = "user.html";
    }else{
        alert("Please Enter write Informstion.")
    }
}


/* User Sign In */
var userId = document.getElementById("userId");
var userPass = document.getElementById("userPass");
var userIdWarning = document.getElementById("userIdWarning");
var userPassWarning = document.getElementById("userPassWarning");
var usersArr = JSON.parse(localStorage.getItem("users"));
userId.addEventListener("keydown", () => {
    userId.style.border = "1px solid blue";
    userIdWarning.innerText = "";
});
userPass.addEventListener("keydown", () => {
    userPassWarning.innerText = "";
    userPass.style.border = "1px solid blue";
});
var userSignIn = () => {
    console.log(usersArr)
    var checkid = 0;
    var checkpass = 0;
    var index;
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].userName === userId.value) {
            checkid = 1;
            if (usersArr[i].password === userPass.value) {
                checkpass = 1;
                index = i;
                break;
            }
        }
    }
    if (checkid == 0) {
        userId.style.border = "3px solid red";
        userIdWarning.innerText = "* Invalid user id";
        userIdWarning.style.color = 'red';
    }
    if (checkpass == 0) {
        userPass.style.border = "3px solid red";
        userPassWarning.innerText = "* Invalid password";
        userPassWarning.style.color = "red";
    }
    if (checkpass) {
        sessionStorage.setItem("login", JSON.stringify(usersArr[index]));
        window.location.href = "user.html";

    } else {
        return false;
    }
}



