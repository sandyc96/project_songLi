let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart)
let sum = 0
if (cart.length == 0) {
    cartCount.innerHTML = 0
} else {
    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].quantity
        cartCount.innerHTML = sum
    }
}