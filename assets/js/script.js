// Filter functionality for product categories
document.querySelectorAll('.submenu li').forEach(item => {
    item.addEventListener('click', (event) => {
        const category = event.target.textContent.toLowerCase().replace(/ /g, '-');
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            if (category === 'all-products' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.menu > li').forEach(item => {
    item.addEventListener('click', (event) => {
        // Prevent the click event from bubbling up
        event.stopPropagation();

        // Close other submenus
        document.querySelectorAll('.submenu').forEach(sub => {
            if (sub !== item.querySelector('.submenu')) {
                sub.style.display = 'none';
            }
        });

        // Toggle the clicked submenu
        const submenu = item.querySelector('.submenu');
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
    });
});


// Handle click on hamburger menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close all submenus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.submenu').forEach(sub => {
        sub.style.display = 'none';
    });
});

// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
});

// Menu hover functionality
document.querySelectorAll('.menu > li').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'block'; // Show on hover
        }
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'none'; // Hide when not hovering
        }
    });

    item.addEventListener('click', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; // Toggle on click
        }
    });
});



let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} added to cart!`);
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        let cartItems = "Your Cart:\n";
        cart.forEach(item => {
            cartItems += `${item.name}: R${item.price}\n`;
        });
        alert(cartItems);
    }
}

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is new, add it to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} has been added to your cart.`);
}

// View cart function
function viewCart() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    let cartContent = 'Your Cart:\n';
    cart.forEach(item => {
        cartContent += `${item.name} - R ${item.price} x ${item.quantity}\n`;
    });
    alert(cartContent);
}

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product is new, add it to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} has been added to your cart.`);
    viewCart(); // Refresh the cart view
}

// View cart function
function viewCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = 'Your cart is empty.';
        cartTotalContainer.innerHTML = 'Total: R 0.00';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                ${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
        cartTotalContainer.innerHTML = `Total: R ${total.toFixed(2)}`;
    }

    document.getElementById('cartModal').style.display = 'block';
}

// Change quantity of cart items
function changeQuantity(productName, change) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove item if quantity is 0
        }
    }

    saveCart(cart);
    viewCart(); // Refresh cart view
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    viewCart(); // Refresh cart view
}

// Checkout function (placeholder)
function checkout() {
    alert('Checkout feature is not implemented yet.');
    // You can redirect to a checkout page or implement further logic here
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        const productCategory = product.getAttribute('data-category');

        const matchesSearch = productName.includes(searchInput);
        const matchesCategory = categoryFilter === "" || productCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}

function sendWhatsApp(event) {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById('name').value;
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const province = document.getElementById('province').value;
        const postalCode = document.getElementById('postal-code').value;
        const email = document.getElementById('email').value;
        const contactNumber = document.getElementById('contact-number').value;

        const message = `Name: ${name}%0AStreet: ${street}%0ACity: ${city}%0AProvince: ${province}%0APostal Code: ${postalCode}%0AEmail: ${email}%0AContact Number: ${contactNumber}`;
        const whatsappNumber = '27726962588'; // Replace with your WhatsApp number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab
    }

