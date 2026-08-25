// Calculate the amount of one product.
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Calculate the discount amount based on subtotal.
function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}


// Determine delivery fee using switch.
function getDeliveryFee(option) {
    switch (Number(option)) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}


// Allow Node.js autograder to access the required functions.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        calculateItemAmount,
        calculateDiscount,
        getDeliveryFee
    };
}


// Browser code.
if (typeof document !== "undefined") {

    const customerName =
        document.getElementById("customerName");

    const productCount =
        document.getElementById("productCount");

    const productsContainer =
        document.getElementById("productsContainer");

    const deliveryOption =
        document.getElementById("deliveryOption");

    const calculateBtn =
        document.getElementById("calculateBtn");

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");


    // Generate product fields.
    function generateProducts() {

        const count = Number(productCount.value);

        productsContainer.innerHTML = "";

        if (!Number.isInteger(count) || count <= 0) {
            return;
        }

        for (let i = 0; i < count; i++) {

            productsContainer.innerHTML += `
                <div class="product">
                    <h3>Product ${i + 1}</h3>

                    <label for="productName-${i}">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName-${i}"
                    >

                    <br><br>

                    <label for="productPrice-${i}">
                        Price
                    </label>
                    <input
                        type="number"
                        id="productPrice-${i}"
                        step="0.01"
                    >

                    <br><br>

                    <label for="productQuantity-${i}">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="productQuantity-${i}"
                    >

                    <br><br>
                </div>
            `;
        }
    }


    // Generate products when product count changes.
    productCount.addEventListener("input", generateProducts);


    // Calculate order.
    calculateBtn.addEventListener("click", function () {

        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        const name = customerName.value.trim();
        const count = Number(productCount.value);


        // Validate customer name.
        if (name === "") {
            validationMessage.textContent =
                "Please enter the Customer Name.";
            return;
        }


        // Validate product count.
        if (
            !Number.isFinite(count) ||
            count <= 0 ||
            !Number.isInteger(count)
        ) {
            validationMessage.textContent =
                "Please enter a valid positive number for Number of Products.";
            return;
        }


        // Make sure product fields exist.
        if (!document.getElementById("productName-0")) {
            generateProducts();
        }


        let subtotal = 0;
        let productDetails = "";


        // Required for loop.
        for (let i = 0; i < count; i++) {

            const nameInput =
                document.getElementById(`productName-${i}`);

            const priceInput =
                document.getElementById(`productPrice-${i}`);

            const quantityInput =
                document.getElementById(`productQuantity-${i}`);


            const productName =
                nameInput.value.trim();

            const price =
                Number(priceInput.value);

            const quantity =
                Number(quantityInput.value);


            // Validate product name.
            if (productName === "") {
                validationMessage.textContent =
                    `Please enter the Product Name for Product ${i + 1}.`;
                return;
            }


            // Validate price.
            if (
                !Number.isFinite(price) ||
                price <= 0
            ) {
                validationMessage.textContent =
                    `Please enter a valid positive Price for Product ${i + 1}.`;
                return;
            }


            // Validate quantity.
            if (
                !Number.isFinite(quantity) ||
                quantity <= 0
            ) {
                validationMessage.textContent =
                    `Please enter a valid positive Quantity for Product ${i + 1}.`;
                return;
            }


            // Calculate item amount.
            const amount =
                calculateItemAmount(price, quantity);


            // Accumulator.
            subtotal += amount;


            // Build product output.
            productDetails += `
                <p>
                    <strong>${i + 1}. ${productName}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${amount.toFixed(2)}
                </p>
            `;
        }


        // Calculate discount.
        const discount =
            calculateDiscount(subtotal);


        // Determine discount rate.
        let discountRate;

        if (subtotal >= 5000) {
            discountRate = 10;
        } else if (subtotal >= 3000) {
            discountRate = 7;
        } else if (subtotal >= 1000) {
            discountRate = 5;
        } else {
            discountRate = 0;
        }


        // Calculate delivery fee.
        const deliveryFee =
            getDeliveryFee(deliveryOption.value);


        // Determine delivery type.
        let deliveryType;

        switch (Number(deliveryOption.value)) {
            case 1:
                deliveryType = "Store Pickup";
                break;
            case 2:
                deliveryType = "Standard Delivery";
                break;
            case 3:
                deliveryType = "Express Delivery";
                break;
            default:
                deliveryType = "Unknown";
        }


        // Calculate final amount.
        const finalAmount =
            subtotal - discount + deliveryFee;


        // Display complete order summary.
        orderSummary.innerHTML = `
            <h2>MINI STORE CHECKOUT SYSTEM</h2>

            <p>
                <strong>Customer:</strong> ${name}
            </p>

            ${productDetails}

            <h3>ORDER SUMMARY</h3>

            <p>
                Subtotal: ₱${subtotal.toFixed(2)}<br>
                Discount Rate: ${discountRate}%<br>
                Discount Amount: ₱${discount.toFixed(2)}<br>
                Delivery Type: ${deliveryType}<br>
                Delivery Fee: ₱${deliveryFee.toFixed(2)}<br>
                <strong>
                    Final Amount: ₱${finalAmount.toFixed(2)}
                </strong>
            </p>
        `;
    });
}
