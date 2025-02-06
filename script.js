document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {
            name: "TSHIRT BLACK",
            price: "CHF 158.00",
            images: ["pr1.png", "pr1(2).png"],
        },
        {
            name: "TSHIRT BLACK",
            price: "CHF 158.00",
            images: ["pr1.png", "pr1(2).png"],
        },
        {
            name: "TSHIRT BLACK",
            price: "CHF 158.00",
            images: ["pr1.png", "pr1(2).png"],
        },
        {
            name: "TSHIRT BLACK",
            price: "CHF 158.00",
            images: ["pr1.png", "pr1(2).png"],
        },
    ];

    const productContainer = document.getElementById("product-container");

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name} Front">
            <img src="${product.images[1]}" alt="${product.name} Side">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;

        productContainer.appendChild(productElement);
    });
});

function openMenu() {
    document.getElementById("overlay-menu").style.width = "75%";
}

function closeMenu() {
    document.getElementById("overlay-menu").style.width = "0";
}
