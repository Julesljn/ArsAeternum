// Updates the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCountElement = document.getElementById('basket-number');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

updateCartCount();

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch(`http://localhost:3000/products/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(product => {
        const productArticle = document.querySelector('.product__details');

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;

        const title = document.createElement('h2');
        title.textContent = product.name;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('span');
        price.textContent = `${product.price} $`;

        const addBasket = document.createElement('button');
        addBasket.textContent = 'Add to cart';

        addBasket.addEventListener('click', function (event) {
            event.preventDefault();

            let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage

            cart.push(product);

            localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
            updateCartCount();
            window.location.assign('../index.html');
        });

        productArticle.appendChild(img);
        productArticle.appendChild(title);
        productArticle.appendChild(description);
        productArticle.appendChild(price);
        productArticle.appendChild(addBasket); // Add product elements to the page
    })
    .catch(error => console.error(error));
