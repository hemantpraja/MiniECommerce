history.pushState(null, null, document.URL);
window.addEventListener('popstate', function(event) {
    history.pushState(null, null, document.URL);
});



var admin = JSON.parse(localStorage.getItem("admin"));

var logoutAdmin = () => {
    window.location.href = "index.html";
}


var oldPass = document.getElementById("oldPass")
var newPass = document.getElementById("newPass")
var cnfPass = document.getElementById("cnfPass")
oldPass.addEventListener("keyup", () => {
    if (oldPass.value !== admin.pass) {
        document.getElementById("oldPassWarning").innerHTML = "* wrong old password";
        document.getElementById("oldPassWarning").style.color = "red";
    }
    else {
        document.getElementById("oldPassWarning").innerHTML = "";
        document.getElementById("oldPassWarning").style.color = "blue";
    }

});

cnfPass.addEventListener("keyup", () => {
    if (newPass.value !== cnfPass.value) {
        document.getElementById("passWarning").innerHTML = "*Password does'nt match.";
        document.getElementById("passWarning").style.color = "red";
    }
    else {
        document.getElementById("passWarning").innerHTML = "";
        document.getElementById("passWarning").style.color = "blue";
    }
});


var changeAdminPass = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "none";
    middle_3.style.display = "none";
    middle_4.style.display = "inline";
    middle_5.style.display = "none";
    middle_6.style.display = "none";

    if (oldPass.value !== admin.pass) {
        document.getElementById("oldPassWarning").innerHTML = "* wrong old password";
        document.getElementById("oldPassWarning").style.color = "red";
        return false;
    }
    if (newPass.value !== cnfPass.value) {
        document.getElementById("passWarning").innerHTML = "*Password does'nt match.";
        document.getElementById("passWarning").style.color = "red";
        return false;
    }
    admin.pass = newPass.value;
    localStorage.setItem("admin", JSON.stringify(admin));
    alert("Password Changed Successfully");
    clearPassData();
}
var clearPassData = () => {
    oldPass.value = '';
    newPass.value = '';
    cnfPass.value = '';
}

var middle_container = document.getElementById("middle-container");
var products_button = document.getElementById("products-button");

var middle_1 = document.getElementById("middle-1");
var middle_2 = document.getElementById("middle-2");
var middle_3 = document.getElementById("middle-3");
var middle_4 = document.getElementById("middle-4");
var middle_5 = document.getElementById("middle-5");
var middle_6 = document.getElementById("middle-6");
middle_1.style.display = "none";
middle_2.style.display = "none";
middle_3.style.display = "none";
middle_4.style.display = "none";
middle_5.style.display = "none";
middle_6.style.display = "none";

var openProductWindow = () => {
    middle_1.style.display = "inline";
    middle_2.style.display = "none";
    middle_3.style.display = "none";
    middle_4.style.display = "none";
    middle_5.style.display = "none";
    middle_6.style.display = "none";
    showProducts();
};

var openUsersWindow = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "inline";
    middle_3.style.display = "none";
    middle_4.style.display = "none";
    middle_5.style.display = "none";
    middle_6.style.display = "none";
    showUsers();
};

var openOrdersWindow = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "none";
    middle_3.style.display = "inline";
    middle_5.style.display = "inline";
    middle_4.style.display = "none";
    middle_6.style.display = "none";
    showUserOrders();
}

var openBlockedUsersWindow = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "none";
    middle_3.style.display = "none";
    middle_5.style.display = "none";
    middle_4.style.display = "none";
    middle_6.style.display = "inline";
    showBlockedUsers();
};

// --------------------User Oprations--------------------------------------------
var showUsers = () => {
    var tableData = ``;
    var usersList = JSON.parse(localStorage.getItem("users"));
    usersList.forEach((user) => {
        tableData += `
        <tr>
        <td>${user.userName}</td>
        <td>${user.fullName}</td>
        <td>
        <button class="btn btn-sm btn-danger" onclick="blockUser(${user.userId})">
        <i class="fa-solid fa-ban"></i>
        </button>
        </td>
        <td>
        <button class="btn btn-sm btn-danger" onclick="removeUser(${user.userId})">
        <i class="fa fa-trash"></i>
        </button>
        </td>
        </tr>`;
    });
    document.getElementById("user-table").innerHTML = tableData;
}

