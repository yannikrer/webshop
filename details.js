document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("productId"), 10);

    // Produkte mit Lagerbestand je Größe
    const products = [
        { id: 1, name: "TSHIRT BLACK", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { XS: 10, S: 15, M: 20, L: 5, XL: 2 } },
        { id: 2, name: "TSHIRT WHITE", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { XS: 8, S: 14, M: 18, L: 7, XL: 4 } },
        { id: 3, name: "TSHIRT RED", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { XS: 12, S: 19, M: 25, L: 10, XL: 3 } },
        { id: 4, name: "TSHIRT GREEN", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { XS: 5, S: 20, M: 30, L: 8, XL: 2 } },
    ];

    const product = products.find(p => p.id === productId);
    if (!product) {
        document.getElementById("product-details").innerHTML = "<p>Produkt nicht gefunden.</p>";
        return;
    }

    // Bilder und Daten setzen
    document.getElementById("product-img").src = product.images[0];
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = product.price;

    // Bilderwechsel bei Hover
    const productImg = document.getElementById("product-img");
    productImg.addEventListener("mouseover", () => productImg.src = product.images[1]);
    productImg.addEventListener("mouseout", () => productImg.src = product.images[0]);

    // Lagerbestand aus LocalStorage abrufen (oder initialisieren)
    let stock = JSON.parse(localStorage.getItem("productStock")) || {};
    if (!stock[productId]) {
        stock[productId] = { ...product.sizes }; // Falls nicht vorhanden, initialisieren
        localStorage.setItem("productStock", JSON.stringify(stock));
    }

    // Größenoptionen erstellen
    const sizeOptionsContainer = document.getElementById("size-options");
    Object.entries(stock[productId]).forEach(([size, available]) => {
        const sizeButton = document.createElement("button");
        sizeButton.innerText = `${size} (${available} verfügbar)`;
        sizeButton.dataset.size = size;

        sizeButton.onclick = function() {
            document.querySelectorAll(".size-options button").forEach(btn => btn.classList.remove("selected"));
            sizeButton.classList.add("selected");
            document.getElementById("product-quantity").max = available; // Max-Anzahl setzen
        };

        sizeOptionsContainer.appendChild(sizeButton);
    });

    // Warenkorb-Funktion (Lagerbestand bleibt unverändert!)
    document.querySelector(".add-to-cart").addEventListener("click", function() {
        const selectedSize = document.querySelector(".size-options button.selected");
        if (!selectedSize) {
            alert("Bitte eine Größe auswählen!");
            return;
        }
        const size = selectedSize.dataset.size;
        const quantity = parseInt(document.getElementById("product-quantity").value);

        if (quantity > stock[productId][size]) {
            alert(`Nur noch ${stock[productId][size]} Stück verfügbar!`);
            return;
        }

        // Warenkorb in LocalStorage speichern
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ id: productId, name: product.name, size: size, quantity: quantity, price: product.price });
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${quantity}x ${product.name} (${size}) wurde zum Warenkorb hinzugefügt.`);
    });
});
