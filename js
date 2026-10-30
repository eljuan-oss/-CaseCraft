// List of products available in the shop
let products = [
    { id: 1, name: 'Spider Armor Case', price: 49.00, image: 'https://i.etsystatic.com/43333289/r/il/d8cec4/6965204456/il_fullxfull.6965204456_177y.jpg' },
    { id: 2, name: 'Sunflower Case', price: 45.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnHnJJ8CmDFnx210LugGDdwaNjuqH6OVCdsf5BuUhyuX3IYzJDtZD0hrM&s=10' },
    { id: 3, name: 'Clear Collage Case', price: 42.00, image: 'https://pixvoices.com/cdn/shop/files/f1200f51-dbc4-463c-856a-8cc54c49d1d5.jpg?v=1764129507' }
];

// Get cart from local storage or create an empty array
let cart = [];
let savedCart = localStorage.getItem('myCart');
if (savedCart != null) {
    cart = JSON.parse(savedCart);
}

// Run functions when the page loads
window.onload = function() {
    displayProducts();
    updateCartCount();
};

// Function to switch between different pages
function changePage(pageName) {
    // Hide all page sections
    let pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    // Remove active style from navigation buttons
    let buttons = document.getElementsByClassName('nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    // Show the selected page
    document.getElementById('page-' + pageName).classList.add('active');
    
    // Highlight the active nav button if it exists
    let activeBtn = document.getElementById('nav-' + pageName);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // If the user clicks the shop/catalog page, make sure products are displayed
    if (pageName === 'catalog') {
        displayProducts();
    }

    // If the user clicks the cart page, load cart contents
    if (pageName === 'cart') {
        displayCart();
    }
}

// Display products inside the shop catalog page
function displayProducts() {
    let productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        
        let card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        
        productListDiv.appendChild(card);
    }
}

// Add item to cart
function addToCart(productId) {
    let selectedProduct = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            selectedProduct = products[i];
        }
    }

    // Check if product is already in the cart
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].qty += 1;
            found = true;
        }
    }

    // If not found, push new item object
    if (!found) {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            qty: 1
        });
    }

    // Save changes to local storage
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Update the number count shown next to the cart tab
function updateCartCount() {
    let totalCount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCount += cart[i].qty;
    }
    document.getElementById('cart-count').innerText = totalCount;
}

// Display cart items inside the cart page
function displayCart() {
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').innerText = '0.00';
        return;
    }

    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.qty;
        totalPrice += itemTotal;

        let div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.qty}</p>
            </div>
            <div>
                <button class="btn" onclick="removeItem(${i})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(div);
    }

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Checkout simulation function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order!');
    cart = [];
    localStorage.removeItem('myCart');
    updateCartCount();
    changePage('home');
}