var editUser = (user_id) => {
    var userList = JSON.parse(localStorage.getItem("users"));
    var user;
    userList.forEach((element_user) => {
        if (element_user.userId == user_id) {
            user = element_user;
            return;
        }
    });

    var user_id = document.getElementById("user-id");
    var user_name = document.getElementById("user-name");

    user_id.setAttribute('readonly', 'true');
    user_id.value = user.userName;
    user_name.value = user.fullName;
}

var saveUser = () => {
    var user_id = document.getElementById("user-id");
    var user_name = document.getElementById("user-name");

    var userList = JSON.parse(localStorage.getItem("users"));
    userList.forEach((user) => {
        if (user.userName == user_id.value) {
            user.fullName = user_name.value;
            return;
        }
    });
    localStorage.setItem("users", JSON.stringify(userList));
    showUsers();
}

var clearUserData = () => {
    var user_id = document.getElementById("user-id");
    var user_name = document.getElementById("user-name");
    user_id.setAttribute('readonly', 'false');
    user_id.value = null;
    user_name.value = null;
}

var removeUser = (user_id) => {
    // console.log("hii");
    console.log(user_id);
    var userList = JSON.parse(localStorage.getItem("users"));
    var index;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userId === user_id) {
            index = i;
            break;
        }
    }
    if (index != undefined) {
        for (let i = index; i < userList.length; i++) {
            userList[i] = userList[i + 1];
        }
        userList.pop();
    }
    localStorage.setItem("users", JSON.stringify(userList));
    showUsers();
}


var blockUser = (user_id) => {
    var userList = JSON.parse(localStorage.getItem("users"));
    var diactiveUsers = JSON.parse(localStorage.getItem("dictiveUsers")) ?? [];
    var index;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userId === user_id) {
            index = i;
            console.log(diactiveUsers);

            diactiveUsers.push(userList[i]);
            break;
        }
    }
    if (index != undefined) {
        for (let i = index; i < userList.length; i++) {
            userList[i] = userList[i + 1];
        }
        userList.pop();
    }
    localStorage.setItem("diactiveUsers", JSON.stringify(diactiveUsers));
    localStorage.setItem("users", JSON.stringify(userList));
    showUsers();
}



var showBlockedUsers = () => {
    var tableData = ``;
    var blockedUsersList = JSON.parse(localStorage.getItem("diactiveUsers")) ?? [];
    blockedUsersList.forEach((user) => {
        tableData += `
        <tr>
        <td>${user.userName}</td>
        <td>${user.fullName}</td>
        <td>
        <button class="btn btn-sm btn-success" onclick="unblockUser(${user.userId})">
        <i class="fa-solid fa-circle-check"></i>
        </button>
        </td>productsList is null
        <td>
        <button class="btn btn-sm btn-danger" onclick="removeUserfromBlocked(${user.userId})">
        <i class="fa fa-trash"></i>
        </button>
        </td>
        </tr>`;
    });
    document.getElementById("blocked-user-table").innerHTML = tableData;
}

var removeUserfromBlocked = (user_id) => {
    var BlockedUserList = JSON.parse(localStorage.getItem("diactiveUsers"));
    var index;
    for (let i = 0; i < BlockedUserList.length; i++) {
        if (BlockedUserList[i].userId === user_id) {
            index = i;
            break;
        }
    }
    if (index != undefined) {
        for (let i = index; i < BlockedUserList.length; i++) {
            BlockedUserList[i] = BlockedUserList[i + 1];
        }
        BlockedUserList.pop();
    }
    localStorage.setItem("diactiveUsers", JSON.stringify(BlockedUserList));
    showBlockedUsers();
}

var unblockUser = (u_id) => {
    var userList = JSON.parse(localStorage.getItem("users")) ?? [];
    var diactiveUsers = JSON.parse(localStorage.getItem("diactiveUsers")) ?? [];
    var index;

    for (let i = 0; i < diactiveUsers.length; i++) {
        if (diactiveUsers[i].userId == u_id) {
            index = i;
            console.log(userList);

            userList.push(diactiveUsers[i]);
            console.log(userList);
            break;
        }
    }
    if (index != undefined) {
        for (let i = index; i < diactiveUsers.length; i++) {
            diactiveUsers[i] = diactiveUsers[i + 1];
        }
        diactiveUsers.pop();
    }
    localStorage.setItem("users", JSON.stringify(userList));
    localStorage.setItem("diactiveUsers", JSON.stringify(diactiveUsers));
    showBlockedUsers();
}

