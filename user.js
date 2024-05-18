history.pushState(null, null, document.URL);
window.addEventListener('popstate', function(event) {
    history.pushState(null, null, document.URL);
});


var loginedUser = JSON.parse(sessionStorage.getItem("login"));
var userId = loginedUser.userName;
var password = loginedUser.password;

var logoutUser = () => {
    window.location.href = "index.html";
}

var oldPass = document.getElementById("oldPass")
var newPass = document.getElementById("newPass")
var cnfPass = document.getElementById("cnfPass")
oldPass.addEventListener("keyup", () => {
    if (oldPass.value !== password) {
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
var changeUserPass = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "none";
    middle_3.style.display = "none";
    middle_4.style.display = "inline";
    middle_5.style.display = "none";

    if (oldPass.value !== password) {
        document.getElementById("oldPassWarning").innerHTML = "* wrong old password";
        document.getElementById("oldPassWarning").style.color = "red";
        return false;
    }
    if (newPass.value !== cnfPass.value) {
        document.getElementById("passWarning").innerHTML = "*Password does'nt match.";
        document.getElementById("passWarning").style.color = "red";
        return false;
    }

    var usersArr = JSON.parse(localStorage.getItem("users"));
    usersArr.forEach((user) => {
        if (user.userName === userId) {
            user.password = newPass.value;
            loginedUser.password = newPass.value;
        }
    })
    localStorage.setItem("users", JSON.stringify(usersArr));
    localStorage.setItem("login", JSON.stringify(loginedUser));
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
middle_1.style.display = "none";
middle_2.style.display = "none";
middle_3.style.display = "none";
middle_4.style.display = "none";
middle_5.style.display = "none";

var showProductsWindow = () => {
    middle_1.style.display = "inline";
    middle_2.style.display = "none";
    middle_3.style.display = "none";
    middle_4.style.display = "none";
    middle_5.style.display = "none";
    showProducts();
};

var showCartWindow = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "inline";
    middle_3.style.display = "none";
    middle_4.style.display = "none";
    middle_5.style.display = "none";
    showCart();
};

var showOrdersWindow = () => {
    middle_1.style.display = "none";
    middle_2.style.display = "none";
    middle_3.style.display = "inline";
    middle_4.style.display = "none";
    middle_5.style.display = "inline";
    showOrders();
}

var showOrders = () => {
    var orderList = JSON.parse(localStorage.getItem("orders")) ?? [];
    var tableData = ``;
    var total_orders_price = 0;
    var total_gst_price = 0;
    if (orderList) {
        orderList.forEach((order) => {
            if (order.userId == userId) {
                var total_price = 0;
                order.productList.forEach((products) => {
                    console.log(products);
                    total_price += (products.price * products.quantity);
                });
                var gst = (total_price * 18) / 100;
                tableData += `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.date}</td>
                    <td>${total_price}</td>
                    <td>${gst}</td>
                </tr>`;

                total_orders_price += total_price;
                total_gst_price += gst;
            }
        });
        document.getElementById("total_orders_amount").innerText = total_orders_price;
        document.getElementById("total_gst_amount").innerText = total_gst_price;
        document.getElementById("order-table").innerHTML = tableData;
    }
}


var showProducts = () => {
    var tableData = ``;
    var productsList = JSON.parse(localStorage.getItem("products"));
    productsList.forEach(product => {
        tableData += `
        <tr>
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productPrice}</td>
            <td>${product.productDetails}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="addToBasket(${product.productId})">
                    <i class="fa fa-plus"></i>
                </button>
            </td>
            <td>
                <button  class="btn btn-sm btn-danger" onclick="removeFromBasket(${product.productId})">
                    <i class="fa fa-minus"></i>
                </button>
            </td>
        </tr>`;
    });
    document.getElementById("product-table").innerHTML = tableData;
}

var showCart = () => {
    var gst_amount = document.getElementById("gst-amount");
    var total_amount = document.getElementById("total-amount");
    var total_price = 0;
    var tableData = ``;
    var cartList = JSON.parse(localStorage.getItem("carts"));
    cartList.forEach(cart => {
        if (cart.userId == userId) {
            var prod;
            tableData += `
            <tr>
                <td>${cart.product.productId}</td>
                <td>${cart.product.name}</td>
                <td>${cart.product.quantity}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="addQuantity(${cart.product.productId})">
                        <i class="fa fa-plus"></i>
                    </button>
                </td>
                <td>
                    <button  class="btn btn-sm btn-danger" onclick="removeQuantity(${cart.product.productId})">
                        <i class="fa fa-minus"></i>
                    </button>
                </td>
                <td>
                    <button  class="btn btn-sm btn-danger" onclick="removeFromBasket(${cart.product.productId})">
                    <i class="fa fa-trash"></i>
                    </button>
                </td>
                <td>
                    <span>${cart.product.price * cart.product.quantity}</span>
                </td>
            </tr>`;
            total_price += cart.product.price * cart.product.quantity;
        }
    });


    gst_amount.value = (total_price * 18) / 100;
    total_amount.value = (total_price) + ((total_price * 18) / 100);
    document.getElementById("total-price").innerHTML = total_price;
    document.getElementById("cart-table").innerHTML = tableData;
};

var addQuantity = (product_id) => {
    var cartList = JSON.parse(localStorage.getItem("carts"));
    cartList.forEach(cart => {
        if (cart.userId == userId) {
            if (cart.product.productId == product_id) {
                cart.product.quantity = cart.product.quantity + 1;
            }
        }
    });
    localStorage.setItem("carts", JSON.stringify(cartList));
    showCart();
}

var removeQuantity = (product_id) => {
    var cartList = JSON.parse(localStorage.getItem("carts"));
    cartList.forEach(cart => {
        if (cart.userId == userId) {
            if (cart.product.productId == product_id && cart.product.quantity > 1) {
                cart.product.quantity = cart.product.quantity - 1;
            }
        }
    });
    localStorage.setItem("carts", JSON.stringify(cartList));
    showCart();
}

var addToBasket = (product_id) => {
    var cartList = JSON.parse(localStorage.getItem("carts")) ?? [];
    var productList = JSON.parse(localStorage.getItem("products"));
    var p;
    productList.forEach((prod) => {
        if (product_id == prod.productId) {
            p = prod;
        }
    });

    var newCart;
    if (cartList) {
        let check = 0;
        cartList.forEach((element) => {
            if (element.userId == userId) {
                if (element.product.productId == product_id) {
                    check = 1;
                    alert("Product Allready Added into Cart.")
                }
            }
        });
        if (check == 0) {
            newCart = {
                userId: userId,
                product: {
                    productId: product_id,
                    name: p.productName,
                    quantity: 1,
                    price: p.productPrice
                }
            }
            cartList.push(newCart);
        }
    }
    else {
        newCart = {
            userId: userId,
            product: {
                productId: product_id,
                name: p.productName,
                quantity: 1,
                price: p.productPrice
            }
        }
        cartList.push(newCart);
    }
    localStorage.setItem("carts", JSON.stringify(cartList));
    console.log(cartList);

}

var removeFromBasket = (product_id) => {
    var cartList = JSON.parse(localStorage.getItem("carts")) ?? [];
    if (cartList) {
        cartList.forEach((cart, index) => {
            if (cart.userId == userId && cart.product.productId == product_id) {
                for (let i = index; i < cartList.length; i++) {
                    cartList[i] = cartList[i + 1];
                }
                cartList.pop();
                return;
            }
        });
        localStorage.setItem("carts", JSON.stringify(cartList));
    }
    showCart()
};

var delevery_address = document.getElementById("delevery-address");
var payment_method = document.getElementById("payment-method");
var delevery_address_warning = document.getElementById("delevery-address-warning");
var payment_method_warning = document.getElementById("payment-method-warning");
delevery_address.addEventListener("keyup", () => {
    if (delevery_address.value == undefined || delevery_address.value == "" || delevery_address.value == null) {
        delevery_address_warning.innerText = " * Please enter the delevery address.";
        delevery_address_warning.style.color = "red";
    }
    else {
        delevery_address_warning.innerText = "";
    }
});
payment_method.addEventListener("click", () => {
    if (payment_method.value == "") {
        payment_method_warning.innerText = " * Please choose the Payment method.";
        payment_method_warning.style.color = "red";
    } else {
        payment_method_warning.innerText = "";
    }
})
var placeOrder = () => {
    // console.log(payment_method.value);
    if (payment_method.value == "" || payment_method.value == null || payment_method.value == undefined) {
        payment_method_warning.innerText = " * Please choose the Payment method.";
        payment_method_warning.style.color = "red";
        return false;
    }
    if (delevery_address.value == undefined || delevery_address.value == "" || delevery_address.value == null) {
        delevery_address_warning.innerText = " * Please enter the delevery address.";
        delevery_address_warning.style.color = "red";
        return false;
    }
    var cartList = JSON.parse(localStorage.getItem("carts")) ?? [];
    var orders = JSON.parse(localStorage.getItem("orders")) ?? [];
    var list = [];
    var orderid;
    orders.length != 0 ? orders.forEach((order) => { orderid = order.orderId }) : orderid = 0;
    var currentDate = new Date();
    if (cartList) {
        cartList.forEach((cart) => {
            if (cart.userId == userId) {
                list.push(cart.product);
            }
        });

        if (list) {
            var newOrder = {
                orderId: orderid + 1,
                userId: userId,
                productList: list,
                deleveryAdd: delevery_address.value,
                paymentMethod: payment_method.value,
                date: `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`
            }
            orders.push(newOrder);
            // localStorage.setItem("orders", JSON.stringify(orders));

            
            return manageQuantity(orders,cartList);
        }
        else {
            document.getElementById("place-order-warning").innerHTML = " * Please Add Products into Cart.";
            document.getElementById("place-order-warning").style.color = "red";
            return false;
        }

    }
    else {
        document.getElementById("place-order-warning").innerHTML = " * Please Add Products into Cart.";
        document.getElementById("place-order-warning").style.color = "red";
        return false;
    }

}

var manageQuantity = (orders,cartList)=>{
    // var orders = JSON.parse(localStorage.getItem("orders")) ?? [];
    var products = JSON.parse(localStorage.getItem("products")) ?? [];
    var order = orders.pop();
    console.log("hiii.................");
    // console.log(order.productList);
    var check = 0;
    order.productList.forEach(element => {
        products.forEach(pro => {
            if(pro.productId==element.productId){
                if(pro.productQuantity<element.quantity){
                   check =1;
                }
                pro.productQuantity = (pro.productQuantity-element.quantity);
                console.log(pro.productQuantity);
            }
        });
    });
    if(check==1){
        alert("Some Products are Out of Stock.\nPlease Check Again");
        return false;
    }
    else{
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].userId == userId) {
                console.log(cartList.splice(i, 1));
                i = -1;
            }
        };
        
        orders.push(order);
        localStorage.setItem("carts", JSON.stringify(cartList));
        showCart();
        localStorage.setItem("orders",JSON.stringify(orders));
        localStorage.setItem("products",JSON.stringify(products));
        console.log(products);
        return true;
    }
}


var getOrderDetails = () => {
    var ord_id = document.getElementById("ord-id").value;
    var ordersList = JSON.parse(localStorage.getItem("orders"));
    var dt = document.getElementById("date");

    var temp = ``;
    var total_ord_price = 0;
    var total_gst = 0;
    ordersList.forEach((order) => {
        if (order.orderId == ord_id && order.userId == userId) {
            order.productList.forEach((product1) => {
                temp += `
                    <tr>
                        <td>${product1.productId}</td>
                        <td>${product1.name}</td>
                        <td>${product1.quantity}</td>
                        <td>${product1.quantity * product1.price}</td>
                    </tr>
                `;
                total_ord_price += (product1.quantity * product1.price);
            });
            dt.innerText = order.date;
        }
        document.getElementById("del-add").innerText = order.deleveryAdd;
    });
    total_gst = (total_ord_price * 18) / 100;
    document.getElementById("total-gst").innerText = total_gst;
    document.getElementById("total-price-with-gst").innerText = total_gst + total_ord_price;
    document.getElementById("product-datails-table").innerHTML = temp;
    document.getElementById("total-ord-price").innerHTML = total_ord_price;

}

