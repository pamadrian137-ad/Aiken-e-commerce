/* =====================================================
   AIKEN MARKETPLACE
   PREMIUM FULL FUNCTIONAL APP.JS
   HTML REMAINS UNCHANGED
===================================================== */


/* =====================================================
   PRODUCT DATABASE
===================================================== */

const products = [

    {
        id: 1,
        name: "Premium Smartphone",
        category: "Electronics",
        price: 24999,
        oldPrice: 33000,
        discount: 25,
        rating: 5,
        reviews: 124,
        emoji: "📱",
        image: "images/smartphone.jpg",
        type: "flash"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 4999,
        oldPrice: 7200,
        discount: 30,
        rating: 5,
        reviews: 89,
        emoji: "🎧",
        image: "images/headphones.jpg",
        type: "flash"
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "Shoes",
        price: 5499,
        oldPrice: 6900,
        discount: 20,
        rating: 5,
        reviews: 67,
        emoji: "👟",
        image: "images/sneakers.jpg",
        type: "flash"
    },

    {
        id: 4,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 6499,
        oldPrice: 9999,
        discount: 35,
        rating: 5,
        reviews: 213,
        emoji: "⌚",
        image: "images/smartwatch.jpg",
        type: "flash"
    },

    {
        id: 5,
        name: "Modern Laptop",
        category: "Electronics",
        price: 68999,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 56,
        emoji: "💻",
        image: "images/laptop.jpg",
        type: "trending"
    },

    {
        id: 6,
        name: "Premium Handbag",
        category: "Fashion",
        price: 8499,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 42,
        emoji: "👜",
        image: "images/handbag.jpg",
        type: "trending"
    },

    {
        id: 7,
        name: "Digital Camera",
        category: "Electronics",
        price: 45999,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 31,
        emoji: "📷",
        image: "images/camera.jpg",
        type: "trending"
    },

    {
        id: 8,
        name: "Modern Sofa",
        category: "Home",
        price: 34999,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 18,
        emoji: "🛋️",
        image: "images/sofa.jpg",
        type: "trending"
    },

    {
        id: 9,
        name: "Luxury Sneakers",
        category: "Shoes",
        price: 7999,
        oldPrice: 9500,
        discount: 16,
        rating: 5,
        reviews: 76,
        emoji: "👟",
        image: "images/luxury-sneakers.jpg",
        type: "new"
    },

    {
        id: 10,
        name: "Gaming Console",
        category: "Gaming",
        price: 54999,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 105,
        emoji: "🎮",
        image: "images/gaming-console.jpg",
        type: "new"
    },

    {
        id: 11,
        name: "Designer Sunglasses",
        category: "Fashion",
        price: 3499,
        oldPrice: 4500,
        discount: 22,
        rating: 5,
        reviews: 33,
        emoji: "🕶️",
        image: "images/sunglasses.jpg",
        type: "new"
    },

    {
        id: 12,
        name: "Wireless Speaker",
        category: "Electronics",
        price: 3999,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 92,
        emoji: "🔊",
        image: "images/speaker.jpg",
        type: "new"
    }

];


/* =====================================================
   AIKEN CONTACT
===================================================== */

const AIKEN_PHONE = "0794624359";

const AIKEN_PHONE_LINK =
    "tel:+254794624359";

const AIKEN_WHATSAPP =
    "https://wa.me/254794624359";


function getWhatsAppLink(message = "") {

    return message
        ? `${AIKEN_WHATSAPP}?text=${encodeURIComponent(message)}`
        : AIKEN_WHATSAPP;

}


/* =====================================================
   CART + WISHLIST + ACCOUNT
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("aikenCart")
    ) || [];


let wishlist =
    JSON.parse(
        localStorage.getItem("aikenWishlist")
    ) || [];


let aikenAccount =
    JSON.parse(
        localStorage.getItem("aikenAccount")
    ) || null;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const flashProducts =
    document.getElementById("flashProducts");


const trendingProducts =
    document.getElementById("trendingProducts");


const newProducts =
    document.getElementById("newProducts");


const bestSellerProducts =
    document.getElementById("bestSellerProducts");


const cartCount =
    document.getElementById("cartCount");


const cartItems =
    document.getElementById("cartItems");


const cartTotal =
    document.getElementById("cartTotal");


const cartSidebar =
    document.getElementById("cartSidebar");


const overlay =
    document.getElementById("overlay");


const toast =
    document.getElementById("toast");


const toastTitle =
    document.getElementById("toastTitle");


const toastMessage =
    document.getElementById("toastMessage");


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(number) {

    return "KSh " +
        Number(number || 0)
            .toLocaleString("en-KE");

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(product) {

    const isWishlisted =
        wishlist.includes(product.id);


    const imageHTML =
        product.image

            ? `
                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    class="product-photo"
                    loading="lazy"
                    onerror="
                        this.style.display='none';
                        const fallback=this.parentElement.querySelector('.product-emoji');
                        if(fallback) fallback.style.display='flex';
                    "
                >

                <div
                    class="product-emoji"
                    style="display:none;"
                    aria-hidden="true"
                >
                    ${product.emoji || "🛍️"}
                </div>
            `

            : `
                <div
                    class="product-emoji"
                    style="display:flex;"
                    aria-hidden="true"
                >
                    ${product.emoji || "🛍️"}
                </div>
            `;


    const discountHTML =
        product.discount

            ? `
                <span class="product-discount">
                    -${product.discount}%
                </span>
            `

            : "";


    const oldPriceHTML =
        product.oldPrice

            ? `
                <del>
                    ${formatMoney(product.oldPrice)}
                </del>
            `

            : "";


    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
            data-category="${escapeHTML(product.category)}"
        >

            <div class="product-image">

                ${discountHTML}

                ${imageHTML}

                <button
                    type="button"
                    class="wishlist-button ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id}, this)"
                    aria-label="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <div class="rating">

                    ${"★".repeat(product.rating)}

                    <span>
                        (${product.reviews})
                    </span>

                </div>

                <div class="price-row">

                    <strong>
                        ${formatMoney(product.price)}
                    </strong>

                    ${oldPriceHTML}

                </div>

                <button
                    type="button"
                    class="add-cart"
                    onclick="addToCart(${product.id}, this)"
                >
                    Add to Cart
                </button>

            </div>

        </article>

    `;

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    if (flashProducts) {

        flashProducts.innerHTML =
            products
                .filter(
                    product =>
                        product.type === "flash"
                )
                .map(createProductCard)
                .join("");

    }


    if (trendingProducts) {

        trendingProducts.innerHTML =
            products
                .filter(
                    product =>
                        product.type === "trending"
                )
                .map(createProductCard)
                .join("");

    }


    if (bestSellerProducts) {

        const bestSellers =
            [...products]
                .sort(
                    (a, b) =>
                        Number(b.reviews) -
                        Number(a.reviews)
                )
                .slice(0, 4);


        bestSellerProducts.innerHTML =
            bestSellers
                .map(createProductCard)
                .join("");

    }


    if (newProducts) {

        newProducts.innerHTML =
            products
                .filter(
                    product =>
                        product.type === "new"
                )
                .map(createProductCard)
                .join("");

    }

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(
    productId,
    button = null
) {

    const product =
        products.find(
            item =>
                item.id === Number(productId)
        );


    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === product.id
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCartUI();


    showToast(
        "Added to cart",
        `${product.name} is now in your cart.`
    );


    if (button) {

        button.classList.add("added");

        button.textContent = "✓ Added";


        setTimeout(() => {

            button.classList.remove("added");

            button.textContent = "Add to Cart";

        }, 1200);

    }

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== Number(productId)
        );


    saveCart();

    updateCartUI();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product =>
                product.id === Number(productId)
        );


    if (!item) return;


    item.quantity += Number(amount);


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCartUI();

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "aikenCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCartUI() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                (
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                ),
            0
        );


    if (cartCount) {

        cartCount.textContent = totalItems;

    }


    if (cartTotal) {

        cartTotal.textContent =
            formatMoney(totalPrice);

    }


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Start shopping and your products
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML =

        cart.map(item => `

            <div class="cart-product">

                <div class="cart-product-image">

                    ${
                        item.image

                            ? `
                                <img
                                    src="${item.image}"
                                    alt="${escapeHTML(item.name)}"
                                >
                            `

                            : item.emoji
                    }

                </div>


                <div class="cart-product-info">

                    <h4>
                        ${escapeHTML(item.name)}
                    </h4>

                    <strong>
                        ${formatMoney(item.price)}
                    </strong>


                    <div class="cart-controls">

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            class="remove-cart"
                            onclick="removeFromCart(${item.id})"
                        >
                            ×
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    if (!cartSidebar) return;


    cartSidebar.classList.add("active");


    if (overlay) {

        overlay.classList.add("active");

    }


    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    if (cartSidebar) {

        cartSidebar.classList.remove("active");

    }


    if (overlay) {

        overlay.classList.remove("active");

    }


    document.body.style.overflow = "";

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(
    productId,
    button = null
) {

    const id = Number(productId);


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    const exists =
        wishlist.includes(id);


    if (exists) {

        wishlist =
            wishlist.filter(
                itemId =>
                    itemId !== id
            );


        if (button) {

            button.classList.remove("active");

            button.textContent = "♡";

            button.setAttribute(
                "aria-label",
                "Add to wishlist"
            );

        }


        showToast(
            "Removed from wishlist",
            product.name
        );

    }

    else {

        wishlist.push(id);


        if (button) {

            button.classList.add("active");

            button.textContent = "♥";

            button.setAttribute(
                "aria-label",
                "Remove from wishlist"
            );

        }


        showToast(
            "Added to wishlist",
            product.name
        );

    }


    localStorage.setItem(
        "aikenWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

}


/* =====================================================
   WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(
    title,
    message
) {

    if (
        !toast ||
        !toastTitle ||
        !toastMessage
    ) {

        return;

    }


    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

}


/* =====================================================
   SCROLL
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function showCategory(category) {

    const matchingProducts =
        products.filter(
            product =>
                product.category.toLowerCase() ===
                category.toLowerCase()
        );


    if (matchingProducts.length === 0) {

        showToast(
            category,
            "More products are coming soon."
        );

        return;

    }


    if (trendingProducts) {

        trendingProducts.innerHTML =
            matchingProducts
                .map(createProductCard)
                .join("");

    }


    scrollToSection("trending");


    showToast(
        category,
        `${matchingProducts.length} product(s) available.`
    );

}


/* =====================================================
   CATEGORY CARDS
===================================================== */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                if (category) {

                    showCategory(category);

                }

            }
        );

    });


/* =====================================================
   ALL CATEGORIES
===================================================== */

const categoriesBtn =
    document.getElementById("categoriesBtn");


if (categoriesBtn) {

    categoriesBtn.addEventListener(
        "click",
        () => {

            scrollToSection("categories");

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");


const searchResults =
    document.getElementById("searchResults");


const searchBtn =
    document.getElementById("searchBtn");


function performSearch() {

    if (!searchInput) return;


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        if (searchResults) {

            searchResults.innerHTML = "";

            searchResults.classList.remove("active");

        }

        return;

    }


    const results =
        products.filter(
            product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
        );


    if (!searchResults) return;


    if (results.length === 0) {

        searchResults.innerHTML = `

            <div class="search-empty">

                No products found for
                "${escapeHTML(query)}".

            </div>

        `;

    }

    else {

        searchResults.innerHTML =

            results.map(
                product => `

                    <div
                        class="search-result"
                        data-product-id="${product.id}"
                    >

                        <div class="search-result-icon">

                            ${
                                product.image

                                    ? `
                                        <img
                                            src="${product.image}"
                                            alt="${escapeHTML(product.name)}"
                                        >
                                    `

                                    : product.emoji
                            }

                        </div>


                        <div>

                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <span>
                                ${formatMoney(product.price)}
                            </span>

                        </div>

                    </div>

                `
            ).join("");

    }


    searchResults.classList.add("active");

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        performSearch
    );


    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();


                const firstResult =
                    searchResults?.querySelector(
                        ".search-result"
                    );


                if (firstResult) {

                    firstResult.click();

                }

            }

        }
    );

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            performSearch();


            const firstResult =
                searchResults?.querySelector(
                    ".search-result"
                );


            if (firstResult) {

                firstResult.click();

            }

            else if (
                searchInput &&
                searchInput.value.trim()
            ) {

                showToast(
                    "No results",
                    "We couldn't find that product."
                );

            }

        }
    );

}


if (searchResults) {

    searchResults.addEventListener(
        "click",
        event => {

            const result =
                event.target.closest(".search-result");


            if (!result) return;


            const productId =
                Number(result.dataset.productId);


            const product =
                products.find(
                    item =>
                        item.id === productId
                );


            if (!product) return;


            searchInput.value = product.name;

            searchResults.classList.remove("active");


            const productCard =
                document.querySelector(
                    `[data-product-id="${productId}"]`
                );


            if (productCard) {

                productCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                productCard.style.outline =
                    "3px solid #111";


                setTimeout(() => {

                    productCard.style.outline = "";

                }, 1800);

            }

            else {

                addToCart(productId);

            }

        }
    );

}


document.addEventListener(
    "click",
    event => {

        if (
            searchInput &&
            searchResults &&
            !event.target.closest(".search-box")
        ) {

            searchResults.classList.remove("active");

        }

    }
);


/* =====================================================
   CART BUTTONS
===================================================== */

const cartBtn =
    document.getElementById("cartBtn");


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


const closeCartBtn =
    document.getElementById("closeCart");


if (closeCartBtn) {

    closeCartBtn.addEventListener(
        "click",
        closeCart
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        closeCart
    );

}


/* =====================================================
   WISHLIST HEADER
===================================================== */

const wishlistBtn =
    document.getElementById("wishlistBtn");


/* =====================================================
   OPEN WISHLIST
===================================================== */

function openWishlist() {

    let modal =
        document.getElementById(
            "aikenWishlistModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "aikenWishlistModal";

        modal.innerHTML = `

            <div class="aiken-wishlist-panel">

                <div class="aiken-wishlist-header">

                    <h2>
                        My Wishlist
                    </h2>

                    <button
                        class="aiken-wishlist-close"
                        onclick="closeWishlist()"
                    >
                        ×
                    </button>

                </div>

                <div
                    id="aikenWishlistContent"
                ></div>

            </div>

        `;

        document.body.appendChild(
            modal
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeWishlist();

                }

            }
        );

    }


    renderWishlistContent();

    modal.classList.add("active");

}


/* =====================================================
   RENDER WISHLIST
===================================================== */

function renderWishlistContent() {

    const content =
        document.getElementById(
            "aikenWishlistContent"
        );


    if (!content) return;


    if (wishlist.length === 0) {

        content.innerHTML = `

            <div class="aiken-wishlist-empty">

                <div
                    class="aiken-wishlist-empty-icon"
                >
                    ♡
                </div>

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Save products you love
                    and find them here.
                </p>

                <button
                    class="aiken-wishlist-shop"
                    onclick="closeWishlist()"
                >
                    Start Shopping
                </button>

            </div>

        `;

        return;

    }


    const savedProducts =
        products.filter(
            product =>
                wishlist.includes(product.id)
        );


    content.innerHTML =
        savedProducts.map(
            product => `

                <div
                    class="aiken-wishlist-item"
                >

                    <div
                        class="aiken-wishlist-image"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div
                        class="aiken-wishlist-info"
                    >

                        <div
                            class="aiken-wishlist-category"
                        >
                            ${product.category}
                        </div>

                        <h3>
                            ${product.name}
                        </h3>

                        <div
                            class="aiken-wishlist-price"
                        >
                            ${formatMoney(product.price)}
                        </div>


                        <div
                            class="aiken-wishlist-actions"
                        >

                            <button
                                class="aiken-wishlist-cart"
                                onclick="
                                    addToCart(${product.id});
                                    closeWishlist();
                                "
                            >
                                Add to Cart
                            </button>


                            <button
                                class="aiken-wishlist-remove"
                                onclick="
                                    removeFromWishlist(${product.id});
                                "
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            `
        ).join("");

}