// --------------------Product Operations--------------------------------------------
/* Validation */
const namePattern = /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/;
const idPattern = /^[0-9]+$/;
var product_id = document.getElementById("product-id");
var product_name = document.getElementById("product-name");
var product_quantity = document.getElementById("product-quantity");
var product_price = document.getElementById("product-price");
var product_details = document.getElementById("product-details");
var product_warning = document.getElementById("product-warning");
var pIdWarning = document.getElementById("pIdWarning")
var pNameWarning = document.getElementById("pNameWarning")
var pQuantityWarning = document.getElementById("pQuantityWarning")
var pPriceWarning = document.getElementById("pPriceWarning")

let validId = true;
product_id.addEventListener("keyup", () => {
    if (product_id.value == null || product_id.value == undefined || product_id.value == "" || !idPattern.test(product_id.value)) {
        product_id.style.border = "3px solid red";
        pIdWarning.innerText = "* Invalid Product Id";
        pIdWarning.style.color = "red";
        validId = false;
    }
    else {
        product_id.style.border = "1px solid blue";
        pIdWarning.innerText = "";
        validId = true;
    }
});

let validName = true;
product_name.addEventListener("keyup", () => {
    if (product_name.value == null || product_name.value == undefined || product_name.value == "" || !namePattern.test(product_name.value)) {
        product_name.style.border = "3px solid red";
        pNameWarning.innerText = "* Invalid Product Name";
        pNameWarning.style.color = "red";
        validName = false;
    }
    else {
        product_name.style.border = "1px solid blue";
        pNameWarning.innerText = "";
        validName = true;
    }
});

let validQuantity = true;
product_quantity.addEventListener("keyup", () => {
    if (product_quantity.value == null || product_quantity.value == undefined || product_quantity.value == "" || product_quantity.value < 0 || !idPattern.test(product_quantity.value)) {
        product_quantity.style.border = "3px solid red";
        pQuantityWarning.innerText = "* Invalid Product Quantity";
        pQuantityWarning.style.color = "red";
        validQuantity = false;
    }
    else {
        product_quantity.style.border = "1px solid blue";
        pQuantityWarning.innerText = "";
        validQuantity = true;
    }
});

let validPrice = true;
product_price.addEventListener("keyup", () => {
    if (product_price.value == null || product_price.value == undefined || product_price.value == "" || product_price.value < 0 || !idPattern.test(product_price.value)) {
        product_price.style.border = "3px solid red";
        pPriceWarning.innerText = "* Invalid Product Quantity";
        pPriceWarning.style.color = "red";
        validPrice = false;
    }
    else {
        product_price.style.border = "1px solid blue";
        pPriceWarning.innerText = "";
        validPrice = true;
    }
})


var showProducts = () => {
    var tableData = ``;
    var productsList = JSON.parse(localStorage.getItem("products"));
    productsList.forEach((product) => {
        tableData += `
        <tr>
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productQuantity}</td>
            <td>${product.productPrice}</td>
            <td>${product.productDetails}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="editProduct(${product.productId})">
                    <i class="fa fa-edit"></i>
                </button>    
            </td>    
            <td>
                <button  class="btn btn-sm btn-danger" onclick="removeProduct(${product.productId})">
                    <i class="fa fa-trash"></i>
                </button>    
            </td>    
        </tr>`;
    });
    document.getElementById("product-table").innerHTML = tableData;
}


var editProduct = (productid) => {
    var productList = JSON.parse(localStorage.getItem("products"));
    var product;
    productList.forEach((prod) => {
        if (prod.productId == productid) {
            product = prod;
            return;
        }
    });

    product_id.setAttribute('readonly', 'true');
    product_id.value = product.productId;
    product_name.value = product.productName;
    product_quantity.value = product.productQuantity;
    product_price.value = product.productPrice;
    product_details.value = product.productDetails;
}



