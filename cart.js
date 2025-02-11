document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let stock = JSON.parse(localStorage.getItem("productStock")) || {};
    const cartContainer = document.getElementById("cart-items");

    // Warenkorb anzeigen
    function renderCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Der Warenkorb ist leer.</p>";
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="img/pr${item.id}.png" alt="${item.name}">
                <div>
                    <p><strong>${item.name}</strong> (${item.size})</p>
                    <p>${item.quantity}x - ${item.price} pro Stück</p>
                </div>
                <button onclick="removeItem(${index})">Entfernen</button>
            `;

            cartContainer.appendChild(cartItem);
        });
    }

    renderCart();

    // Produkt aus Warenkorb entfernen
    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    // Warenkorb leeren
    document.getElementById("clear-cart").addEventListener("click", function() {
        localStorage.removeItem("cart");
        renderCart();
    });

    // Bestellung abschließen (Jetzt wird Lagerbestand reduziert!)
    document.getElementById("checkout").addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Der Warenkorb ist leer.");
            return;
        }

        let stockUpdated = false;

        // Lagerbestand erst jetzt reduzieren!
        cart.forEach(item => {
            if (stock[item.id] && stock[item.id][item.size]) {
                if (stock[item.id][item.size] >= item.quantity) {
                    stock[item.id][item.size] -= item.quantity;
                    stockUpdated = true;
                } else {
                    alert(`Nicht genügend ${item.name} in Größe ${item.size} auf Lager!`);
                    return;
                }
            }
        });

        if (stockUpdated) {
            // Lagerbestand speichern
            localStorage.setItem("productStock", JSON.stringify(stock));

            // Warenkorb leeren
            localStorage.removeItem("cart");
            renderCart();
            alert("Bestellung erfolgreich! Der Lagerbestand wurde aktualisiert.");
        }
    });
});