/* =====================================================
   REMOVE FROM WISHLIST
===================================================== */

function removeFromWishlist(productId) {

    wishlist =
        wishlist.filter(
            id => id !== productId
        );


    localStorage.setItem(
        "aikenWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    renderProducts();

    renderWishlistContent();


    showToast(
        "Removed from wishlist",
        "Product removed from your wishlist."
    );

}


/* =====================================================
   CLOSE WISHLIST
===================================================== */

function closeWishlist() {

    const modal =
        document.getElementById(
            "aikenWishlistModal"
        );


    if (modal) {

        modal.remove();

    }

}


/* =====================================================
   WISHLIST HEADER BUTTON
===================================================== */

if (wishlistBtn) {

    wishlistBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openWishlist();

        }
    );

}
/* =====================================================
   PREMIUM ACCOUNT SYSTEM
===================================================== */

function openAccount() {

    const existing =
        document.getElementById(
            "aikenAccountModal"
        );


    if (existing) {

        existing.classList.add("active");

        return;

    }


    const modal =
        document.createElement("div");


    modal.id = "aikenAccountModal";


    modal.innerHTML = `

        <div class="aiken-account-overlay">

            <div class="aiken-account-box">

                <button
                    type="button"
                    class="aiken-modal-close"
                    id="closeAccountModal"
                >
                    ×
                </button>


                <div class="aiken-account-content">

                    <div class="aiken-premium-brand">
                        AIKEN<span>.</span>
                    </div>


                    <span class="eyebrow">

                        ${
                            aikenAccount
                                ? "MY AIKEN"
                                : "WELCOME TO AIKEN"
                        }

                    </span>


                    ${
                        aikenAccount

                            ? `

                                <h2>
                                    Welcome back,
                                    ${escapeHTML(aikenAccount.name)}
                                </h2>


                                <p>
                                    Your AIKEN account is ready.
                                    Shop, save and contact us anytime.
                                </p>


                                <div class="aiken-account-profile">

                                    <div class="aiken-profile-icon">

                                        ${escapeHTML(
                                            aikenAccount.name
                                                .charAt(0)
                                                .toUpperCase()
                                        )}

                                    </div>


                                    <div>

                                        <strong>
                                            ${escapeHTML(aikenAccount.name)}
                                        </strong>

                                        <span>
                                            ${escapeHTML(aikenAccount.email)}
                                        </span>

                                        <span>
                                            ${escapeHTML(aikenAccount.phone)}
                                        </span>

                                    </div>

                                </div>


                                <div class="aiken-account-actions">

                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        id="continueShoppingBtn"
                                    >
                                        Continue Shopping
                                    </button>


                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        id="accountTrackOrderBtn"
                                    >
                                        📦 Track My Order
                                    </button>


                                    <a
                                        href="${getWhatsAppLink(
                                            "Hello AIKEN, I would like to get help with my shopping."
                                        )}"
                                        target="_blank"
                                        rel="noopener"
                                        class="aiken-direct-message"
                                    >
                                        💬 Direct Message AIKEN
                                    </a>


                                    <a
                                        href="${AIKEN_PHONE_LINK}"
                                        class="aiken-call-button"
                                    >
                                        📞 Call AIKEN
                                    </a>


                                    <button
                                        type="button"
                                        class="aiken-logout"
                                        id="logoutAccountBtn"
                                    >
                                        Log Out
                                    </button>

                                </div>

                            `

                            : `

                                <h2>
                                    Your shopping,
                                    your account.
                                </h2>


                                <p>
                                    Create your free AIKEN account
                                    and enjoy a smoother shopping experience.
                                </p>


                                <div class="aiken-account-benefits">

                                    <div>
                                        <span>✓</span>

                                        <strong>
                                            Faster checkout
                                        </strong>
                                    </div>


                                    <div>
                                        <span>✓</span>

                                        <strong>
                                            Save your details
                                        </strong>
                                    </div>


                                    <div>
                                        <span>✓</span>

                                        <strong>
                                            Easy customer support
                                        </strong>
                                    </div>

                                </div>


                                <div class="aiken-account-tabs">

                                    <button
                                        type="button"
                                        class="active"
                                        id="createTab"
                                    >
                                        Create Account
                                    </button>


                                    <button
                                        type="button"
                                        id="loginTab"
                                    >
                                        Sign In
                                    </button>

                                </div>


                                <form
                                    id="aikenAccountForm"
                                    class="aiken-account-form"
                                >

                                    <input
                                        type="text"
                                        id="accountName"
                                        placeholder="Full name"
                                        autocomplete="name"
                                        required
                                    >


                                    <input
                                        type="email"
                                        id="accountEmail"
                                        placeholder="Email address"
                                        autocomplete="email"
                                        required
                                    >


                                    <input
                                        type="tel"
                                        id="accountPhone"
                                        placeholder="Phone number"
                                        value="${AIKEN_PHONE}"
                                        autocomplete="tel"
                                        required
                                    >


                                    <input
                                        type="password"
                                        id="accountPassword"
                                        placeholder="Create password"
                                        autocomplete="new-password"
                                        minlength="6"
                                        required
                                    >


                                    <input
                                        type="password"
                                        id="accountConfirmPassword"
                                        placeholder="Confirm password"
                                        autocomplete="new-password"
                                        minlength="6"
                                        required
                                    >


                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Create My AIKEN Account →
                                    </button>

                                </form>


                                <div class="aiken-direct-contact">

                                    <span>
                                        Need help instead?
                                    </span>


                                    <div>

                                        <a
                                            href="${getWhatsAppLink(
                                                "Hello AIKEN, I need help with my shopping."
                                            )}"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            💬 Message AIKEN
                                        </a>


                                        <a
                                            href="${AIKEN_PHONE_LINK}"
                                        >
                                            📞 ${AIKEN_PHONE}
                                        </a>

                                    </div>

                                </div>

                            `
                    }

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add("active");

    });


    setupAccountModal();

}


/* =====================================================
   ACCOUNT MODAL EVENTS
===================================================== */

function setupAccountModal() {

    document
        .getElementById("closeAccountModal")
        ?.addEventListener(
            "click",
            closeAccount
        );


    document
        .getElementById("continueShoppingBtn")
        ?.addEventListener(
            "click",
            closeAccount
        );


    document
        .getElementById("accountTrackOrderBtn")
        ?.addEventListener(
            "click",
            () => {

                closeAccount();


                setTimeout(() => {

                    openOrderTracking();

                }, 300);

            }
        );


    document
        .getElementById("logoutAccountBtn")
        ?.addEventListener(
            "click",
            logoutAccount
        );


    const form =
        document.getElementById(
            "aikenAccountForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            handleAccountSubmit
        );

    }


    const createTab =
        document.getElementById("createTab");


    const loginTab =
        document.getElementById("loginTab");


    createTab?.addEventListener(
        "click",
        showCreateAccountMode
    );


    loginTab?.addEventListener(
        "click",
        showLoginMode
    );

}


/* =====================================================
   CREATE ACCOUNT MODE
===================================================== */

function showCreateAccountMode() {

    const form =
        document.getElementById(
            "aikenAccountForm"
        );


    const createTab =
        document.getElementById("createTab");


    const loginTab =
        document.getElementById("loginTab");


    if (!form) return;


    createTab?.classList.add("active");

    loginTab?.classList.remove("active");


    form.innerHTML = `

        <input
            type="text"
            id="accountName"
            placeholder="Full name"
            autocomplete="name"
            required
        >


        <input
            type="email"
            id="accountEmail"
            placeholder="Email address"
            autocomplete="email"
            required
        >


        <input
            type="tel"
            id="accountPhone"
            placeholder="Phone number"
            value="${AIKEN_PHONE}"
            autocomplete="tel"
            required
        >


        <input
            type="password"
            id="accountPassword"
            placeholder="Create password"
            minlength="6"
            autocomplete="new-password"
            required
        >


        <input
            type="password"
            id="accountConfirmPassword"
            placeholder="Confirm password"
            minlength="6"
            autocomplete="new-password"
            required
        >


        <button
            type="submit"
            class="btn btn-primary"
        >
            Create My AIKEN Account →
        </button>

    `;


    form.onsubmit = handleAccountSubmit;

}


/* =====================================================
   LOGIN MODE
===================================================== */

function showLoginMode() {

    const form =
        document.getElementById(
            "aikenAccountForm"
        );


    const createTab =
        document.getElementById("createTab");


    const loginTab =
        document.getElementById("loginTab");


    if (!form) return;


    createTab?.classList.remove("active");

    loginTab?.classList.add("active");


    form.innerHTML = `

        <input
            type="email"
            id="accountEmail"
            placeholder="Email address"
            autocomplete="email"
            required
        >


        <input
            type="password"
            id="accountPassword"
            placeholder="Your password"
            autocomplete="current-password"
            required
        >


        <button
            type="submit"
            class="btn btn-primary"
        >
            Sign In to AIKEN →
        </button>

    `;


    form.onsubmit = handleLogin;

}


/* =====================================================
   ACCOUNT SUBMIT
===================================================== */

function handleAccountSubmit(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "accountName"
        )?.value.trim();


    const email =
        document.getElementById(
            "accountEmail"
        )?.value.trim().toLowerCase();


    const phone =
        document.getElementById(
            "accountPhone"
        )?.value.trim();


    const password =
        document.getElementById(
            "accountPassword"
        )?.value;


    const confirmPassword =
        document.getElementById(
            "accountConfirmPassword"
        )?.value;


    if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
    ) {

        showToast(
            "Complete your details",
            "Please fill in all account fields."
        );

        return;

    }


    if (password.length < 6) {

        showToast(
            "Password too short",
            "Your password must contain at least 6 characters."
        );

        return;

    }


    if (password !== confirmPassword) {

        showToast(
            "Passwords don't match",
            "Please make sure both passwords are the same."
        );

        return;

    }


    aikenAccount = {

        name,

        email,

        phone,

        password,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "aikenAccount",
        JSON.stringify(aikenAccount)
    );


    updateAccountHeader();

    closeAccount();


    showToast(
        "Welcome to AIKEN!",
        `Your account is ready, ${name}.`
    );

}


/* =====================================================
   LOGIN
===================================================== */

function handleLogin(event) {

    event.preventDefault();


    if (!aikenAccount) {

        showToast(
            "No account found",
            "Please create your AIKEN account first."
        );


        showCreateAccountMode();

        return;

    }


    const email =
        document.getElementById(
            "accountEmail"
        )?.value.trim().toLowerCase();


    const password =
        document.getElementById(
            "accountPassword"
        )?.value;


    if (
        email !==
        String(aikenAccount.email).toLowerCase()
    ) {

        showToast(
            "Account not found",
            "That email does not match your AIKEN account."
        );

        return;

    }


    if (password !== aikenAccount.password) {

        showToast(
            "Incorrect password",
            "Please check your password and try again."
        );

        return;

    }


    closeAccount();

    updateAccountHeader();


    showToast(
        "Welcome back!",
        `Good to see you again, ${aikenAccount.name}.`
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutAccount() {

    aikenAccount = null;


    localStorage.removeItem(
        "aikenAccount"
    );


    closeAccount();

    updateAccountHeader();


    showToast(
        "Logged out",
        "You have safely logged out of AIKEN."
    );

}


/* =====================================================
   CLOSE ACCOUNT
===================================================== */

function closeAccount() {

    const modal =
        document.getElementById(
            "aikenAccountModal"
        );


    if (!modal) return;


    modal.classList.remove("active");


    setTimeout(() => {

        if (modal.parentNode) {

            modal.remove();

        }

    }, 250);

}


/* =====================================================
   ACCOUNT HEADER
===================================================== */

function updateAccountHeader() {

    const accountBtn =
        document.getElementById("accountBtn");


    if (!accountBtn) return;


    const small =
        accountBtn.querySelector("small");


    const strong =
        accountBtn.querySelector("strong");


    if (aikenAccount) {

        if (small) {

            small.textContent =
                `Hello, ${aikenAccount.name}`;

        }


        if (strong) {

            strong.textContent = "My Account";

        }

    }

    else {

        if (small) {

            small.textContent = "Hello, Guest";

        }


        if (strong) {

            strong.textContent = "Account";

        }

    }

}


/* =====================================================
   ACCOUNT BUTTON
===================================================== */

const accountBtn =
    document.getElementById("accountBtn");


if (accountBtn) {

    accountBtn.addEventListener(
        "click",
        openAccount
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileNav =
    document.getElementById("mobileNav");


const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");


const closeMobileMenu =
    document.getElementById("closeMobileMenu");


function closeMobileNavigation() {

    if (mobileNav) {

        mobileNav.classList.remove("active");

    }

}


if (
    mobileMenuBtn &&
    mobileNav
) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            mobileNav.classList.add("active");

        }
    );

}


if (closeMobileMenu) {

    closeMobileMenu.addEventListener(
        "click",
        closeMobileNavigation
    );

}


/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                document.getElementById("emailInput");


            if (!emailInput) return;


            const email =
                emailInput.value.trim();


            if (!email) {

                showToast(
                    "Email required",
                    "Please enter your email address."
                );

                return;

            }


            showToast(
                "You're subscribed!",
                `${email} has been added successfully.`
            );


            newsletterForm.reset();

        }
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

const checkoutBtn =
    document.getElementById("checkoutBtn");


function openCheckout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty",
            "Add a product before checkout."
        );

        return;

    }


    const existing =
        document.getElementById(
            "aikenCheckoutModal"
        );


    if (existing) {

        existing.classList.add("active");

        return;

    }


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                ),
            0
        );


    const modal =
        document.createElement("div");


    modal.id = "aikenCheckoutModal";


    modal.innerHTML = `

        <div class="aiken-account-overlay">

            <div class="aiken-account-box">

                <button
                    type="button"
                    class="aiken-modal-close"
                    id="closeCheckoutModal"
                >
                    ×
                </button>


                <div class="aiken-account-content">

                    <div class="aiken-premium-brand">
                        AIKEN<span>.</span>
                    </div>


                    <span class="eyebrow">
                        AIKEN CHECKOUT
                    </span>


                    <h2>
                        Complete your order
                    </h2>


                    <p>
                        Enter your delivery details and
                        AIKEN will prepare your order.
                    </p>


                    <div class="checkout-summary">

                        <strong>
                            Order Total
                        </strong>


                        <strong>
                            ${formatMoney(subtotal)}
                        </strong>

                    </div>


                    <form
                        id="aikenCheckoutForm"
                        class="aiken-account-form"
                    >

                        <input
                            type="text"
                            id="checkoutName"
                            placeholder="Full name"
                            value="${
                                aikenAccount
                                    ? escapeHTML(aikenAccount.name)
                                    : ""
                            }"
                            required
                        >


                        <input
                            type="tel"
                            id="checkoutPhone"
                            placeholder="Phone number"
                            value="${
                                aikenAccount
                                    ? escapeHTML(aikenAccount.phone)
                                    : AIKEN_PHONE
                            }"
                            required
                        >


                        <input
                            type="text"
                            id="checkoutLocation"
                            placeholder="Delivery location / town"
                            required
                        >


                        <textarea
                            id="checkoutAddress"
                            placeholder="Delivery address / additional directions"
                            rows="4"
                            required
                        ></textarea>


                        <select
                            id="checkoutPayment"
                            required
                        >

                            <option value="">
                                Select payment method
                            </option>


                            <option value="Cash on Delivery">
                                Cash on Delivery
                            </option>


                            <option value="M-Pesa">
                                M-Pesa
                            </option>

                        </select>


                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Place Order →
                        </button>

                    </form>


                    <div class="aiken-direct-contact">

                        <span>
                            Need help with your order?
                        </span>


                        <div>

                            <a
                                href="${getWhatsAppLink(
                                    "Hello AIKEN, I need help with my order."
                                )}"
                                target="_blank"
                                rel="noopener"
                            >
                                💬 Direct Message
                            </a>


                            <a
                                href="${AIKEN_PHONE_LINK}"
                            >
                                📞 ${AIKEN_PHONE}
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add("active");

    });


    document
        .getElementById("closeCheckoutModal")
        ?.addEventListener(
            "click",
            closeCheckout
        );


    document
        .getElementById("aikenCheckoutForm")
        ?.addEventListener(
            "submit",
            handleCheckout
        );

}