var saveProduct = () => {
    if (validName && validPrice && validQuantity) {
        var productList = JSON.parse(localStorage.getItem("products"));
        productList.forEach((product) => {
            if (product.productId == product_id.value) {
                product.productName = product_name.value;
                product.productQuantity = product_quantity.value;
                product.productPrice = product_price.value;
                product.productDetails = product_details.value;
                return;
            }
        });
        localStorage.setItem("products", JSON.stringify(productList));
        showProducts();
    } else {
        alert("Please enter valid Information.")
    }
}

var clearProductData = () => {
    product_id.setAttribute('readonly', 'false');
    product_id.value = null;
    product_name.value = null;
    product_quantity.value = null;
    product_price.value = null;
    product_details.value = null;
    product_warning.innerHTML = '';
}

var removeProduct = (product_id) => {
    var productList = JSON.parse(localStorage.getItem("products"));
    var index;
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].productId == product_id) {
            index = i;
            break;
        }
    }
    if (index != undefined) {
        for (let i = index; i < productList.length; i++) {
            productList[i] = productList[i + 1];
        }
        productList.pop();
    }
    localStorage.setItem("products", JSON.stringify(productList));
    showProducts();
}

var addProduct = () => {

    if (validId && validName && validPrice && validQuantity) {
        var newProduct = {
            productId: product_id.value,
            productName: product_name.value,
            productQuantity: product_quantity.value,
            productPrice: product_price.value,
            productDetails: product_details.value
        }

        var proctctsArr = JSON.parse(localStorage.getItem("products")) ?? [];

        if (proctctsArr) {
            let check = 1;
            for (let i = 0; i < proctctsArr.length; i++) {
                if (newProduct.productId == proctctsArr[i].productId) {
                    product_warning.innerHTML = "Product Already Exist";
                    product_warning.style.color = "red";
                    check = 0;
                    break;
                }
            }
            if (check) {
                proctctsArr.push(newProduct);
            }
            else {
                return false;
            }
        }
        else {
            proctctsArr = [];
            proctctsArr.push(newProduct);
        }
        localStorage.setItem("products", JSON.stringify(proctctsArr));
        showProducts();

    } else {
        alert("Please Enter Valid Details");
    }
}



//-------------------------------Order Operataions---------------------------------
var showUserOrders = () => {
    var orderList = JSON.parse(localStorage.getItem("orders")) ?? [];
    var tableData = ``;
    var total_orders_price = 0;
    if (orderList) {
        orderList.forEach((order) => {
            var total_price = 0;
            order.productList.forEach((products) => {
                total_price += (products.price * products.quantity);
            });

            tableData += `
            <tr>
                <td>${order.userId}</td>
                <td>${order.orderId}</td>
                <td>${order.date}</td>
                <td>${total_price}</td>
            </tr>`;

            total_orders_price += total_price;
        });
        document.getElementById("total-usr-ordr-amount").innerText = total_orders_price;
        document.getElementById("usr-ordr-table").innerHTML = tableData;
    }
}

var getUserOrderDetails = () => {
    document.getElementById("date").innerText = "...........";
    document.getElementById("address").innerText = "........";
    var ord_id = document.getElementById("ordr-id").value;
    var userId = document.getElementById("usr-id").value;
    var ordersList = JSON.parse(localStorage.getItem("orders"));

    var temp = ``;
    var total_ord_price = 0;
    ordersList.forEach((order) => {
        if (order.orderId == ord_id && order.userId == userId) {
            order.productList.forEach((product) => {
                temp += `
                        <tr>
                            <td>${product.productId}</td>
                            <td>${product.name}</td>
                            <td>${product.quantity}</td>
                            <td>${product.quantity * product.price}</td>
                        </tr>`;
                total_ord_price += (product.quantity * product.price);
            });
            document.getElementById("date").innerText = order.date;
            document.getElementById("address").innerText = order.deleveryAdd;
        }
    });
    var total_gst_price = (total_ord_price*18)/100;
    document.getElementById("total-price").innerHTML = total_ord_price;
    document.getElementById("total-gst-price").innerText = total_gst_price;
    document.getElementById("total-amount").innerText = total_ord_price+total_gst_price;
    document.getElementById("order-details-table").innerHTML = temp;

}



