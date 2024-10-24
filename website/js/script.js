const jsonFile = 'http://localhost:3000/products';
const productList = document.querySelector('.product__list');

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCountElement = document.getElementById('basket-number');
    if (cartCountElement) cartCountElement.textContent = cart.length; // Update cart count
}

fetch(jsonFile)
    .then(response => response.json()) // Fetch product data
    .then(products => {
        products.forEach(product => {
            const li = document.createElement('li');
            const article = document.createElement('article');
            article.classList.add('product__list--item');

            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.alt = product.name;

            const p = document.createElement('p');
            p.textContent = product.name;

            const span = document.createElement('span');
            span.textContent = `${product.price} $`;

            const viewLink = document.createElement('a');
            viewLink.textContent = 'View';
            viewLink.href = `../website/views/product.html?id=${product.id}`;

            article.appendChild(img);
            article.appendChild(p);
            article.appendChild(span);
            article.appendChild(viewLink);

            li.appendChild(article);
            productList.appendChild(li); // Add product to the list
        });
    })
    .catch(error => {
        console.error(error); // Handle errors
    });
