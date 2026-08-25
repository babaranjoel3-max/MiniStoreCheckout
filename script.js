// Calculate the amount for one product
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Calculate the discount based on the subtotal
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


// Determine the delivery fee using a switch statement
function getDeliveryFee(option) {
    switch (option) {
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}


// Get required HTML elements
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");


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

                    <br><br>

                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" step="0.01">

                    <br><br>

                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}">

                    <br><br>
                </div>
            `;
        }
    }
});


// Calculate the order
calculateBtn.addEventListener("click", function () {

    const customerName =
        document.getElementById("customerName").value.trim();

    const productCount =
        Number(productCountInput.value);

    const deliveryOption =
        document.getElementById("deliveryOption").value;

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");


    validationMessage.textContent = "";
    orderSummary.innerHTML = "";


    // Validate customer name
    if (customerName === "") {
        validationMessage.textContent =
            "Please enter the Customer Name.";
        return;
    }


    // Validate product count
    if (!Number.isInteger(productCount) || productCount <= 0) {
        validationMessage.textContent =
            "Please enter a valid positive number for Number of Products.";
        return;
    }


    // Accumulator for subtotal
    let subtotal = 0;

    // Store product output
    let productsOutput = "";


    // Process each product using a for loop
    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);


        // Validate product name
        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;
            return;
        }


        // Validate price
        if (price <= 0 || !Number.isFinite(price)) {
            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;
            return;
        }


        // Validate quantity
        if (quantity <= 0 || !Number.isFinite(quantity)) {
            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;
            return;
        }


        // Calculate item amount
        const itemAmount =
            calculateItemAmount(price, quantity);


        // Add item amount to subtotal
        subtotal += itemAmount;


        // Build product details
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
    const discount =
        calculateDiscount(subtotal);


    // Determine discount rate
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


    // Get delivery fee
    const deliveryFee =
        getDeliveryFee(deliveryOption);


    // Determine delivery type
    let deliveryType;

    if (deliveryOption === "1") {
        deliveryType = "Store Pickup";
    } else if (deliveryOption === "2") {
        deliveryType = "Standard Delivery";
    } else {
        deliveryType = "Express Delivery";
    }


    // Calculate final amount
    const finalAmount =
        subtotal - discount + deliveryFee;


    // Display complete order summary
    orderSummary.innerHTML = `
        <h2>MINI STORE CHECKOUT SYSTEM</h2>

        <p>
            Customer: ${customerName}
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
