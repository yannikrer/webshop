document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "TSHIRT BLACK", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { S: 10, M: 15, L: 5, XL: 2 } },
        { id: 2, name: "TSHIRT WHITE", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { S: 8, M: 14, L: 7, XL: 4 } },
        { id: 3, name: "TSHIRT RED", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { S: 12, M: 19, L: 10, XL: 3 } },
        { id: 4, name: "TSHIRT GREEN", price: "CHF 158.00", images: ["pr1.png", "pr1(2).png"], sizes: { S: 5, M: 20, L: 8, XL: 2 } },
    ];

    const productContainer = document.getElementById("product-container");

    const loadProducts = (productList) => {
        productContainer.innerHTML = "";
        productList.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name} Front">
                <img src="${product.images[1]}" alt="${product.name} Side">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            productElement.onclick = () => {
                window.location.href = `product-detail.html?productId=${product.id}`;
            };

            productContainer.appendChild(productElement);
        }); 
    };

    loadProducts(products);

    window.searchProducts = () => {
        const searchInput = document.getElementById("search-input").value.toLowerCase();
        if (!searchInput) {
            loadProducts(products);
            return;
        }

        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchInput)
        );
        loadProducts(filteredProducts);
    };

    window.toggleSearch = () => {
        const searchBar = document.getElementById("search-bar");
        searchBar.classList.toggle("active");
    };
        // Menü öffnen
        window.openMenu = function() {
            document.getElementById("overlay-menu").style.width = "250px";
        };

        // Menü schließen
        window.closeMenu = function() {
            document.getElementById("overlay-menu").style.width = "0";
        };


});