/* =====================================================
   HANDLE CHECKOUT
===================================================== */

function handleCheckout(event) {

    event.preventDefault();


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                ),
            0
        );


    const name =
        document.getElementById(
            "checkoutName"
        )?.value.trim();


    const phone =
        document.getElementById(
            "checkoutPhone"
        )?.value.trim();


    const location =
        document.getElementById(
            "checkoutLocation"
        )?.value.trim();


    const address =
        document.getElementById(
            "checkoutAddress"
        )?.value.trim();


    const payment =
        document.getElementById(
            "checkoutPayment"
        )?.value;


    if (
        !name ||
        !phone ||
        !location ||
        !address ||
        !payment
    ) {

        showToast(
            "Incomplete order",
            "Please complete all delivery details."
        );

        return;

    }


    const orderNumber =
        "AIK-" +
        Date.now()
            .toString()
            .slice(-6);


    const createdAt =
        new Date().toISOString();


    const order = {

        orderNumber,

        trackingNumber:
            orderNumber,

        name,

        phone,

        location,

        address,

        payment,

        items: [...cart],

        total: subtotal,

        date: createdAt,

        trackingStatus:
            "received",

        trackingUpdatedAt:
            createdAt,

        trackingUpdates: [

            {
                status: "received",

                title: "Order Received",

                message:
                    "Your order has been received by AIKEN.",

                time: createdAt

            }

        ]

    };


    localStorage.setItem(
        "aikenLastOrder",
        JSON.stringify(order)
    );


    cart = [];

    saveCart();

    updateCartUI();

    closeCheckout();

    closeCart();


    showToast(
        "Order received",
        `Order ${orderNumber} has been created.`
    );


    const orderItems =
        order.items
            .map(
                item =>
                    `• ${item.name} x${item.quantity}`
            )
            .join("\n");


    const message =
        `Hello AIKEN 👋

I have placed an order.

Order: ${orderNumber}

Customer: ${name}

Phone: ${phone}

Delivery: ${location}

Address: ${address}

Payment: ${payment}

Items:
${orderItems}

Total: ${formatMoney(subtotal)}

Please confirm my order. Thank you!`;


    setTimeout(() => {

        window.open(
            getWhatsAppLink(message),
            "_blank"
        );

    }, 500);


    /*
       Open the customer's saved
       tracking immediately.
    */

    setTimeout(() => {

        openOrderTracking();

    }, 1200);

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeCheckout() {

    const modal =
        document.getElementById(
            "aikenCheckoutModal"
        );


    if (!modal) return;


    modal.classList.remove("active");


    setTimeout(() => {

        if (modal.parentNode) {

            modal.remove();

        }

    }, 250);

}


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        openCheckout
    );

}


/* =====================================================
   ORDER TRACKING SYSTEM
===================================================== */

const AIKEN_TRACKING_STAGES = [

    {
        key: "received",
        title: "Order Received",
        description:
            "Your order has been received by AIKEN.",
        icon: "✓"
    },

    {
        key: "confirmed",
        title: "Order Confirmed",
        description:
            "Your order has been confirmed.",
        icon: "✓"
    },

    {
        key: "processing",
        title: "Processing Order",
        description:
            "Your products are being prepared.",
        icon: "📦"
    },

    {
        key: "shipped",
        title: "Order Shipped",
        description:
            "Your order has left our dispatch point.",
        icon: "🚚"
    },

    {
        key: "out_for_delivery",
        title: "Out for Delivery",
        description:
            "Your order is on its way to you.",
        icon: "🛵"
    },

    {
        key: "delivered",
        title: "Delivered",
        description:
            "Your order has been delivered successfully.",
        icon: "🎉"
    }

];


/* =====================================================
   TRACKING MOBILE STYLE
   Scoped ONLY to the tracking system
===================================================== */

(function addTrackingStyles() {

    if (
        document.getElementById(
            "aikenTrackingMobileStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "aikenTrackingMobileStyles";


    style.textContent = `

        #aikenTrackingModal {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
            opacity: 0;
            visibility: hidden;
            transition: opacity .25s ease;
        }

        #aikenTrackingModal.active {
            opacity: 1;
            visibility: visible;
        }

        .aiken-tracking-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.72);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
        }

        .aiken-tracking-box {
            position: relative;
            width: min(600px, 100%);
            max-height: 92vh;
            overflow-y: auto;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 25px 70px rgba(0,0,0,.25);
            -webkit-overflow-scrolling: touch;
        }

        .aiken-tracking-content {
            padding: 32px;
        }

        .aiken-tracking-close {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            width: 38px;
            height: 38px;
            border: 0;
            border-radius: 50%;
            background: #111;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
        }

        .aiken-tracking-header h2 {
            margin: 8px 0;
        }

        .aiken-tracking-header p {
            margin-bottom: 20px;
        }

        .aiken-order-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 20px 0;
        }

        .aiken-order-summary > div {
            padding: 14px;
            background: #f6f6f6;
            border-radius: 12px;
        }

        .aiken-order-summary span,
        .aiken-current-status span,
        .aiken-tracking-delivery span {
            display: block;
            font-size: 10px;
            letter-spacing: 1px;
            font-weight: 700;
            opacity: .65;
            margin-bottom: 5px;
        }

        .aiken-order-summary strong {
            display: block;
            font-size: 14px;
        }

        .aiken-current-status {
            display: flex;
            gap: 14px;
            align-items: flex-start;
            padding: 18px;
            background: #111;
            color: #fff;
            border-radius: 14px;
            margin-bottom: 25px;
        }

        .aiken-current-status-icon {
            width: 45px;
            height: 45px;
            flex: 0 0 45px;
            border-radius: 50%;
            background: #fff;
            color: #111;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 21px;
        }

        .aiken-current-status h3 {
            margin: 4px 0;
        }

        .aiken-current-status p {
            margin: 5px 0;
            opacity: .85;
        }

        .aiken-current-status small {
            opacity: .65;
        }

        .aiken-tracking-timeline {
            position: relative;
            margin: 20px 0;
        }

        .aiken-track-step {
            position: relative;
            display: flex;
            gap: 14px;
            padding: 0 0 24px;
        }

        .aiken-track-step:not(:last-child)::before {
            content: "";
            position: absolute;
            left: 15px;
            top: 31px;
            width: 2px;
            height: calc(100% - 20px);
            background: #ddd;
        }

        .aiken-track-step.completed:not(:last-child)::before {
            background: #111;
        }

        .aiken-track-dot {
            position: relative;
            z-index: 2;
            width: 32px;
            height: 32px;
            flex: 0 0 32px;
            border-radius: 50%;
            background: #eee;
            color: #777;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 700;
        }

        .aiken-track-step.completed .aiken-track-dot {
            background: #111;
            color: #fff;
        }

        .aiken-track-step.current .aiken-track-dot {
            box-shadow: 0 0 0 5px rgba(17,17,17,.12);
        }

        .aiken-track-info strong {
            display: block;
            margin-bottom: 4px;
        }

        .aiken-track-info span {
            display: block;
            font-size: 13px;
            line-height: 1.45;
            opacity: .7;
        }

        .aiken-track-info small {
            display: inline-block;
            margin-top: 7px;
            font-weight: 700;
        }

        .aiken-tracking-delivery {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 12px;
            margin-top: 10px;
        }

        .aiken-tracking-delivery > div {
            background: #f6f6f6;
            border-radius: 12px;
            padding: 15px;
        }

        .aiken-tracking-delivery strong {
            display: block;
        }

        .aiken-tracking-delivery p {
            margin: 5px 0 0;
            font-size: 13px;
            opacity: .7;
        }

        .aiken-tracking-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 20px;
        }

        .aiken-track-whatsapp,
        .aiken-track-call {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            text-align: center;
        }

        .aiken-track-whatsapp {
            background: #111;
            color: #fff;
        }

        .aiken-track-call {
            border: 1px solid #ddd;
            color: #111;
        }

        .aiken-tracking-empty {
            text-align: center;
            padding: 35px 10px 20px;
        }

        .aiken-tracking-icon {
            font-size: 48px;
            margin-bottom: 12px;
        }

        @media (max-width: 600px) {

            #aikenTrackingModal {
                padding: 0;
            }

            .aiken-tracking-overlay {
                padding: 8px;
                align-items: flex-end;
            }

            .aiken-tracking-box {
                width: 100%;
                max-height: 94vh;
                border-radius: 18px 18px 0 0;
            }

            .aiken-tracking-content {
                padding: 25px 16px 22px;
            }

            .aiken-tracking-close {
                top: 9px;
                right: 9px;
                width: 35px;
                height: 35px;
                font-size: 21px;
            }

            .aiken-tracking-header {
                padding-right: 35px;
            }

            .aiken-tracking-header h2 {
                font-size: 24px;
            }

            .aiken-order-summary {
                grid-template-columns: 1fr;
                gap: 8px;
            }

            .aiken-order-summary > div {
                padding: 12px;
            }

            .aiken-current-status {
                padding: 15px;
            }

            .aiken-tracking-delivery {
                grid-template-columns: 1fr;
            }

            .aiken-tracking-actions {
                grid-template-columns: 1fr;
            }

            .aiken-track-step {
                padding-bottom: 20px;
            }

        }

    `;


    document.head.appendChild(style);

})();


/* =====================================================
   GET LAST ORDER
===================================================== */

function getLastOrder() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "aikenLastOrder"
            )
        ) || null;

    }

    catch (error) {

        return null;

    }

}


/* =====================================================
   GET TRACKING STATUS
===================================================== */

function getOrderTrackingStatus(order) {

    if (!order) return 0;


    const status =
        order.trackingStatus ||
        "received";


    const index =
        AIKEN_TRACKING_STAGES.findIndex(
            stage =>
                stage.key === status
        );


    return index >= 0
        ? index
        : 0;

}


/* =====================================================
   SAVE TRACKING STATUS
===================================================== */

function saveTrackingStatus(
    order,
    statusKey,
    message = ""
) {

    if (!order) return;


    order.trackingStatus =
        statusKey;


    order.trackingUpdatedAt =
        new Date().toISOString();


    if (!Array.isArray(order.trackingUpdates)) {

        order.trackingUpdates = [];

    }


    const stage =
        AIKEN_TRACKING_STAGES.find(
            item =>
                item.key === statusKey
        );


    order.trackingUpdates.push({

        status: statusKey,

        title:
            stage?.title ||
            statusKey,

        message:
            message ||
            stage?.description ||
            "",

        time:
            order.trackingUpdatedAt

    });


    localStorage.setItem(
        "aikenLastOrder",
        JSON.stringify(order)
    );

}


/* =====================================================
   ADD TRACKING UPDATE
   FUTURE ADMIN / BACKEND READY
===================================================== */

function updateAikenTracking(
    orderNumber,
    statusKey,
    message = ""
) {

    const order =
        getLastOrder();


    if (
        !order ||
        order.orderNumber !== orderNumber
    ) {

        return false;

    }


    const valid =
        AIKEN_TRACKING_STAGES.some(
            stage =>
                stage.key === statusKey
        );


    if (!valid) {

        return false;

    }


    saveTrackingStatus(
        order,
        statusKey,
        message
    );


    renderTrackingContent();


    return true;

}


/*
   This gives you a future way to update
   an order from an admin/backend system.

   Example:

   updateAikenTracking(
       "AIK-123456",
       "shipped",
       "Your order has left our dispatch point."
   );
*/

window.updateAikenTracking =
    updateAikenTracking;


/* =====================================================
   OPEN ORDER TRACKING
===================================================== */

function openOrderTracking() {

    const existing =
        document.getElementById(
            "aikenTrackingModal"
        );


    if (existing) {

        existing.classList.add("active");

        renderTrackingContent();

        document.body.style.overflow = "hidden";

        return;

    }


    const modal =
        document.createElement("div");


    modal.id =
        "aikenTrackingModal";


    modal.innerHTML = `

        <div class="aiken-tracking-overlay">

            <div class="aiken-tracking-box">

                <button
                    type="button"
                    class="aiken-tracking-close"
                    id="closeTrackingModal"
                    aria-label="Close order tracking"
                >
                    ×
                </button>


                <div
                    id="aikenTrackingContent"
                    class="aiken-tracking-content"
                >
                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add("active");

    });


    document.body.style.overflow = "hidden";


    document
        .getElementById("closeTrackingModal")
        ?.addEventListener(
            "click",
            closeOrderTracking
        );


    renderTrackingContent();

}


/* =====================================================
   RENDER TRACKING
===================================================== */

function renderTrackingContent() {

    const container =
        document.getElementById(
            "aikenTrackingContent"
        );


    if (!container) return;


    const order =
        getLastOrder();


    if (!order) {

        container.innerHTML = `

            <div class="aiken-tracking-empty">

                <div class="aiken-tracking-icon">
                    📦
                </div>


                <span class="eyebrow">
                    AIKEN ORDER TRACKING
                </span>


                <h2>
                    No order to track yet
                </h2>


                <p>
                    Once you place an order with AIKEN,
                    you will be able to follow its progress
                    right here.
                </p>


                <button
                    type="button"
                    class="btn btn-primary"
                    id="trackingShopBtn"
                >
                    Start Shopping
                </button>

            </div>

        `;


        document
            .getElementById("trackingShopBtn")
            ?.addEventListener(
                "click",
                () => {

                    closeOrderTracking();

                    scrollToSection("home");

                }
            );


        return;

    }


    /*
       Backwards compatibility for orders
       created by the previous version.
    */

    if (!Array.isArray(order.trackingUpdates)) {

        const currentStage =
            AIKEN_TRACKING_STAGES[
                getOrderTrackingStatus(order)
            ];


        order.trackingUpdates = [

            {
                status:
                    order.trackingStatus ||
                    "received",

                title:
                    currentStage.title,

                message:
                    currentStage.description,

                time:
                    order.trackingUpdatedAt ||
                    order.date ||
                    new Date().toISOString()

            }

        ];


        localStorage.setItem(
            "aikenLastOrder",
            JSON.stringify(order)
        );

    }


    const currentIndex =
        getOrderTrackingStatus(order);


    const currentStage =
        AIKEN_TRACKING_STAGES[currentIndex];


    const updatedAt =
        order.trackingUpdatedAt ||
        order.date;


    const updatedDate =
        updatedAt
            ? new Date(updatedAt)
                .toLocaleString(
                    "en-KE",
                    {
                        dateStyle: "medium",
                        timeStyle: "short"
                    }
                )
            : "Recently";


    const itemsCount =
        order.items?.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(item.quantity || 0),
            0
        ) || 0;


    /*
       Only stages actually reached
       are shown as completed.
    */

    const timelineHTML =
        AIKEN_TRACKING_STAGES
            .map(
                (stage, index) => {

                    const completed =
                        index <= currentIndex;


                    const active =
                        index === currentIndex;


                    return `

                        <div
                            class="
                                aiken-track-step
                                ${completed ? "completed" : ""}
                                ${active ? "current" : ""}
                            "
                        >

                            <div class="aiken-track-dot">

                                ${
                                    completed
                                        ? "✓"
                                        : index + 1
                                }

                            </div>


                            <div class="aiken-track-info">

                                <strong>
                                    ${escapeHTML(
                                        stage.title
                                    )}
                                </strong>


                                <span>
                                    ${escapeHTML(
                                        stage.description
                                    )}
                                </span>


                                ${
                                    active
                                        ? `
                                            <small>
                                                Current update
                                            </small>
                                        `
                                        : ""
                                }

                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    /*
       Show actual saved updates.
    */

    const updatesHTML =
        [...order.trackingUpdates]
            .reverse()
            .map(
                update => `

                    <div
                        style="
                            padding:12px 0;
                            border-bottom:1px solid #eee;
                        "
                    >

                        <strong>
                            ${escapeHTML(
                                update.title
                            )}
                        </strong>

                        <div
                            style="
                                font-size:13px;
                                opacity:.7;
                                margin-top:4px;
                            "
                        >
                            ${escapeHTML(
                                update.message || ""
                            )}
                        </div>

                        <small
                            style="
                                display:block;
                                margin-top:5px;
                                opacity:.5;
                            "
                        >
                            ${escapeHTML(
                                new Date(
                                    update.time
                                ).toLocaleString(
                                    "en-KE",
                                    {
                                        dateStyle: "medium",
                                        timeStyle: "short"
                                    }
                                )
                            )}
                        </small>

                    </div>

                `
            )
            .join("");


    container.innerHTML = `

        <div class="aiken-tracking-header">

            <div>

                <div class="aiken-premium-brand">
                    AIKEN<span>.</span>
                </div>


                <span class="eyebrow">
                    ORDER TRACKING
                </span>


                <h2>
                    Track your order
                </h2>


                <p>
                    Follow your AIKEN order from confirmation
                    to delivery.
                </p>

            </div>

        </div>


        <div class="aiken-order-summary">

            <div>

                <span>
                    ORDER NUMBER
                </span>


                <strong>
                    ${escapeHTML(
                        order.orderNumber
                    )}
                </strong>

            </div>


            <div>

                <span>
                    CURRENT STATUS
                </span>


                <strong>
                    ${escapeHTML(
                        currentStage.title
                    )}
                </strong>

            </div>


            <div>

                <span>
                    TOTAL
                </span>


                <strong>
                    ${formatMoney(order.total)}
                </strong>

            </div>

        </div>


        <div class="aiken-current-status">

            <div class="aiken-current-status-icon">
                ${currentStage.icon}
            </div>


            <div>

                <span>
                    CURRENT UPDATE
                </span>


                <h3>
                    ${escapeHTML(
                        currentStage.title
                    )}
                </h3>


                <p>
                    ${escapeHTML(
                        currentStage.description
                    )}
                </p>


                <small>
                    Last updated:
                    ${escapeHTML(updatedDate)}
                </small>

            </div>

        </div>


        <div class="aiken-tracking-timeline">

            ${timelineHTML}

        </div>


        <div
            style="
                margin-top:20px;
                padding:15px;
                border-radius:12px;
                background:#f6f6f6;
            "
        >

            <strong>
                Latest updates
            </strong>


            <div style="margin-top:8px;">
                ${updatesHTML}
            </div>

        </div>


        <div class="aiken-tracking-delivery">

            <div>

                <span>
                    DELIVERY TO
                </span>


                <strong>
                    ${escapeHTML(order.location)}
                </strong>


                <p>
                    ${escapeHTML(order.address)}
                </p>

            </div>


            <div>

                <span>
                    ITEMS
                </span>


                <strong>
                    ${itemsCount}
                    ${
                        itemsCount === 1
                            ? " item"
                            : " items"
                    }
                </strong>

            </div>

        </div>


        <div class="aiken-tracking-actions">

            <a
                href="${getWhatsAppLink(
                    `Hello AIKEN 👋

I would like an update on my order.

Order: ${order.orderNumber}

Current status: ${currentStage.title}

Please help me with my order.`
                )}"
                target="_blank"
                rel="noopener"
                class="aiken-track-whatsapp"
            >
                💬 Message AIKEN
            </a>


            <a
                href="${AIKEN_PHONE_LINK}"
                class="aiken-track-call"
            >
                📞 Call AIKEN
            </a>

        </div>

    `;

}


