function calculateItemAmount(price, quantity) {
    return price * quantity;
}

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


// Make the required functions available to Node.js autograders.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        calculateItemAmount,
        calculateDiscount,
        getDeliveryFee
    };
}


if (typeof document !== "undefined") {

    const customerNameInput = document.getElementById("customerName");
    const productCountInput = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const deliveryOption = document.getElementById("deliveryOption");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");


    productCountInput.addEventListener("input", function () {

        const productCount = Number(productCountInput.value);

        productsContainer.innerHTML = "";

        if (productCount > 0 && Number.isInteger(productCount)) {

            for (let i = 0; i < productCount; i++) {

                const productDiv = document.createElement("div");

                productDiv.innerHTML = `
                    <h3>Product ${i + 1}</h3>

                    <label for="productName-${i}">Product Name</label>
                    <input type="text" id="productName-${i}">

                    <br>

                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" step="0.01">

                    <br>

                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}" step="0.01">

                    <br><br>
                `;

                productsContainer.appendChild(productDiv);
            }
        }
    });


    calculateBtn.addEventListener("click", function () {

        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        const customerName = customerNameInput.value.trim();
        const productCount = Number(productCountInput.value);


        // Customer name validation.
        if (customerName === "") {
            validationMessage.textContent =
                "Please enter the Customer Name.";
            return;
        }


        // Product count validation.
        if (!Number.isFinite(productCount) ||
            productCount <= 0 ||
            !Number.isInteger(productCount)) {

            validationMessage.textContent =
                "Please enter a valid positive number for Number of Products.";
            return;
        }


        let subtotal = 0;
        let productsOutput = "";


        // Process every product using a for loop.
        for (let i = 0; i < productCount; i++) {

            const productName =
                document.getElementById(`productName-${i}`).value.trim();

            const price =
                Number(document.getElementById(`productPrice-${i}`).value);

            const quantity =
                Number(document.getElementById(`productQuantity-${i}`).value);


            // Product name validation.
            if (productName === "") {
                validationMessage.textContent =
                    `Please enter the Product Name for Product ${i + 1}.`;
                return;
            }


            // Price validation.
            if (!Number.isFinite(price) || price <= 0) {
                validationMessage.textContent =
                    `Please enter a valid positive Price for Product ${i + 1}.`;
                return;
            }


            // Quantity validation.
            if (!Number.isFinite(quantity) || quantity <= 0) {
                validationMessage.textContent =
                    `Please enter a valid positive Quantity for Product ${i + 1}.`;
                return;
            }


            const itemAmount =
                calculateItemAmount(price, quantity);


            // Accumulator.
            subtotal += itemAmount;


            productsOutput += `
                <p>
                    <strong>${i + 1}. ${productName}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
            `;
        }


        const discount =
            calculateDiscount(subtotal);


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


        const selectedOption = deliveryOption.value;
        const deliveryFee = getDeliveryFee(selectedOption);


        let deliveryType;

        switch (Number(selectedOption)) {
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


        const finalAmount =
            subtotal - discount + deliveryFee;


        orderSummary.innerHTML = `
            <h2>MINI STORE CHECKOUT SYSTEM</h2>

            <p>
                <strong>Customer:</strong> ${customerName}
            </p>

            ${productsOutput}

            <h3>ORDER SUMMARY</h3>

            <p>
                Subtotal: ₱${subtotal.toFixed(2)}<br>
                Discount Rate: ${discountRate}%<br>
                Discount Amount: ₱${discount.toFixed(2)}<br>
                Delivery Type: ${deliveryType}<br>
                Delivery Fee: ₱${deliveryFee.toFixed(2)}<br>
                <strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong>
            </p>
        `;
    });
}
