document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productList = document.querySelector('.product__list');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('basket-number');
    let totalPrice = 0;

    const updateCart = () => {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice} $`;
        }
    };

    const renderCart = () => {
        if (!productList) return;
        productList.innerHTML = '';
        totalPrice = 0;

        if (cart.length === 0) {
            productList.innerHTML = '<p>Your cart is empty.</p>';
            updateCart();
            return;
        }

        cart.forEach(product => {
            totalPrice += product.price; // Calculate total price

            const productArticle = document.createElement('article');
            productArticle.classList.add('product__details');

            productArticle.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h2>${product.name}</h2>
                <span>${product.price} $</span>
                <button class="remove-btn">Delete</button>
            `;

            productArticle.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromCart(product.id); // Remove product from cart
            });

            productList.appendChild(productArticle);
        });

        updateCart();
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId); // Remove item from cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        renderCart(); // Re-render the cart
    };

    renderCart();

    const formElement = document.querySelector('.form');
    if (formElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameInputElement = document.querySelector('.input-name');
            const emailInputElement = document.querySelector('.input-email');
            const addressInputElement = document.querySelector('.input-address');

            if (!nameInputElement || !emailInputElement || !addressInputElement) {
                console.error('One of the form elements is missing.');
                return;
            }

            const nameInput = nameInputElement.value.trim();
            const emailInput = emailInputElement.value.trim();
            const addressInput = addressInputElement.value.trim();

            let valid = true;
            const messages = [];

            const clearInput = (input) => input.replace(/[^a-zA-Z0-9\s]/g, ''); // Clear input

            const name = clearInput(nameInput);
            const address = clearInput(addressInput);

            if (name === '') {
                valid = false;
                messages.push('Please enter your name.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                valid = false;
                messages.push('Please enter a valid email address.');
            }

            if (address === '') {
                valid = false;
                messages.push('Please enter your address.');
            }

            if (valid) {
                const userInfo = {
                    name: name,
                    email: emailInput,
                    address: address
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Save user info
                window.location.href = 'confirmation.html';
            }
        });
    } else {
        console.error('Form not found.');
    }
});