/* =====================================================
   CLOSE ORDER TRACKING
===================================================== */

function closeOrderTracking() {

    const modal =
        document.getElementById(
            "aikenTrackingModal"
        );


    if (!modal) return;


    modal.classList.remove("active");


    document.body.style.overflow = "";


    setTimeout(() => {

        if (modal.parentNode) {

            modal.remove();

        }

    }, 250);

}


/* =====================================================
   TRACKING LINKS
===================================================== */

function setupTrackingLinks() {

    document
        .querySelectorAll("a, button")
        .forEach(element => {

            const text =
                element.textContent
                    .trim()
                    .toLowerCase();


            if (
                text === "track order" ||
                text === "track my order" ||
                text.includes("track order")
            ) {

                if (
                    element.dataset.aikenTrackingBound
                ) {

                    return;

                }


                element.dataset.aikenTrackingBound =
                    "true";


                element.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        closeMobileNavigation();

                        openOrderTracking();

                    }
                );

            }

        });

}


/* =====================================================
   COUNTDOWN TIMER
===================================================== */

let totalSeconds =
    (8 * 60 * 60) +
    (42 * 60) +
    15;


function updateCountdown() {

    if (totalSeconds <= 0) {

        totalSeconds =
            (8 * 60 * 60) +
            (42 * 60) +
            15;

    }


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds % 3600
            ) / 60
        );


    const seconds =
        totalSeconds % 60;


    const hoursElement =
        document.getElementById("hours");


    const minutesElement =
        document.getElementById("minutes");


    const secondsElement =
        document.getElementById("seconds");


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(2, "0");

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    totalSeconds--;

}


setInterval(
    updateCountdown,
    1000
);


updateCountdown();


/* =====================================================
   SPECIAL NAVIGATION
   HELP CENTER -> WHATSAPP
===================================================== */

function setupSpecialNavigation() {

    document
        .querySelectorAll("a, button")
        .forEach(element => {

            const text =
                element.textContent
                    .trim()
                    .toLowerCase();


            /*
               HELP CENTER
            */

            if (
                text === "help center" ||
                text.includes("help center")
            ) {

                if (
                    element.dataset.aikenHelpBound
                ) {

                    return;

                }


                element.dataset.aikenHelpBound =
                    "true";


                const helpMessage =
                    "Hello AIKEN 👋\n\n" +
                    "I need help with my shopping.";


                if (
                    element.tagName.toLowerCase() === "a"
                ) {

                    element.href =
                        getWhatsAppLink(
                            helpMessage
                        );

                    element.target =
                        "_blank";

                    element.rel =
                        "noopener";

                }


                element.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        window.open(
                            getWhatsAppLink(
                                helpMessage
                            ),
                            "_blank"
                        );

                    }
                );

            }


            /*
               CONTACT US
            */

            if (
                text.includes("contact us") ||
                text === "contact"
            ) {

                if (
                    element.tagName.toLowerCase() === "a"
                ) {

                    element.href =
                        getWhatsAppLink(
                            "Hello AIKEN 👋\n\n" +
                            "I would like to contact customer support."
                        );

                    element.target =
                        "_blank";

                    element.rel =
                        "noopener";

                    element.title =
                        "Message AIKEN on WhatsApp";

                }

            }

        });

}


/* =====================================================
   NAVIGATION LINKS
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                /*
                   Don't interfere with
                   Help Center or tracking.
                */

                if (
                    link.dataset.aikenHelpBound ||
                    link.dataset.aikenTrackingBound
                ) {

                    return;

                }


                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();

                    scrollToSection("home");

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });


                    closeMobileNavigation();

                }

            }
        );

    });


/* =====================================================
   VIEW ALL BUTTONS
===================================================== */

document
    .querySelectorAll(".view-all")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const section =
                    button.closest(".section");


                if (!section) return;


                const grid =
                    section.querySelector(
                        ".product-grid"
                    );


                if (!grid) return;


                if (section.id === "deals") {

                    grid.innerHTML =
                        products
                            .filter(
                                product =>
                                    product.type === "flash"
                            )
                            .map(createProductCard)
                            .join("");

                }


                else if (section.id === "trending") {

                    grid.innerHTML =
                        products
                            .map(createProductCard)
                            .join("");

                }


                else if (section.id === "new-arrivals") {

                    grid.innerHTML =
                        products
                            .filter(
                                product =>
                                    product.type === "new"
                            )
                            .map(createProductCard)
                            .join("");

                }


                showToast(
                    "AIKEN",
                    "Showing available products."
                );

            }
        );

    });


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        closeCart();

        closeAccount();

        closeCheckout();

        closeOrderTracking();

        closeMobileNavigation();


        if (searchResults) {

            searchResults.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderProducts();

updateCartUI();

updateWishlistCount();

updateAccountHeader();

setupTrackingLinks();

setupSpecialNavigation();


/* =====================================================
   RESTORE LAST ORDER
===================================================== */

const savedLastOrder =
    getLastOrder();


if (
    savedLastOrder &&
    savedLastOrder.orderNumber
) {

    /*
       Do NOT automatically fake or advance
       the order status.

       The status remains whatever the latest
       real saved update says.
    */

    if (!savedLastOrder.trackingStatus) {

        savedLastOrder.trackingStatus =
            "received";

        savedLastOrder.trackingUpdatedAt =
            savedLastOrder.date ||
            new Date().toISOString();


        localStorage.setItem(
            "aikenLastOrder",
            JSON.stringify(savedLastOrder)
        );

    }

}


/* =====================================================
   FINAL CONSOLE MESSAGE
===================================================== */

console.log(
    "AIKEN Marketplace loaded successfully."
);


console.log(
    `AIKEN Contact: ${AIKEN_PHONE}`
);


console.log(
    "AIKEN Order Tracking: Ready"
);


console.log(
    "AIKEN Help Center: WhatsApp Ready"
);
/* =====================================================
   FIX CART UNDEFINED ITEMS
===================================================== */

cart = cart.filter(item =>
    item &&
    item.id &&
    item.name &&
    typeof item.price === "number"
);

localStorage.setItem(
    "aikenCart",
    JSON.stringify(cart)
);

updateCartUI();
/* =====================================================
   AIKEN CHECKOUT + ORDERS + ORDER TRACKING
===================================================== */


/* =====================================================
   ORDER STORAGE
===================================================== */

let aikenOrders =
    JSON.parse(
        localStorage.getItem("aikenOrders")
    ) || [];


/* =====================================================
   SAVE ORDERS
===================================================== */

function saveAikenOrders() {

    localStorage.setItem(
        "aikenOrders",
        JSON.stringify(aikenOrders)
    );

}


/* =====================================================
   GET CART TOTAL
===================================================== */

function getAikenOrderTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                );

        },
        0
    );

}


/* =====================================================
   AIKEN ORDER SYSTEM
   UPDATED + RESPONSIVE VERSION
===================================================== */


/* =====================================================
   GENERATE ORDER NUMBER
===================================================== */

function generateAikenOrderNumber() {

    const time =
        Date.now()
            .toString()
            .slice(-8);

    return "AIK-" + time;

}


/* =====================================================
   OPEN CHECKOUT
===================================================== */

