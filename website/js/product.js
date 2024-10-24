// Met à jour le compteur du panier dans le header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    let cartCountElement = document.getElementById('basket-number');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

updateCartCount();

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch(`http://localhost:3000/products/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
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

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            cart.push(product);

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            window.location.assign('../index.html');
        });

        productArticle.appendChild(img);
        productArticle.appendChild(title);
        productArticle.appendChild(description);
        productArticle.appendChild(price);
        productArticle.appendChild(addBasket);
    })
    .catch(error => console.error(error));
