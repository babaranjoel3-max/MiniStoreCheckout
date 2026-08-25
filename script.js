// Calculate the amount for one product
function calculateItemAmount(price, quantity) {
    return price * quantity;
}

// Calculate the discount amount based on the subtotal
function calculateDiscount(subtotal) {
    let discountRate;

    if (subtotal >= 5000) {
        discountRate = 0.10;
    } else if (subtotal >= 3000) {
        discountRate = 0.07;
    } else if (subtotal >= 1000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    return subtotal * discountRate;
}

// Determine the delivery fee using a switch statement
function getDeliveryFee(option) {
    let fee;

    switch (option) {
        case "1":
            fee = 0;
            break;

        case "2":
            fee = 80;
            break;

        case "3":
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}

// Get the required elements from the HTML
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");

// Generate product input fields
productCountInput.addEventListener("input", function () {
    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";

    if (productCount > 0) {
        for (let i = 0; i < productCount; i++) {

            const productDiv = document.createElement("div");
            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input
                    type="text"
                    id="productName-${i}"
                    placeholder="Enter product name"
                >

                <label for="productPrice-${i}">Price</label>
                <input
                    type="number"
                    id="productPrice-${i}"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                >

                <label for="productQuantity-${i}">Quantity</label>
                <input
                    type="number"
                    id="productQuantity-${i}"
                    min="1"
                    placeholder="Enter quantity"
                >
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});

// Calculate the order
calculateBtn.addEventListener("click", function () {

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCountInput.value);
    const deliveryOption = document.getElementById("deliveryOption").value;

    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    // Validate customer name
    if (customerName === "") {
        validationMessage.textContent = "Please enter the Customer Name.";
        return;
    }

    // Validate product count
    if (!Number.isFinite(productCount) || productCount <= 0 || !Number.isInteger(productCount)) {
        validationMessage.textContent = "Please enter a valid positive whole number for Number of Products.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    // Process each product using a for loop
    for (let i = 0; i < productCount; i++) {

        const productName = document.getElementById(`productName-${i}`).value.trim();
        const price = Number(document.getElementById(`productPrice-${i}`).value);
        const quantity = Number(document.getElementById(`productQuantity-${i}`).value);

        // Validate product name
        if (productName === "") {
            validationMessage.textContent = `Please enter the Product Name for Product ${i + 1}.`;
            return;
        }

        // Validate price
        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent = `Please enter a valid positive Price for Product ${i + 1}.`;
            return;
        }

        // Validate quantity
        if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
            validationMessage.textContent = `Please enter a valid positive whole number for Quantity of Product ${i + 1}.`;
            return;
        }

        // Calculate item amount
        const itemAmount = calculateItemAmount(price, quantity);

        // Add item amount to subtotal accumulator
        subtotal += itemAmount;

        // Build product details
        productDetails += `
            <div>
                <strong>${i + 1}. ${productName}</strong><br>
                &nbsp;&nbsp;&nbsp;Price: ₱${price.toFixed(2)}<br>
                &nbsp;&nbsp;&nbsp;Quantity: ${quantity}<br>
                &nbsp;&nbsp;&nbsp;Amount: ₱${itemAmount.toFixed(2)}
            </div>
            <br>
        `;
    }

    // Calculate discount
    const discount = calculateDiscount(subtotal);

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

    // Calculate delivery fee
    const deliveryFee = getDeliveryFee(deliveryOption);

    let deliveryType;

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;

        case "2":
            deliveryType = "Standard Delivery";
            break;

        case "3":
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Store Pickup";
    }

    // Calculate final amount
    const finalAmount = subtotal - discount + deliveryFee;

    // Display complete order summary
    orderSummary.innerHTML = `
        <div class="summary-title">MINI STORE CHECKOUT SYSTEM</div>

        <p>
            <strong>Customer:</strong> ${customerName}
        </p>

        ${productDetails}

        <hr>

        <div class="summary-title">ORDER SUMMARY</div>

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