function openAikenCheckout() {

    if (
        !cart ||
        cart.length === 0
    ) {

        showToast(
            "Your cart is empty",
            "Add a product before checkout."
        );

        return;

    }


    let modal =
        document.getElementById(
            "aikenCheckoutModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "aikenCheckoutModal";


        modal.innerHTML = `

            <div class="aiken-checkout-overlay">

                <div class="aiken-checkout-box">

                    <button
                        type="button"
                        class="aiken-checkout-close"
                        id="aikenCheckoutClose"
                    >
                        ×
                    </button>


                    <div class="aiken-checkout-content">

                        <div class="aiken-checkout-brand">
                            AIKEN<span>.</span>
                        </div>


                        <span class="aiken-checkout-eyebrow">
                            SECURE CHECKOUT
                        </span>


                        <h2>
                            Complete Your Order
                        </h2>


                        <p class="aiken-checkout-intro">
                            Enter your delivery details
                            to place your AIKEN order.
                        </p>


                        <!-- DELIVERY DETAILS -->

                        <div class="aiken-checkout-section">

                            <h3>
                                1. Delivery Details
                            </h3>


                            <div class="aiken-checkout-form">

                                <div class="aiken-checkout-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="aikenOrderName"
                                        placeholder="Your full name"
                                        autocomplete="name"
                                    >

                                </div>


                                <div class="aiken-checkout-field">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="aikenOrderPhone"
                                        placeholder="07XXXXXXXX"
                                        autocomplete="tel"
                                    >

                                </div>


                                <div class="aiken-checkout-field">

                                    <label>
                                        Delivery Address
                                    </label>

                                    <textarea
                                        id="aikenOrderAddress"
                                        placeholder="Enter your delivery address"
                                        rows="3"
                                    ></textarea>

                                </div>

                            </div>

                        </div>


                        <!-- ORDER SUMMARY -->

                        <div class="aiken-checkout-section">

                            <h3>
                                2. Order Summary
                            </h3>


                            <div
                                id="aikenOrderSummary"
                                class="aiken-order-summary"
                            ></div>


                            <div class="aiken-order-total">

                                <span>
                                    Total
                                </span>

                                <strong
                                    id="aikenCheckoutTotal"
                                >
                                    ${formatMoney(
                                        getAikenOrderTotal()
                                    )}
                                </strong>

                            </div>

                        </div>


                        <!-- PAYMENT METHOD -->

                        <div class="aiken-checkout-section">

                            <h3>
                                3. Payment Method
                            </h3>


                            <div class="aiken-payment-options">

                                <label
                                    class="aiken-payment-option active"
                                >

                                    <input
                                        type="radio"
                                        name="aikenPaymentMethod"
                                        value="M-Pesa"
                                        checked
                                    >

                                    <span class="aiken-payment-option-icon">
                                        📱
                                    </span>

                                    <span>

                                        <strong>
                                            M-Pesa
                                        </strong>

                                        <small>
                                            Recommended
                                        </small>

                                    </span>

                                </label>


                                <label
                                    class="aiken-payment-option"
                                >

                                    <input
                                        type="radio"
                                        name="aikenPaymentMethod"
                                        value="Card"
                                    >

                                    <span class="aiken-payment-option-icon">
                                        💳
                                    </span>

                                    <span>

                                        <strong>
                                            Card
                                        </strong>

                                        <small>
                                            Visa / Mastercard
                                        </small>

                                    </span>

                                </label>


                                <label
                                    class="aiken-payment-option"
                                >

                                    <input
                                        type="radio"
                                        name="aikenPaymentMethod"
                                        value="Pay on Delivery"
                                    >

                                    <span class="aiken-payment-option-icon">
                                        📦
                                    </span>

                                    <span>

                                        <strong>
                                            Pay on Delivery
                                        </strong>

                                        <small>
                                            If available
                                        </small>

                                    </span>

                                </label>

                            </div>

                        </div>


                        <button
                            type="button"
                            class="btn btn-primary aiken-place-order"
                            id="aikenPlaceOrderBtn"
                        >
                            Place Order →
                        </button>


                        <div class="aiken-checkout-security">

                            🔒 Your order information is stored securely
                            on this device.

                        </div>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        renderAikenOrderSummary();

        setupAikenCheckoutEvents();

    }


    renderAikenOrderSummary();


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   GET ORDER TOTAL
===================================================== */

function getAikenOrderTotal() {

    if (
        !cart ||
        !Array.isArray(cart)
    ) {
        return 0;
    }


    return cart.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.price) *
                    Number(item.quantity || 1)
                );

        },
        0
    );

}


/* =====================================================
   ORDER SUMMARY
===================================================== */

function renderAikenOrderSummary() {

    const summary =
        document.getElementById(
            "aikenOrderSummary"
        );


    const total =
        document.getElementById(
            "aikenCheckoutTotal"
        );


    if (!summary) return;


    summary.innerHTML =
        cart.map(
            item => `

                <div class="aiken-order-item">

                    <div class="aiken-order-item-image">

                        ${
                            item.image
                            ?
                            `
                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >
                            `
                            :
                            `<span>${item.emoji || "🛍️"}</span>`
                        }

                    </div>


                    <div class="aiken-order-item-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            Qty: ${item.quantity}
                        </span>

                    </div>


                    <strong class="aiken-order-item-price">

                        ${formatMoney(
                            Number(item.price) *
                            Number(item.quantity)
                        )}

                    </strong>

                </div>

            `
        ).join("");


    if (total) {

        total.textContent =
            formatMoney(
                getAikenOrderTotal()
            );

    }

}


/* =====================================================
   CHECKOUT EVENTS
===================================================== */

function setupAikenCheckoutEvents() {

    const modal =
        document.getElementById(
            "aikenCheckoutModal"
        );


    if (!modal) return;


    document
        .getElementById(
            "aikenCheckoutClose"
        )
        ?.addEventListener(
            "click",
            closeAikenCheckout
        );


    document
        .getElementById(
            "aikenPlaceOrderBtn"
        )
        ?.addEventListener(
            "click",
            placeAikenOrder
        );


    const paymentOptions =
        modal.querySelectorAll(
            ".aiken-payment-option"
        );


    paymentOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    paymentOptions.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add(
                        "active"
                    );


                    const radio =
                        option.querySelector(
                            "input"
                        );


                    if (radio) {

                        radio.checked =
                            true;

                    }

                }
            );

        }
    );

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeAikenCheckout() {

    const modal =
        document.getElementById(
            "aikenCheckoutModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   PLACE ORDER
===================================================== */

function placeAikenOrder() {

    const name =
        document.getElementById(
            "aikenOrderName"
        )?.value.trim();


    const phone =
        document.getElementById(
            "aikenOrderPhone"
        )?.value.trim();


    const address =
        document.getElementById(
            "aikenOrderAddress"
        )?.value.trim();


    const payment =
        document.querySelector(
            'input[name="aikenPaymentMethod"]:checked'
        )?.value;


    if (!name) {

        showToast(
            "Name required",
            "Enter your full name."
        );

        return;

    }


    if (!phone) {

        showToast(
            "Phone number required",
            "Enter your phone number."
        );

        return;

    }


    if (!address) {

        showToast(
            "Delivery address required",
            "Enter where you want your order delivered."
        );

        return;

    }


    if (!payment) {

        showToast(
            "Payment method required",
            "Choose a payment method."
        );

        return;

    }


    const orderNumber =
        generateAikenOrderNumber();


    const order = {

        id: orderNumber,

        customer: {

            name,

            phone,

            address

        },


        items:
            cart.map(
                item => ({

                    id: item.id,

                    name: item.name,

                    price: item.price,

                    quantity:
                        item.quantity,

                    image:
                        item.image

                })
            ),


        total:
            getAikenOrderTotal(),


        paymentMethod:
            payment,


        paymentStatus:
            payment === "Pay on Delivery"
            ? "Pending"
            : "Awaiting Payment",


        orderStatus:
            "Order Placed",


        createdAt:
            new Date().toISOString()

    };


    if (
        typeof aikenOrders === "undefined"
    ) {

        window.aikenOrders = [];

    }


    aikenOrders.unshift(
        order
    );


    saveAikenOrders();


    cart = [];


    saveCart();


    updateCartUI();


    closeAikenCheckout();


    showAikenOrderSuccess(
        order
    );

}


/* =====================================================
   ORDER SUCCESS
===================================================== */

function showAikenOrderSuccess(order) {

    let modal =
        document.getElementById(
            "aikenOrderSuccessModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "aikenOrderSuccessModal";


        modal.innerHTML = `

            <div class="aiken-success-overlay">

                <div class="aiken-success-box">

                    <div class="aiken-success-icon">
                        ✓
                    </div>


                    <div class="aiken-success-brand">
                        AIKEN<span>.</span>
                    </div>


                    <span class="aiken-success-eyebrow">
                        ORDER CONFIRMED
                    </span>


                    <h2>
                        Thank You, ${escapeHTML(order.customer.name)}
                    </h2>


                    <p>
                        Your AIKEN order has been received.
                    </p>


                    <div class="aiken-success-order">

                        <span>
                            Order Number
                        </span>

                        <strong>
                            ${order.id}
                        </strong>

                    </div>


                    <div class="aiken-success-total">

                        <span>
                            Order Total
                        </span>

                        <strong>
                            ${formatMoney(order.total)}
                        </strong>

                    </div>


                    <div class="aiken-success-actions">

                        <button
                            type="button"
                            class="btn btn-primary"
                            id="aikenTrackNewOrderBtn"
                        >
                            📦 Track My Order
                        </button>


                        <button
                            type="button"
                            class="aiken-success-secondary"
                            id="aikenContinueShoppingBtn"
                        >
                            Continue Shopping
                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        document
            .getElementById(
                "aikenTrackNewOrderBtn"
            )
            ?.addEventListener(
                "click",
                () => {

                    closeAikenOrderSuccess();

                    openOrderTracking(
                        order.id
                    );

                }
            );


        document
            .getElementById(
                "aikenContinueShoppingBtn"
            )
            ?.addEventListener(
                "click",
                closeAikenOrderSuccess
            );

    }


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE ORDER SUCCESS
===================================================== */

function closeAikenOrderSuccess() {

    const modal =
        document.getElementById(
            "aikenOrderSuccessModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   RESPONSIVE ORDER TRACKING STYLES
===================================================== */

(function addAikenTrackingStyles() {

    if (
        document.getElementById(
            "aikenTrackingResponsiveStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "aikenTrackingResponsiveStyles";


    style.textContent = `

        /* TRACKING WINDOW */

        .aiken-tracking-overlay {

            position: fixed;

            inset: 0;

            width: 100%;

            height: 100%;

            background: rgba(0, 0, 0, .65);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 24px;

            box-sizing: border-box;

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity .25s ease,
                visibility .25s ease;

            z-index: 99999;

            overflow-y: auto;

        }


        #aikenOrderTrackingModal.active
        .aiken-tracking-overlay {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;

        }


        .aiken-tracking-box {

            position: relative;

            width: 100%;

            max-width: 720px;

            max-height: 92vh;

            background: #ffffff;

            border-radius: 22px;

            overflow: hidden;

            box-shadow:
                0 25px 80px rgba(0,0,0,.25);

            transform:
                translateY(20px)
                scale(.98);

            transition:
                transform .25s ease;

        }


        #aikenOrderTrackingModal.active
        .aiken-tracking-box {

            transform:
                translateY(0)
                scale(1);

        }


        .aiken-tracking-content {

            width: 100%;

            max-height: 92vh;

            overflow-y: auto;

            padding: 38px;

            box-sizing: border-box;

        }


        .aiken-tracking-close {

            position: absolute;

            top: 16px;

            right: 18px;

            width: 42px;

            height: 42px;

            border: none;

            border-radius: 50%;

            background: #f5f5f5;

            color: #111;

            font-size: 28px;

            line-height: 1;

            cursor: pointer;

            z-index: 5;

            transition:
                .2s ease;

        }


        .aiken-tracking-close:hover {

            background: #111;

            color: #fff;

        }


        .aiken-tracking-brand {

            font-size: 25px;

            font-weight: 800;

            letter-spacing: -1px;

        }


        .aiken-tracking-brand span {

            color: #0396FF;

        }


        .aiken-tracking-eyebrow {

            display: block;

            margin-top: 12px;

            font-size: 11px;

            font-weight: 800;

            letter-spacing: 2px;

            color: #777;

        }


        .aiken-tracking-content h2 {

            margin:
                8px 0 8px;

            font-size: 30px;

            line-height: 1.15;

        }


        .aiken-tracking-content > p {

            margin:
                0 0 24px;

            color: #666;

            line-height: 1.6;

        }


        .aiken-tracking-search {

            display: flex;

            gap: 10px;

            width: 100%;

            margin-bottom: 25px;

        }


        .aiken-tracking-search input {

            flex: 1;

            min-width: 0;

            height: 50px;

            padding:
                0 15px;

            border:
                1px solid #ddd;

            border-radius: 10px;

            outline: none;

            font-size: 14px;

            box-sizing: border-box;

        }


        .aiken-tracking-search input:focus {

            border-color:
                #0396FF;

            box-shadow:
                0 0 0 3px
                rgba(3,150,255,.10);

        }


        .aiken-tracking-search button {

            min-height: 50px;

            white-space: nowrap;

            cursor: pointer;

        }


        .aiken-tracking-card {

            border:
                1px solid #e8e8e8;

            border-radius: 16px;

            padding: 22px;

            background: #fff;

        }


        .aiken-tracking-order-head {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            gap: 15px;

            padding-bottom: 20px;

            border-bottom:
                1px solid #eee;

        }


        .aiken-tracking-order-head div {

            display: flex;

            flex-direction: column;

            gap: 5px;

        }


        .aiken-tracking-order-head span {

            font-size: 11px;

            color: #888;

            text-transform: uppercase;

            letter-spacing: .8px;

        }


        .aiken-tracking-order-head strong {

            font-size: 15px;

            word-break: break-word;

        }


        .aiken-tracking-timeline {

            display: grid;

            grid-template-columns:
                repeat(5, 1fr);

            gap: 6px;

            margin:
                28px 0;

        }


        .aiken-tracking-step {

            position: relative;

            text-align: center;

            color: #aaa;

            font-size: 11px;

        }


        .aiken-tracking-dot {

            width: 34px;

            height: 34px;

            margin:
                0 auto 8px;

            border-radius: 50%;

            background: #eee;

            color: #fff;

            display: flex;

            align-items: center;

            justify-content: center;

            font-weight: 800;

        }


        .aiken-tracking-step.completed {

            color: #111;

            font-weight: 700;

        }


        .aiken-tracking-step.completed
        .aiken-tracking-dot {

            background: #111;

        }


        .aiken-tracking-details {

            display: grid;

            grid-template-columns:
                1fr 1fr;

            gap: 12px;

            margin-top: 20px;

        }


        .aiken-tracking-details div {

            padding: 13px;

            background: #f7f7f7;

            border-radius: 10px;

            display: flex;

            flex-direction: column;

            gap: 5px;

            min-width: 0;

        }


        .aiken-tracking-details span {

            color: #888;

            font-size: 11px;

        }


        .aiken-tracking-details strong {

            font-size: 13px;

            word-break: break-word;

        }


        .aiken-tracking-products {

            margin-top: 22px;

            border-top:
                1px solid #eee;

            padding-top: 18px;

        }


        .aiken-tracking-products h3 {

            margin:
                0 0 12px;

            font-size: 16px;

        }


        .aiken-tracking-product {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            padding:
                11px 0;

            border-bottom:
                1px solid #f0f0f0;

            font-size: 13px;

        }


        .aiken-tracking-product span {

            min-width: 0;

            word-break: break-word;

        }


        .aiken-tracking-not-found {

            text-align: center;

            padding: 28px 15px;

            background: #f7f7f7;

            border-radius: 14px;

        }


        .aiken-tracking-not-found > div {

            font-size: 32px;

            margin-bottom: 8px;

        }


        .aiken-tracking-not-found h3 {

            margin:
                0 0 6px;

        }


        .aiken-tracking-not-found p {

            margin: 0;

            color: #777;

            font-size: 14px;

        }


        .aiken-no-orders {

            text-align: center;

            padding: 25px;

            background: #f7f7f7;

            border-radius: 12px;

        }


        .aiken-no-orders div {

            font-size: 30px;

            margin-bottom: 8px;

        }


        .aiken-no-orders p {

            margin: 0;

            color: #777;

        }


        .aiken-recent-order {

            width: 100%;

            border: 1px solid #eee;

            background: #fff;

            border-radius: 10px;

            padding: 13px;

            margin-bottom: 8px;

            display: flex;

            justify-content: space-between;

            align-items: center;

            gap: 15px;

            text-align: left;

            cursor: pointer;

            transition: .2s ease;

        }


        .aiken-recent-order:hover {

            border-color:
                #0396FF;

            transform:
                translateY(-1px);

        }


        .aiken-recent-order span {

            display: flex;

            flex-direction: column;

            gap: 4px;

            min-width: 0;

        }


        .aiken-recent-order span:last-child {

            text-align: right;

        }


        .aiken-recent-order strong {

            font-size: 13px;

        }


        .aiken-recent-order small {

            color: #888;

            font-size: 11px;

        }


        .aiken-recent-orders {

            margin-top: 28px;

        }


        .aiken-recent-orders h3 {

            margin:
                0 0 12px;

            font-size: 16px;

        }


        /* =================================================
           PHONE
        ================================================= */

        @media (max-width: 700px) {

            .aiken-tracking-overlay {

                align-items: flex-end;

                padding: 0;

            }


            .aiken-tracking-box {

                width: 100%;

                max-width: none;

                max-height: 94vh;

                border-radius:
                    22px 22px 0 0;

            }


            .aiken-tracking-content {

                max-height: 94vh;

                padding:
                    30px 18px 25px;

            }


            .aiken-tracking-close {

                top: 12px;

                right: 12px;

                width: 38px;

                height: 38px;

                font-size: 25px;

            }


            .aiken-tracking-content h2 {

                font-size: 24px;

                padding-right: 45px;

            }


            .aiken-tracking-brand {

                font-size: 22px;

            }


            .aiken-tracking-search {

                flex-direction: column;

                gap: 9px;

            }


            .aiken-tracking-search input {

                width: 100%;

                height: 50px;

            }


            .aiken-tracking-search button {

                width: 100%;

                min-height: 50px;

            }


            .aiken-tracking-card {

                padding: 16px;

            }


            .aiken-tracking-order-head {

                grid-template-columns:
                    1fr;

                gap: 12px;

            }


            .aiken-tracking-timeline {

                grid-template-columns:
                    1fr;

                gap: 0;

                margin:
                    20px 0;

            }


            .aiken-tracking-step {

                display: flex;

                align-items: center;

                text-align: left;

                gap: 12px;

                min-height: 45px;

            }


            .aiken-tracking-dot {

                flex:
                    0 0 30px;

                width: 30px;

                height: 30px;

                margin: 0;

                position: relative;

                z-index: 2;

            }


            .aiken-tracking-step:not(:last-child)
            .aiken-tracking-dot::after {

                content: "";

                position: absolute;

                top: 30px;

                left: 14px;

                width: 2px;

                height: 15px;

                background: #eee;

            }


            .aiken-tracking-step.completed:not(:last-child)
            .aiken-tracking-dot::after {

                background: #111;

            }


            .aiken-tracking-details {

                grid-template-columns:
                    1fr;

            }


            .aiken-tracking-product {

                align-items: flex-start;

                flex-direction: column;

                gap: 5px;

            }


            .aiken-tracking-product strong {

                align-self: flex-start;

            }


            .aiken-recent-order {

                padding: 12px;

            }

        }


        /* =================================================
           SMALL PHONE
        ================================================= */

        @media (max-width: 380px) {

            .aiken-tracking-content {

                padding:
                    26px 14px 20px;

            }


            .aiken-tracking-card {

                padding: 13px;

            }


            .aiken-tracking-content h2 {

                font-size: 22px;

            }


            .aiken-tracking-details div {

                padding: 11px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =====================================================
   OPEN ORDER TRACKING
===================================================== */

function openOrderTracking(orderNumber = "") {

    let modal =
        document.getElementById(
            "aikenOrderTrackingModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "aikenOrderTrackingModal";


        modal.innerHTML = `

            <div class="aiken-tracking-overlay">

                <div class="aiken-tracking-box">

                    <button
                        type="button"
                        class="aiken-tracking-close"
                        id="aikenTrackingClose"
                        aria-label="Close order tracking"
                    >
                        ×
                    </button>


                    <div class="aiken-tracking-content">

                        <div class="aiken-tracking-brand">
                            AIKEN<span>.</span>
                        </div>


                        <span class="aiken-tracking-eyebrow">
                            ORDER TRACKING
                        </span>


                        <h2>
                            Track Your Order
                        </h2>


                        <p>
                            Enter your AIKEN order number
                            to see its current status.
                        </p>


                        <div class="aiken-tracking-search">

                            <input
                                type="text"
                                id="aikenTrackingNumber"
                                placeholder="Example: AIK-12345678"
                                autocomplete="off"
                            >


                            <button
                                type="button"
                                class="btn btn-primary"
                                id="aikenTrackOrderBtn"
                            >
                                Track Order
                            </button>

                        </div>


                        <div
                            id="aikenTrackingResult"
                            class="aiken-tracking-result"
                        ></div>


                        <div class="aiken-recent-orders">

                            <h3>
                                Recent Orders
                            </h3>


                            <div
                                id="aikenRecentOrders"
                            ></div>

                        </div>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const closeButton =
            document.getElementById(
                "aikenTrackingClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeOrderTracking
            );

        }


        const trackButton =
            document.getElementById(
                "aikenTrackOrderBtn"
            );


        if (trackButton) {

            trackButton.addEventListener(
                "click",
                trackAikenOrder
            );

        }


        const trackingInput =
            document.getElementById(
                "aikenTrackingNumber"
            );


        if (trackingInput) {

            trackingInput.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        trackAikenOrder();

                    }

                }
            );

        }


        const overlay =
            modal.querySelector(
                ".aiken-tracking-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        closeOrderTracking();

                    }

                }
            );

        }

    }


    renderRecentAikenOrders();


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    const input =
        document.getElementById(
            "aikenTrackingNumber"
        );


    if (input) {

        input.value =
            orderNumber || "";


        setTimeout(
            () => {

                input.focus();

            },
            150
        );

    }


    if (orderNumber) {

        trackAikenOrder();

    }

}


