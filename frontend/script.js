// Sample book data
const books = [
    { id: 1, title: 'The Great Gatsby', genre: 'fiction', price: 10.99, image: 'popular1.jpg', },
    { id: 2, title: '1984', genre: 'fiction', price: 8.99, image: 'popular2.jpg' },
    { id: 3, title: 'To Kill a Mockingbird', genre: 'fiction', price: 12.99, image: 'popular3.jpg' },
    { id: 4, title: 'Sapiens', genre: 'non-fiction', price: 14.99, image: 'popular4.jpg' },
    { id: 5, title: 'Harry Potter', genre: 'fantasy', price: 9.99, image: 'popular5.jpg' }
];

// Cart stored in local storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count
const updateCartCount = () => {
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cart.length;
    });
};

// Render books
const renderBooks = (filteredBooks = books) => {
    const bookList = document.getElementById('book-list');
    if (bookList) {
        bookList.innerHTML = filteredBooks.map(book => `
            <div class="book" style="background-image: url('images/${book.image}');">
                <h3>${book.title}</h3>
                <p>$${book.price.toFixed(2)}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `).join('');
    }
};

// Add to cart
const addToCart = id => {
    const book = books.find(book => book.id === id);
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

// Render cart
const renderCart = () => {
    const cartElement = document.getElementById('cart');
    const cartActions = document.getElementById('cart-actions');
    const totalPriceElement = document.getElementById('total-price');

    if (cartElement) {
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Your cart is empty.</p>';
            cartActions.style.display = 'none';
        } else {
            cartElement.innerHTML = cart.map((book, index) => `
                <div class="cart-item">
                    <span>${book.title}</span>
                    <span>$${book.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `).join('');

            const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);
            totalPriceElement.textContent = totalPrice.toFixed(2);
            cartActions.style.display = 'block';
        }
    }
};

// Remove from cart
const removeFromCart = index => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

// Filter books by genre
const filterBooks = () => {
    const genre = document.getElementById('genre-filter').value;
    const filteredBooks = genre === 'all' ? books : books.filter(book => book.genre === genre);
    renderBooks(filteredBooks);
};

// Clear the cart
const clearCart = () => {
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

// Simulate payment processing
const processPayment = () => {
    const paymentMessage = document.getElementById('payment-message');
    if (paymentMessage) {
        paymentMessage.textContent = 'Processing payment...';
        paymentMessage.className = 'processing';
        setTimeout(() => {
            paymentMessage.textContent = 'Payment successful! Thank you for your purchase.';
            paymentMessage.className = 'success'; 
            clearCart();
        }, 2000);
    }
};

// Apply coupon
const applyCoupon = () => {
    const coupon = document.getElementById('coupon-code').value.trim();
    let discount = 0;

    if (coupon === 'DISCOUNT10') {
        discount = 10;
    } else if (coupon === 'SALE20') {
        discount = 20;
    }

    if (discount > 0) {
        const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);
        const discountedPrice = totalPrice - (totalPrice * discount / 100);
        document.getElementById('total-price').textContent = discountedPrice.toFixed(2);
        alert(`Coupon applied! ${discount}% discount received.`);
    } else {
        alert('Invalid coupon code.');
    }
};

// Estimate delivery date
const estimateDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    document.getElementById('delivery-date').textContent = deliveryDate.toDateString();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    renderCart();
    estimateDeliveryDate();
    updateCartCount();
});
