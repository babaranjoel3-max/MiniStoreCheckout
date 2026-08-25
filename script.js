// Required function 1
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Required function 2
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


// Required function 3
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


// Get HTML elements
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");


// Generate product inputs using a for loop
productCountInput.addEventListener("input", function () {

    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";

    if (productCount > 0 && Number.isInteger(productCount)) {

        for (let i = 0; i < productCount; i++) {

            productsContainer.innerHTML += `
                <div>
                    <h3>Product ${i + 1}</h3>

                    <label for="productName-${i}">Product Name</label>
                    <input type="text" id="productName-${i}">

                    <br>

                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" step="0.01">

                    <br>

                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}">

                    <br><br>
                </div>
            `;
        }
    }
});


// Calculate order when button is clicked
document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCountInput.value);
    const deliveryOption = document.getElementById("deliveryOption").value;

    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    // Clear previous messages
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";


    // Validate customer name
    if (customerName === "") {
        validationMessage.textContent = "Please enter the Customer Name.";
        return;
    }


    // Validate product count
    if (!Number.isInteger(productCount) || productCount <= 0) {
        validationMessage.textContent = "Please enter a valid positive Number of Products.";
        return;
    }


    let subtotal = 0;
    let productsOutput = "";


    // Process products using the required for loop
    for (let i = 0; i < productCount; i++) {

        const productName = document.getElementById(`productName-${i}`).value.trim();
        const price = Number(document.getElementById(`productPrice-${i}`).value);
        const quantity = Number(document.getElementById(`productQuantity-${i}`).value);


        // Validate product name
        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;
            return;
        }


        // Validate price
        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;
            return;
        }


        // Validate quantity
        if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;
            return;
        }


        // Calculate item amount
        const itemAmount = calculateItemAmount(price, quantity);


        // Accumulator
        subtotal += itemAmount;


        // Build product output
        productsOutput += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }


    // Calculate discount
    const discount = calculateDiscount(subtotal);


    // Determine discount rate for display
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


    // Determine delivery type
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


    // Final amount
    const finalAmount = subtotal - discount + deliveryFee;


    // Display complete order summary
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