/* =====================================================
   CLOSE ORDER TRACKING
===================================================== */

function closeOrderTracking() {

    const modal =
        document.getElementById(
            "aikenOrderTrackingModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   TRACK ORDER
===================================================== */

function trackAikenOrder() {

    const input =
        document.getElementById(
            "aikenTrackingNumber"
        );


    const result =
        document.getElementById(
            "aikenTrackingResult"
        );


    if (!input || !result) {

        return;

    }


    const orderNumber =
        input.value
            .trim()
            .toUpperCase();


    if (!orderNumber) {

        result.innerHTML = `

            <div class="aiken-tracking-not-found">

                <div>
                    🔍
                </div>

                <h3>
                    Enter an order number
                </h3>

                <p>
                    Enter your AIKEN order number
                    to track your order.
                </p>

            </div>

        `;

        return;

    }


    const order =
        Array.isArray(aikenOrders)
        ?
        aikenOrders.find(
            item =>
                item &&
                item.id &&
                String(item.id)
                    .toUpperCase() ===
                orderNumber
        )
        :
        null;


    if (!order) {

        result.innerHTML = `

            <div class="aiken-tracking-not-found">

                <div>
                    🔍
                </div>

                <h3>
                    Order not found
                </h3>

                <p>
                    Check your order number
                    and try again.
                </p>

            </div>

        `;

        return;

    }


    renderAikenTrackingResult(
        order
    );

}


/* =====================================================
   TRACKING RESULT
===================================================== */

function renderAikenTrackingResult(order) {

    const result =
        document.getElementById(
            "aikenTrackingResult"
        );


    if (!result) return;


    const steps = [

        "Order Placed",

        "Confirmed",

        "Processing",

        "Shipped",

        "Delivered"

    ];


    const currentIndex =
        Math.max(
            0,
            steps.indexOf(
                order.orderStatus
            )
        );


    result.innerHTML = `

        <div class="aiken-tracking-card">

            <div class="aiken-tracking-order-head">

                <div>

                    <span>
                        Order Number
                    </span>

                    <strong>
                        ${escapeHTML(
                            String(order.id)
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Total
                    </span>

                    <strong>
                        ${formatMoney(
                            Number(order.total)
                        )}
                    </strong>

                </div>

            </div>


            <div class="aiken-tracking-timeline">

                ${

                    steps.map(
                        (step, index) => `

                            <div
                                class="
                                    aiken-tracking-step
                                    ${
                                        index <= currentIndex
                                        ? "completed"
                                        : ""
                                    }
                                "
                            >

                                <div class="aiken-tracking-dot">

                                    ${
                                        index <= currentIndex
                                        ? "✓"
                                        : ""
                                    }

                                </div>


                                <span>
                                    ${step}
                                </span>

                            </div>

                        `
                    ).join("")

                }

            </div>


            <div class="aiken-tracking-details">

                <div>

                    <span>
                        Customer
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.customer?.name || ""
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Payment
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.paymentMethod || ""
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Payment Status
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.paymentStatus || ""
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Delivery
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.customer?.address || ""
                        )}
                    </strong>

                </div>

            </div>


            <div class="aiken-tracking-products">

                <h3>
                    Items
                </h3>


                ${
                    Array.isArray(order.items)
                    ?
                    order.items.map(
                        item => `

                            <div class="aiken-tracking-product">

                                <span>
                                    ${escapeHTML(
                                        item.name || "Product"
                                    )}

                                    × ${Number(
                                        item.quantity || 1
                                    )}
                                </span>


                                <strong>

                                    ${formatMoney(
                                        Number(item.price || 0) *
                                        Number(item.quantity || 1)
                                    )}

                                </strong>

                            </div>

                        `
                    ).join("")
                    :
                    ""
                }

            </div>

        </div>

    `;

}


/* =====================================================
   RECENT ORDERS
===================================================== */

function renderRecentAikenOrders() {

    const container =
        document.getElementById(
            "aikenRecentOrders"
        );


    if (!container) return;


    if (
        !Array.isArray(aikenOrders) ||
        aikenOrders.length === 0
    ) {

        container.innerHTML = `

            <div class="aiken-no-orders">

                <div>
                    📦
                </div>

                <p>
                    You don't have any orders yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        aikenOrders
            .slice(0, 5)
            .map(
                order => `

                    <button
                        type="button"
                        class="aiken-recent-order"
                        data-order-id="${escapeHTML(
                            String(order.id)
                        )}"
                    >

                        <span>

                            <strong>
                                ${escapeHTML(
                                    String(order.id)
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    order.customer?.name || ""
                                )}
                            </small>

                        </span>


                        <span>

                            <strong>
                                ${formatMoney(
                                    Number(order.total)
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    order.orderStatus || "Order Placed"
                                )}
                            </small>

                        </span>

                    </button>

                `
            )
            .join("");


    container
        .querySelectorAll(
            ".aiken-recent-order"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const order =
                            aikenOrders.find(
                                item =>
                                    String(item.id) ===
                                    String(
                                        button.dataset.orderId
                                    )
                            );


                        if (order) {

                            renderAikenTrackingResult(
                                order
                            );

                        }

                    }
                );

            }
        );

}


/* =====================================================
   OPEN MY ORDERS
===================================================== */

function openMyAikenOrders() {

    openOrderTracking();

}


/* =====================================================
   CONNECT CHECKOUT BUTTON
===================================================== */

const originalAikenCheckout =
    document.getElementById(
        "checkoutBtn"
    );


if (originalAikenCheckout) {

    originalAikenCheckout.onclick =
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            openAikenCheckout();

        };

}


/* =====================================================
   MAKE TRACK BUTTONS WORK
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#trackOrderBtn, " +
                ".track-order-btn, " +
                "[data-track-order], " +
                "#aikenTrackOrder"
            );


        if (!button) return;


        event.preventDefault();

        event.stopPropagation();


        openOrderTracking();

    }
);


/* =====================================================
   AIKEN ORDER SYSTEM READY
===================================================== */

console.log(
    "AIKEN Checkout & Order Tracking System Ready"
);
/* =========================================================
   AIKEN CUSTOMER ACCOUNT + MY ORDERS
   SAFE ADD-ON
   Paste this entire block at the VERY BOTTOM of app.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       STORAGE
    ===================================================== */

    const AIKEN_ACCOUNT_KEY =
        "aikenCustomerAccount";


    const AIKEN_ORDERS_KEY =
        "aikenOrders";


    /* =====================================================
       CUSTOMER ACCOUNT DATA
    ===================================================== */

    let aikenCustomerAccount =
        JSON.parse(
            localStorage.getItem(
                AIKEN_ACCOUNT_KEY
            )
        ) || {
            name: "",
            phone: "",
            email: "",
            address: "",
            city: ""
        };


    if (
        !aikenCustomerAccount ||
        typeof aikenCustomerAccount !== "object"
    ) {

        aikenCustomerAccount = {
            name: "",
            phone: "",
            email: "",
            address: "",
            city: ""
        };

    }


    /* =====================================================
       SAFE HTML
    ===================================================== */

    function aikenAccountEscape(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       GET ORDERS
    ===================================================== */

    function getAikenCustomerOrders() {

        let orders = [];

        try {

            orders =
                JSON.parse(
                    localStorage.getItem(
                        AIKEN_ORDERS_KEY
                    )
                ) || [];

        } catch (error) {

            orders = [];

        }


        if (!Array.isArray(orders)) {

            orders = [];

        }


        return orders;

    }


    /* =====================================================
       SAVE ACCOUNT
    ===================================================== */

    function saveAikenCustomerAccount() {

        localStorage.setItem(
            AIKEN_ACCOUNT_KEY,
            JSON.stringify(
                aikenCustomerAccount
            )
        );

    }


    /* =====================================================
       ACCOUNT STYLES
       These styles are isolated to the account system.
===================================================== */

    if (
        !document.getElementById(
            "aikenCustomerAccountStyles"
        )
    ) {

        const style =
            document.createElement("style");


        style.id =
            "aikenCustomerAccountStyles";


        style.textContent = `

        /* =========================================
           ACCOUNT MODAL
        ========================================= */

        #aikenCustomerAccountModal {

            position: fixed;

            inset: 0;

            z-index: 999999;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 24px;

            background:
                rgba(0, 0, 0, 0.62);

            backdrop-filter:
                blur(8px);

            -webkit-backdrop-filter:
                blur(8px);

        }


        #aikenCustomerAccountModal.active {

            display: flex;

        }


        /* =========================================
           ACCOUNT PANEL
        ========================================= */

        .aiken-account-panel {

            width: min(
                960px,
                100%
            );

            max-height: 90vh;

            overflow-y: auto;

            background: #ffffff;

            border-radius: 20px;

            box-shadow:
                0 25px 80px
                rgba(0,0,0,0.25);

            position: relative;

            animation:
                aikenAccountOpen
                .25s ease;

        }


        @keyframes aikenAccountOpen {

            from {

                opacity: 0;

                transform:
                    translateY(20px)
                    scale(.98);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        /* =========================================
           ACCOUNT HEADER
        ========================================= */

        .aiken-account-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            padding: 24px 28px;

            border-bottom:
                1px solid #eeeeee;

            position: sticky;

            top: 0;

            background: #ffffff;

            z-index: 5;

        }


        .aiken-account-title {

            display: flex;

            align-items: center;

            gap: 14px;

        }


        .aiken-account-avatar {

            width: 50px;

            height: 50px;

            min-width: 50px;

            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #111111,
                    #333333
                );

            color: #ffffff;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 21px;

            font-weight: 700;

        }


        .aiken-account-title h2 {

            margin: 0;

            font-size: 21px;

            color: #111111;

        }


        .aiken-account-title p {

            margin: 4px 0 0;

            color: #777777;

            font-size: 13px;

        }


        .aiken-account-close {

            width: 42px;

            height: 42px;

            border: none;

            border-radius: 50%;

            background: #f4f4f4;

            color: #111111;

            font-size: 25px;

            line-height: 1;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .aiken-account-close:hover {

            background: #111111;

            color: #ffffff;

            transform:
                rotate(90deg);

        }


        /* =========================================
           ACCOUNT BODY
        ========================================= */

        .aiken-account-body {

            padding: 28px;

        }


        /* =========================================
           ACCOUNT NAV
        ========================================= */

        .aiken-account-tabs {

            display: flex;

            gap: 10px;

            margin-bottom: 26px;

            flex-wrap: wrap;

        }


        .aiken-account-tab {

            border: 1px solid #dddddd;

            background: #ffffff;

            color: #555555;

            padding: 11px 18px;

            border-radius: 10px;

            cursor: pointer;

            font-size: 14px;

            font-weight: 600;

            transition:
                .2s ease;

        }


        .aiken-account-tab:hover {

            border-color: #111111;

            color: #111111;

        }


        .aiken-account-tab.active {

            background: #111111;

            border-color: #111111;

            color: #ffffff;

        }


        /* =========================================
           ACCOUNT SECTIONS
        ========================================= */

        .aiken-account-section {

            display: none;

        }


        .aiken-account-section.active {

            display: block;

        }


        /* =========================================
           PROFILE CARD
        ========================================= */

        .aiken-profile-card {

            border:
                1px solid #eeeeee;

            border-radius: 16px;

            padding: 24px;

            background: #ffffff;

        }


        .aiken-section-heading {

            margin-bottom: 22px;

        }


        .aiken-section-heading h3 {

            margin: 0 0 6px;

            color: #111111;

            font-size: 19px;

        }


        .aiken-section-heading p {

            margin: 0;

            color: #777777;

            font-size: 13px;

            line-height: 1.5;

        }


        /* =========================================
           FORM
        ========================================= */

        .aiken-profile-form {

            display: grid;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 18px;

        }


        .aiken-form-group {

            display: flex;

            flex-direction: column;

            gap: 7px;

        }


        .aiken-form-group.full {

            grid-column:
                1 / -1;

        }


        .aiken-form-group label {

            font-size: 13px;

            font-weight: 700;

            color: #333333;

        }


        .aiken-form-group input,

        .aiken-form-group textarea {

            width: 100%;

            box-sizing: border-box;

            border:
                1px solid #dddddd;

            background: #ffffff;

            color: #111111;

            border-radius: 10px;

            padding: 13px 14px;

            outline: none;

            font-family: inherit;

            font-size: 14px;

            transition:
                .2s ease;

        }


        .aiken-form-group textarea {

            min-height: 105px;

            resize: vertical;

        }


        .aiken-form-group input:focus,

        .aiken-form-group textarea:focus {

            border-color: #111111;

            box-shadow:
                0 0 0 3px
                rgba(17,17,17,.07);

        }


        .aiken-profile-actions {

            display: flex;

            justify-content: flex-end;

            gap: 10px;

            margin-top: 22px;

        }


        .aiken-save-profile {

            border: none;

            background: #111111;

            color: #ffffff;

            padding: 13px 22px;

            border-radius: 10px;

            font-size: 14px;

            font-weight: 700;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .aiken-save-profile:hover {

            transform:
                translateY(-1px);

            box-shadow:
                0 8px 20px
                rgba(0,0,0,.15);

        }


        /* =========================================
           ACCOUNT SUMMARY
        ========================================= */

        .aiken-account-summary {

            display: grid;

            grid-template-columns:
                repeat(3, minmax(0, 1fr));

            gap: 14px;

            margin-bottom: 22px;

        }


        .aiken-summary-box {

            border:
                1px solid #eeeeee;

            border-radius: 14px;

            padding: 18px;

            background: #fafafa;

        }


        .aiken-summary-icon {

            font-size: 22px;

            margin-bottom: 9px;

        }


        .aiken-summary-number {

            font-size: 21px;

            font-weight: 800;

            color: #111111;

        }


        .aiken-summary-label {

            margin-top: 4px;

            font-size: 12px;

            color: #777777;

        }


        /* =========================================
           ORDERS
        ========================================= */

        .aiken-orders-list {

            display: flex;

            flex-direction: column;

            gap: 14px;

        }


        .aiken-order-card {

            border:
                1px solid #eeeeee;

            border-radius: 15px;

            padding: 19px;

            background: #ffffff;

            transition:
                .2s ease;

        }


        .aiken-order-card:hover {

            border-color: #d5d5d5;

            box-shadow:
                0 8px 25px
                rgba(0,0,0,.06);

        }


        .aiken-order-top {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            margin-bottom: 15px;

        }


        .aiken-order-number {

            font-size: 14px;

            font-weight: 800;

            color: #111111;

        }


        .aiken-order-date {

            margin-top: 4px;

            color: #888888;

            font-size: 12px;

        }


        .aiken-order-status {

            display: inline-flex;

            align-items: center;

            justify-content: center;

            padding: 7px 11px;

            border-radius: 999px;

            font-size: 11px;

            font-weight: 800;

            background: #f2f2f2;

            color: #333333;

            white-space: nowrap;

        }


        .aiken-order-status.pending {

            background: #fff4d6;

            color: #7a5700;

        }


        .aiken-order-status.confirmed {

            background: #e9f4ff;

            color: #135b8f;

        }


        .aiken-order-status.processing {

            background: #eee9ff;

            color: #5436a3;

        }


        .aiken-order-status.shipped {

            background: #e8f8ee;

            color: #16713a;

        }


        .aiken-order-status.delivered {

            background: #dff7e8;

            color: #12652f;

        }


        .aiken-order-status.cancelled {

            background: #ffe8e8;

            color: #a52828;

        }


        /* =========================================
           ORDER PRODUCTS
        ========================================= */

        .aiken-order-products {

            display: flex;

            flex-direction: column;

            gap: 8px;

            padding: 13px 0;

            border-top:
                1px solid #f0f0f0;

            border-bottom:
                1px solid #f0f0f0;

        }


        .aiken-order-product-row {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 12px;

            font-size: 13px;

        }


        .aiken-order-product-name {

            color: #444444;

            min-width: 0;

            overflow: hidden;

            text-overflow: ellipsis;

            white-space: nowrap;

        }


        .aiken-order-product-qty {

            color: #888888;

            white-space: nowrap;

        }


        /* =========================================
           ORDER BOTTOM
        ========================================= */

        .aiken-order-bottom {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 15px;

            margin-top: 15px;

        }


        .aiken-order-total-label {

            color: #777777;

            font-size: 12px;

        }


        .aiken-order-total {

            margin-top: 3px;

            font-size: 17px;

            font-weight: 800;

            color: #111111;

        }


        .aiken-order-actions {

            display: flex;

            gap: 8px;

            flex-wrap: wrap;

            justify-content: flex-end;

        }


        .aiken-order-action {

            border:
                1px solid #dddddd;

            background: #ffffff;

            color: #111111;

            padding: 9px 13px;

            border-radius: 9px;

            font-size: 12px;

            font-weight: 700;

            cursor: pointer;

            transition:
                .2s ease;

        }


        .aiken-order-action:hover {

            background: #111111;

            color: #ffffff;

            border-color: #111111;

        }


        .aiken-order-action.primary {

            background: #111111;

            color: #ffffff;

            border-color: #111111;

        }


        .aiken-order-action.primary:hover {

            background: #333333;

        }


        /* =========================================
           EMPTY ORDERS
        ========================================= */

        .aiken-orders-empty {

            text-align: center;

            padding: 50px 20px;

            border:
                1px dashed #dddddd;

            border-radius: 15px;

        }


        .aiken-orders-empty-icon {

            font-size: 42px;

            margin-bottom: 12px;

        }


        .aiken-orders-empty h3 {

            margin: 0 0 7px;

            color: #111111;

            font-size: 18px;

        }


        .aiken-orders-empty p {

            margin: 0;

            color: #777777;

            font-size: 13px;

        }


        /* =========================================
           ADDRESS PREVIEW
        ========================================= */

        .aiken-address-preview {

            margin-top: 20px;

            padding: 16px;

            border-radius: 12px;

            background: #f8f8f8;

            border:
                1px solid #eeeeee;

        }


        .aiken-address-preview-title {

            font-size: 12px;

            font-weight: 800;

            color: #555555;

            margin-bottom: 6px;

            text-transform: uppercase;

            letter-spacing: .4px;

        }


        .aiken-address-preview-text {

            color: #333333;

            font-size: 13px;

            line-height: 1.6;

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

            #aikenCustomerAccountModal {

                padding: 0;

                align-items:
                    flex-end;

            }


            .aiken-account-panel {

                width: 100%;

                max-height: 94vh;

                border-radius:
                    20px 20px 0 0;

            }


            .aiken-account-header {

                padding:
                    18px 18px;

            }


            .aiken-account-body {

                padding:
                    18px;

            }


            .aiken-account-title h2 {

                font-size: 18px;

            }


            .aiken-account-title p {

                font-size: 12px;

            }


            .aiken-account-avatar {

                width: 43px;

                height: 43px;

                min-width: 43px;

                font-size: 18px;

            }


            .aiken-account-tabs {

                display: grid;

                grid-template-columns:
                    1fr 1fr;

            }


            .aiken-account-tab {

                width: 100%;

                padding:
                    11px 8px;

                font-size: 12px;

            }


            .aiken-profile-card {

                padding: 17px;

            }


            .aiken-profile-form {

                grid-template-columns:
                    1fr;

                gap: 15px;

            }


            .aiken-form-group.full {

                grid-column:
                    auto;

            }


            .aiken-profile-actions {

                display: block;

            }


            .aiken-save-profile {

                width: 100%;

            }


            .aiken-account-summary {

                grid-template-columns:
                    1fr;

            }


            .aiken-order-top {

                align-items:
                    flex-start;

                flex-direction:
                    column;

            }


            .aiken-order-status {

                align-self:
                    flex-start;

            }


            .aiken-order-bottom {

                align-items:
                    flex-start;

                flex-direction:
                    column;

            }


            .aiken-order-actions {

                width: 100%;

                display: grid;

                grid-template-columns:
                    1fr 1fr;

            }


            .aiken-order-action {

                width: 100%;

            }

        }


        @media (max-width: 400px) {

            .aiken-account-tabs {

                grid-template-columns:
                    1fr;

            }


            .aiken-order-actions {

                grid-template-columns:
                    1fr;

            }

        }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       CREATE ACCOUNT MODAL
    ===================================================== */

    function createAikenAccountModal() {

        let modal =
            document.getElementById(
                "aikenCustomerAccountModal"
            );


        if (modal) {

            return modal;

        }


        modal =
            document.createElement("div");


        modal.id =
            "aikenCustomerAccountModal";


        modal.innerHTML = `

            <div
                class="aiken-account-panel"
                role="dialog"
                aria-modal="true"
                aria-label="AIKEN Account"
            >

                <!-- HEADER -->

                <div class="aiken-account-header">

                    <div class="aiken-account-title">

                        <div
                            class="aiken-account-avatar"
                            id="aikenAccountAvatar"
                        >
                            👤
                        </div>

                        <div>

                            <h2>
                                My AIKEN Account
                            </h2>

                            <p
                                id="aikenAccountGreeting"
                            >
                                Manage your profile and orders
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="aiken-account-close"
                        id="aikenAccountClose"
                        aria-label="Close account"
                    >
                        ×
                    </button>

                </div>


                <!-- BODY -->

                <div class="aiken-account-body">

                    <!-- TABS -->

                    <div
                        class="aiken-account-tabs"
                        role="tablist"
                    >

                        <button
                            type="button"
                            class="aiken-account-tab active"
                            data-account-tab="profile"
                        >
                            👤 My Profile
                        </button>


                        <button
                            type="button"
                            class="aiken-account-tab"
                            data-account-tab="orders"
                        >
                            📦 My Orders
                        </button>

                    </div>


                    <!-- PROFILE -->

                    <section
                        class="aiken-account-section active"
                        data-account-section="profile"
                    >

                        <div class="aiken-profile-card">

                            <div class="aiken-section-heading">

                                <h3>
                                    Personal Information
                                </h3>

                                <p>
                                    Save your details so checkout becomes faster next time.
                                </p>

                            </div>


                            <form
                                class="aiken-profile-form"
                                id="aikenCustomerProfileForm"
                            >

                                <div class="aiken-form-group">

                                    <label for="aikenCustomerName">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="aikenCustomerName"
                                        placeholder="Your full name"
                                        autocomplete="name"
                                    >

                                </div>


                                <div class="aiken-form-group">

                                    <label for="aikenCustomerPhone">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="aikenCustomerPhone"
                                        placeholder="07XXXXXXXX"
                                        autocomplete="tel"
                                    >

                                </div>


                                <div class="aiken-form-group">

                                    <label for="aikenCustomerEmail">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="aikenCustomerEmail"
                                        placeholder="you@example.com"
                                        autocomplete="email"
                                    >

                                </div>


                                <div class="aiken-form-group">

                                    <label for="aikenCustomerCity">
                                        City / Town
                                    </label>

                                    <input
                                        type="text"
                                        id="aikenCustomerCity"
                                        placeholder="e.g. Nairobi"
                                        autocomplete="address-level2"
                                    >

                                </div>


                                <div
                                    class="aiken-form-group full"
                                >

                                    <label for="aikenCustomerAddress">
                                        Delivery Address
                                    </label>

                                    <textarea
                                        id="aikenCustomerAddress"
                                        placeholder="Enter your delivery address"
                                        autocomplete="street-address"
                                    ></textarea>

                                </div>

                            </form>


                            <div class="aiken-profile-actions">

                                <button
                                    type="button"
                                    class="aiken-save-profile"
                                    id="aikenSaveProfile"
                                >
                                    Save My Details
                                </button>

                            </div>


                            <div
                                class="aiken-address-preview"
                                id="aikenAddressPreview"
                            ></div>

                        </div>

                    </section>


                    <!-- ORDERS -->

                    <section
                        class="aiken-account-section"
                        data-account-section="orders"
                    >

                        <div
                            class="aiken-account-summary"
                            id="aikenAccountSummary"
                        ></div>


                        <div class="aiken-section-heading">

                            <h3>
                                My Orders
                            </h3>

                            <p>
                                View your previous orders and track their progress.
                            </p>

                        </div>


                        <div
                            class="aiken-orders-list"
                            id="aikenCustomerOrders"
                        ></div>

                    </section>

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        /* =============================================
           CLOSE BUTTON
        ============================================= */

        const closeButton =
            document.getElementById(
                "aikenAccountClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeAikenAccount
            );

        }


        /* =============================================
           CLICK OUTSIDE
        ============================================= */

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeAikenAccount();

                }

            }
        );


        /* =============================================
           ESCAPE KEY
        ============================================= */

        if (
            !window.__aikenAccountEscapeReady
        ) {

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Escape"
                    ) {

                        const currentModal =
                            document.getElementById(
                                "aikenCustomerAccountModal"
                            );


                        if (
                            currentModal &&
                            currentModal.classList.contains(
                                "active"
                            )
                        ) {

                            closeAikenAccount();

                        }

                    }

                }
            );


            window.__aikenAccountEscapeReady =
                true;

        }


        /* =============================================
           TABS
        ============================================= */

        modal
            .querySelectorAll(
                "[data-account-tab]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        function () {

                            switchAikenAccountTab(
                                this.dataset.accountTab
                            );

                        }
                    );

                }
            );


        /* =============================================
           SAVE PROFILE
        ============================================= */

        const saveButton =
            document.getElementById(
                "aikenSaveProfile"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                saveAikenProfileFromForm
            );

        }


        /* =============================================
           FORM ENTER
        ============================================= */

        const profileForm =
            document.getElementById(
                "aikenCustomerProfileForm"
            );


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    saveAikenProfileFromForm();

                }
            );

        }


        return modal;

    }


    /* =====================================================
       FILL PROFILE FORM
    ===================================================== */

    function fillAikenProfileForm() {

        const name =
            document.getElementById(
                "aikenCustomerName"
            );


        const phone =
            document.getElementById(
                "aikenCustomerPhone"
            );


        const email =
            document.getElementById(
                "aikenCustomerEmail"
            );


        const address =
            document.getElementById(
                "aikenCustomerAddress"
            );


        const city =
            document.getElementById(
                "aikenCustomerCity"
            );


        if (name) {

            name.value =
                aikenCustomerAccount.name || "";

        }


        if (phone) {

            phone.value =
                aikenCustomerAccount.phone || "";

        }


        if (email) {

            email.value =
                aikenCustomerAccount.email || "";

        }


        if (address) {

            address.value =
                aikenCustomerAccount.address || "";

        }


        if (city) {

            city.value =
                aikenCustomerAccount.city || "";

        }


        updateAikenAccountHeader();

        updateAikenAddressPreview();

    }


    /* =====================================================
       UPDATE ACCOUNT HEADER
    ===================================================== */

    function updateAikenAccountHeader() {

        const greeting =
            document.getElementById(
                "aikenAccountGreeting"
            );


        const avatar =
            document.getElementById(
                "aikenAccountAvatar"
            );


        if (
            aikenCustomerAccount.name
        ) {

            const firstName =
                aikenCustomerAccount.name
                    .trim()
                    .split(/\s+/)[0];


            if (greeting) {

                greeting.textContent =
                    `Welcome back, ${firstName}`;

            }


            if (avatar) {

                avatar.textContent =
                    firstName
                        .charAt(0)
                        .toUpperCase();

            }


        } else {

            if (greeting) {

                greeting.textContent =
                    "Manage your profile and orders";

            }


            if (avatar) {

                avatar.textContent =
                    "👤";

            }

        }

    }


    /* =====================================================
       UPDATE ADDRESS PREVIEW
    ===================================================== */

    function updateAikenAddressPreview() {

        const preview =
            document.getElementById(
                "aikenAddressPreview"
            );


        if (!preview) return;


        const address =
            aikenCustomerAccount.address
            || "";


        const city =
            aikenCustomerAccount.city
            || "";


        if (
            !address &&
            !city
        ) {

            preview.innerHTML = `

                <div class="aiken-address-preview-title">
                    Delivery Address
                </div>

                <div class="aiken-address-preview-text">
                    No delivery address saved yet.
                </div>

            `;

            return;

        }


        preview.innerHTML = `

            <div class="aiken-address-preview-title">
                Delivery Address
            </div>

            <div class="aiken-address-preview-text">

                ${aikenAccountEscape(address)}

                ${
                    city
                    ? `<br>${aikenAccountEscape(city)}`
                    : ""
                }

            </div>

        `;

    }


    /* =====================================================
       SAVE PROFILE FROM FORM
    ===================================================== */

    function saveAikenProfileFromForm() {

        const name =
            document.getElementById(
                "aikenCustomerName"
            );


        const phone =
            document.getElementById(
                "aikenCustomerPhone"
            );


        const email =
            document.getElementById(
                "aikenCustomerEmail"
            );


        const address =
            document.getElementById(
                "aikenCustomerAddress"
            );


        const city =
            document.getElementById(
                "aikenCustomerCity"
            );


        if (!name) return;


        const customerName =
            name.value.trim();


        const customerPhone =
            phone
            ? phone.value.trim()
            : "";


        const customerEmail =
            email
            ? email.value.trim()
            : "";


        const customerAddress =
            address
            ? address.value.trim()
            : "";


        const customerCity =
            city
            ? city.value.trim()
            : "";


        if (!customerName) {

            showAikenAccountToast(
                "Name required",
                "Please enter your full name."
            );

            name.focus();

            return;

        }


        if (
            customerEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(customerEmail)
        ) {

            showAikenAccountToast(
                "Check your email",
                "Please enter a valid email address."
            );

            if (email) {

                email.focus();

            }

            return;

        }


        aikenCustomerAccount = {

            name:
                customerName,

            phone:
                customerPhone,

            email:
                customerEmail,

            address:
                customerAddress,

            city:
                customerCity

        };


        saveAikenCustomerAccount();

        updateAikenAccountHeader();

        updateAikenAddressPreview();

        syncAikenAccountButton();


        showAikenAccountToast(
            "Details saved",
            "Your AIKEN account details have been saved."
        );

    }


    /* =====================================================
       ACCOUNT TOAST
    ===================================================== */

    function showAikenAccountToast(
        title,
        message
    ) {

        if (
            typeof window.showToast ===
            "function"
        ) {

            window.showToast(
                title,
                message
            );

            return;

        }


        const toast =
            document.getElementById(
                "toast"
            );


        const toastTitle =
            document.getElementById(
                "toastTitle"
            );


        const toastMessage =
            document.getElementById(
                "toastMessage"
            );


        if (
            toast &&
            toastTitle &&
            toastMessage
        ) {

            toastTitle.textContent =
                title;

            toastMessage.textContent =
                message;

            toast.classList.add(
                "show"
            );

        }

    }


    /* =====================================================
       SWITCH ACCOUNT TAB
    ===================================================== */

    function switchAikenAccountTab(
        tabName
    ) {

        document
            .querySelectorAll(
                "[data-account-tab]"
            )
            .forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.accountTab ===
                        tabName
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-account-section]"
            )
            .forEach(
                section => {

                    section.classList.toggle(
                        "active",
                        section.dataset.accountSection ===
                        tabName
                    );

                }
            );


        if (
            tabName === "orders"
        ) {

            renderAikenCustomerOrders();

        }

    }


    /* =====================================================
       ORDER STATUS
    ===================================================== */

    function getAikenOrderStatus(
        order
    ) {

        const status =
            order &&
            (
                order.status ||
                order.orderStatus ||
                order.state
            );


        if (!status) {

            return "Pending";

        }


        return String(status)
            .trim()
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );

    }


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    function getAikenStatusClass(
        status
    ) {

        return String(status)
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );

    }


    /* =====================================================
       ORDER DATE
    ===================================================== */

    function getAikenOrderDate(
        order
    ) {

        const rawDate =
            order &&
            (
                order.date ||
                order.createdAt ||
                order.created ||
                order.timestamp
            );


        if (!rawDate) {

            return "Order date unavailable";

        }


        const date =
            new Date(rawDate);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return String(rawDate);

        }


        return date.toLocaleDateString(
            "en-KE",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       ORDER TOTAL
    ===================================================== */

    function getAikenCustomerOrderTotal(
        order
    ) {

        if (
            order &&
            typeof order.total ===
            "number"
        ) {

            return order.total;

        }


        if (
            order &&
            typeof order.totalPrice ===
            "number"
        ) {

            return order.totalPrice;

        }


        if (
            order &&
            typeof order.amount ===
            "number"
        ) {

            return order.amount;

        }


        if (
            order &&
            Array.isArray(order.items)
        ) {

            return order.items.reduce(
                (
                    total,
                    item
                ) => {

                    const price =
                        Number(
                            item.price
                        ) || 0;


                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;


                    return total +
                        (
                            price *
                            quantity
                        );

                },
                0
            );

        }


        return 0;

    }


    /* =====================================================
       ORDER NUMBER
    ===================================================== */

    function getAikenCustomerOrderNumber(
        order,
        index
    ) {

        if (
            order &&
            (
                order.orderNumber ||
                order.orderId ||
                order.id
            )
        ) {

            return String(
                order.orderNumber ||
                order.orderId ||
                order.id
            );

        }


        return (
            "AIKEN-" +
            String(
                index + 1
            ).padStart(
                5,
                "0"
            )
        );

    }


    /* =====================================================
       ORDER ITEMS
    ===================================================== */

    function getAikenCustomerOrderItems(
        order
    ) {

        if (
            !order ||
            !Array.isArray(
                order.items
            )
        ) {

            return [];

        }


        return order.items;

    }


    /* =====================================================
       RENDER ACCOUNT SUMMARY
    ===================================================== */

    function renderAikenAccountSummary(
        orders
    ) {

        const summary =
            document.getElementById(
                "aikenAccountSummary"
            );


        if (!summary) return;


        const totalOrders =
            orders.length;


        const totalSpent =
            orders.reduce(
                (
                    total,
                    order
                ) => {

                    return total +
                        getAikenCustomerOrderTotal(
                            order
                        );

                },
                0
            );


        const activeOrders =
            orders.filter(
                order => {

                    const status =
                        getAikenOrderStatus(
                            order
                        )
                        .toLowerCase();


                    return (
                        status !==
                            "delivered" &&
                        status !==
                            "cancelled"
                    );

                }
            ).length;


        summary.innerHTML = `

            <div class="aiken-summary-box">

                <div class="aiken-summary-icon">
                    📦
                </div>

                <div class="aiken-summary-number">
                    ${totalOrders}
                </div>

                <div class="aiken-summary-label">
                    Total Orders
                </div>

            </div>


            <div class="aiken-summary-box">

                <div class="aiken-summary-icon">
                    🚚
                </div>

                <div class="aiken-summary-number">
                    ${activeOrders}
                </div>

                <div class="aiken-summary-label">
                    Active Orders
                </div>

            </div>


            <div class="aiken-summary-box">

                <div class="aiken-summary-icon">
                    💰
                </div>

                <div class="aiken-summary-number">
                    ${formatMoney(
                        totalSpent
                    )}
                </div>

                <div class="aiken-summary-label">
                    Total Spent
                </div>

            </div>

        `;

    }


    /* =====================================================
       RENDER MY ORDERS
    ===================================================== */

    function renderAikenCustomerOrders() {

        const container =
            document.getElementById(
                "aikenCustomerOrders"
            );


        if (!container) return;


        const orders =
            getAikenCustomerOrders();


        renderAikenAccountSummary(
            orders
        );


        if (
            orders.length === 0
        ) {

            container.innerHTML = `

                <div class="aiken-orders-empty">

                    <div class="aiken-orders-empty-icon">
                        📦
                    </div>

                    <h3>
                        No orders yet
                    </h3>

                    <p>
                        Your completed and current orders will appear here.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            orders
                .slice()
                .reverse()
                .map(
                    (
                        order,
                        reversedIndex
                    ) => {

                        const originalIndex =
                            orders.length -
                            1 -
                            reversedIndex;


                        const orderNumber =
                            getAikenCustomerOrderNumber(
                                order,
                                originalIndex
                            );


                        const status =
                            getAikenOrderStatus(
                                order
                            );


                        const statusClass =
                            getAikenStatusClass(
                                status
                            );


                        const total =
                            getAikenCustomerOrderTotal(
                                order
                            );


                        const date =
                            getAikenOrderDate(
                                order
                            );


                        const items =
                            getAikenCustomerOrderItems(
                                order
                            );


                        let itemsHTML =
                            "";


                        if (
                            items.length > 0
                        ) {

                            itemsHTML =
                                items
                                    .slice(
                                        0,
                                        4
                                    )
                                    .map(
                                        item => {

                                            const itemName =
                                                item.name ||
                                                item.title ||
                                                "Product";


                                            const quantity =
                                                Number(
                                                    item.quantity
                                                ) || 1;


                                            return `

                                                <div
                                                    class="aiken-order-product-row"
                                                >

                                                    <span
                                                        class="aiken-order-product-name"
                                                    >
                                                        ${aikenAccountEscape(
                                                            itemName
                                                        )}
                                                    </span>

                                                    <span
                                                        class="aiken-order-product-qty"
                                                    >
                                                        ×${quantity}
                                                    </span>

                                                </div>

                                            `;

                                        }
                                    )
                                    .join("");



                            if (
                                items.length > 4
                            ) {

                                itemsHTML += `

                                    <div
                                        style="
                                            font-size:12px;
                                            color:#888;
                                            padding-top:4px;
                                        "
                                    >
                                        + ${
                                            items.length - 4
                                        } more item(s)
                                    </div>

                                `;

                            }

                        } else {

                            itemsHTML = `

                                <div
                                    class="aiken-order-product-row"
                                >

                                    <span
                                        class="aiken-order-product-name"
                                    >
                                        Order details available
                                    </span>

                                </div>

                            `;

                        }


                        return `

                            <article
                                class="aiken-order-card"
                            >

                                <div
                                    class="aiken-order-top"
                                >

                                    <div>

                                        <div
                                            class="aiken-order-number"
                                        >
                                            ${aikenAccountEscape(
                                                orderNumber
                                            )}
                                        </div>

                                        <div
                                            class="aiken-order-date"
                                        >
                                            ${aikenAccountEscape(
                                                date
                                            )}
                                        </div>

                                    </div>


                                    <div
                                        class="aiken-order-status ${aikenAccountEscape(
                                            statusClass
                                        )}"
                                    >
                                        ${aikenAccountEscape(
                                            status
                                        )}
                                    </div>

                                </div>


                                <div
                                    class="aiken-order-products"
                                >

                                    ${itemsHTML}

                                </div>


                                <div
                                    class="aiken-order-bottom"
                                >

                                    <div>

                                        <div
                                            class="aiken-order-total-label"
                                        >
                                            Order Total
                                        </div>

                                        <div
                                            class="aiken-order-total"
                                        >
                                            ${formatMoney(
                                                total
                                            )}
                                        </div>

                                    </div>


                                    <div
                                        class="aiken-order-actions"
                                    >

                                        <button
                                            type="button"
                                            class="aiken-order-action primary"
                                            data-aiken-track-order="${aikenAccountEscape(
                                                orderNumber
                                            )}"
                                        >
                                            Track Order
                                        </button>


                                        <button
                                            type="button"
                                            class="aiken-order-action"
                                            data-aiken-reorder="${aikenAccountEscape(
                                                orderNumber
                                            )}"
                                        >
                                            Reorder
                                        </button>

                                    </div>

                                </div>

                            </article>

                        `;

                    }
                )
                .join("");

    }


    /* =====================================================
       TRACK ORDER
       Uses the EXISTING tracking system.
    ===================================================== */

    function trackAikenCustomerOrder(
        orderNumber
    ) {

        if (!orderNumber) {

            return;

        }


        closeAikenAccount();


        setTimeout(
            function () {

                if (
                    typeof window.openOrderTracking ===
                    "function"
                ) {

                    window.openOrderTracking(
                        orderNumber
                    );

                    return;

                }


                if (
                    typeof window.trackAikenOrder ===
                    "function"
                ) {

                    window.trackAikenOrder(
                        orderNumber
                    );

                    return;

                }


                showAikenAccountToast(
                    "Tracking unavailable",
                    "The order tracking system could not be opened."
                );

            },
            180
        );

    }


    /* =====================================================
       REORDER
    ===================================================== */

    function reorderAikenCustomerOrder(
        orderNumber
    ) {

        const orders =
            getAikenCustomerOrders();


        const order =
            orders.find(
                item => {

                    const possibleNumber =
                        item.orderNumber ||
                        item.orderId ||
                        item.id;


                    return String(
                        possibleNumber
                    ) ===
                    String(
                        orderNumber
                    );

                }
            );


        if (!order) {

            showAikenAccountToast(
                "Order not found",
                "We couldn't find this order."
            );

            return;

        }


        const items =
            getAikenCustomerOrderItems(
                order
            );


        if (
            !Array.isArray(items) ||
            items.length === 0
        ) {

            showAikenAccountToast(
                "Unable to reorder",
                "This order does not contain product details."
            );

            return;

        }


        if (
            typeof window.addToCart !==
            "function"
        ) {

            showAikenAccountToast(
                "Cart unavailable",
                "Please refresh the page and try again."
            );

            return;

        }


        let added =
            0;


        items.forEach(
            item => {

                const productId =
                    item.id ||
                    item.productId;


                const quantity =
                    Number(
                        item.quantity
                    ) || 1;


                if (!productId) {

                    return;

                }


                const productExists =
                    Array.isArray(
                        window.products
                    )
                        ? window.products.some(
                            product =>
                                product.id ===
                                productId
                        )
                        : true;


                if (!productExists) {

                    return;

                }


                for (
                    let i = 0;
                    i < quantity;
                    i++
                ) {

                    window.addToCart(
                        productId
                    );

                }


                added++;

            }
        );


        if (added === 0) {

            showAikenAccountToast(
                "Products unavailable",
                "The products from this order are no longer available."
            );

            return;

        }


        showAikenAccountToast(
            "Added to cart",
            `${added} product(s) from your order were added to your cart.`
        );


        setTimeout(
            function () {

                if (
                    typeof window.openCart ===
                    "function"
                ) {

                    window.openCart();

                }

            },
            300
        );

    }


    /* =====================================================
       OPEN ACCOUNT
    ===================================================== */

    function openAikenAccount(
        startingTab = "profile"
    ) {

        const modal =
            createAikenAccountModal();


        fillAikenProfileForm();

        renderAikenCustomerOrders();

        switchAikenAccountTab(
            startingTab
        );


        modal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE ACCOUNT
    ===================================================== */

    function closeAikenAccount() {

        const modal =
            document.getElementById(
                "aikenCustomerAccountModal"
            );


        if (!modal) return;


        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       ACCOUNT HEADER BUTTON
       Capture listener prevents the OLD
       "Customer accounts are coming next"
       listener from firing.
    ===================================================== */

    const accountButton =
        document.getElementById(
            "accountBtn"
        );


    if (
        accountButton &&
        !window.__aikenAccountButtonReady
    ) {

        accountButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopImmediatePropagation();

                openAikenAccount(
                    "profile"
                );

            },
            true
        );


        window.__aikenAccountButtonReady =
            true;

    }


    /* =====================================================
       UPDATE HEADER ACCOUNT TEXT
    ===================================================== */

    function syncAikenAccountButton() {

        const button =
            document.getElementById(
                "accountBtn"
            );


        if (!button) return;


        const name =
            aikenCustomerAccount.name
                ? aikenCustomerAccount.name
                    .trim()
                    .split(/\s+/)[0]
                : "";


        /*
           We preserve the existing
           account button structure
           as much as possible.
        */

        const textNodes = [];


        button
            .childNodes
            .forEach(
                node => {

                    if (
                        node.nodeType ===
                        Node.TEXT_NODE
                    ) {

                        textNodes.push(
                            node
                        );

                    }

                }
            );


        if (name) {

            /*
               Only change visible text
               when the button uses plain
               text. This avoids destroying
               icons or nested HTML.
            */

            if (
                textNodes.length > 0
            ) {

                textNodes[
                    textNodes.length - 1
                ].textContent =
                    ` ${name}`;

            }

        }

    }


    /* =====================================================
       ORDER BUTTON EVENT DELEGATION
       One listener only.
    ===================================================== */

    if (
        !window.__aikenOrderAccountEvents
    ) {

        document.addEventListener(
            "click",
            function (event) {

                const trackButton =
                    event.target.closest(
                        "[data-aiken-track-order]"
                    );


                if (trackButton) {

                    event.preventDefault();

                    const orderNumber =
                        trackButton.dataset
                            .aikenTrackOrder;


                    trackAikenCustomerOrder(
                        orderNumber
                    );

                    return;

                }


                const reorderButton =
                    event.target.closest(
                        "[data-aiken-reorder]"
                    );


                if (reorderButton) {

                    event.preventDefault();

                    const orderNumber =
                        reorderButton.dataset
                            .aikenReorder;


                    reorderAikenCustomerOrder(
                        orderNumber
                    );

                    return;

                }

            }
        );


        window.__aikenOrderAccountEvents =
            true;

    }


    /* =====================================================
       KEEP ACCOUNT DETAILS CONNECTED
       TO CHECKOUT IF YOUR CHECKOUT FORM
       USES THE SAME INFORMATION.
    ===================================================== */

    window.aikenCustomerAccount =
        aikenCustomerAccount;


    window.getAikenCustomerAccount =
        function () {

            return {
                ...aikenCustomerAccount
            };

        };


    window.openAikenAccount =
        openAikenAccount;


    window.closeAikenAccount =
        closeAikenAccount;


    window.openMyAikenOrders =
        function () {

            openAikenAccount(
                "orders"
            );

        };


    window.renderAikenCustomerOrders =
        renderAikenCustomerOrders;


    /* =====================================================
       INITIAL ACCOUNT BUTTON SYNC
    ===================================================== */

    syncAikenAccountButton();


    /* =====================================================
       READY
    ===================================================== */

    console.log(
        "AIKEN Customer Account + My Orders ready."
    );


})();
/* =========================================
   AIKEN — FAST ADDED TO CART NOTIFICATION
   ========================================= */

(function () {
    const originalShowToast = window.showToast;

    if (typeof originalShowToast !== "function") return;

    window.showToast = function (title, message) {
        originalShowToast(title, message);

        setTimeout(() => {
            const toast = document.getElementById("toast");

            if (toast) {
                toast.classList.remove("show");
                toast.style.display = "";
                toast.style.opacity = "";
            }
        }, 1200);
    };
})();