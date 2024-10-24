document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const userInfoDiv = document.querySelector('.user-info');
    if (userInfo && userInfoDiv) {
        userInfoDiv.innerHTML = `
            <p>Name: <span>${userInfo.name}</span></p>
            <p>Email: <span>${userInfo.email}</span></p>
            <p>Address: <span>${userInfo.address}</span></p>
        `;
    } else {
        userInfoDiv.innerHTML = '<p>User information is not available.</p>';
    }
    const confirmationList = document.querySelector('.confirmation__list');
    if (confirmationList) {
        if (cart.length === 0) {
            confirmationList.innerHTML = '<li><p>Your cart is empty.</p></li>';
        } else {
            confirmationList.innerHTML = '';
            cart.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<p>${product.name}</p>`;
                confirmationList.appendChild(listItem);
            });
        }
    } else {
        console.error('La liste de confirmation est introuvable.');
    }

    localStorage.removeItem('cart');
    localStorage.removeItem('userInfo');
});
