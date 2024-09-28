document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const closeButton = document.querySelector('.close-button');
    const openBookingButton = document.querySelector('.book-button');
    const discountPopup = document.getElementById('discount-popup');
    const closeDiscountButton = document.querySelector('.close-discount-button');

    // Open booking form
    openBookingButton.addEventListener('click', function() {
        bookingForm.style.display = 'block';
    });

    // Close booking form
    closeButton.addEventListener('click', function() {
        bookingForm.style.display = 'none';
    });

    // Close discount popup
    closeDiscountButton.addEventListener('click', function() {
        discountPopup.style.display = 'none';
    });

    // Handle booking form submission
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = document.getElementById('people').value;

        if (name && date && time && people) {
            document.getElementById('payment-message').style.display = 'block';
            document.getElementById('payment-button').style.display = 'block';
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Handle payment button click
    document.getElementById('payment-button').addEventListener('click', function() {
        alert('Payment of ₹500/- successful! Your table is booked.');
        bookingForm.style.display = 'none'; // Close the booking form after payment
    });

    // Show discount popup on page load
    setTimeout(function() {
        discountPopup.style.display = 'block';
    }, 2000); // Show after 2 seconds
});
 
// Get modal element
const paymentModal = document.getElementById("paymentModal");

// Get all order buttons
const orderButtons = document.querySelectorAll("#checkout-button");

// Get close button
const closeModal = document.querySelector(".close");

// Function to open payment modal
orderButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Get the amount from the button's text
        const amountText = this.textContent;
        const amount = amountText.match(/(\d+)/)[0]; // Extract the price
        document.getElementById("amount").value = amount; // Set amount in payment form

        paymentModal.style.display = "block"; // Show the modal
    });
});

// Close modal when user clicks on <span> (x)
closeModal.onclick = function() {
    paymentModal.style.display = "none";
}

// Close modal when user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === paymentModal) {
        paymentModal.style.display = "none";
    }
}

// Handle payment form submission
document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Implement payment logic here
    const cardNumber = document.getElementById("cardNumber").value;
    const cardExpiry = document.getElementById("cardExpiry").value;
    const cardCVC = document.getElementById("cardCVC").value;
    const amount = document.getElementById("amount").value;

    if (cardNumber && cardExpiry && cardCVC) {
        alert(`Payment of ₹${amount} successful!`);
        paymentModal.style.display = "none"; // Close the modal after payment
        // Reset the form
        document.getElementById("paymentForm").reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});
// Add event listeners to UPI options
const upiImages = document.querySelectorAll('.upi-options img');

upiImages.forEach((img) => {
    img.addEventListener('click', () => {
        const upiMethod = img.alt; // Get the alt text as UPI method
        alert(`You selected to pay with ${upiMethod}`);
        // Implement the payment logic here for UPI
    });
});
// Example discount codes
const discountCodes = {
    "FESTIVE20": 20, // 20% discount
    "SAVE10": 10,    // 10% discount
};

// Handle payment form submission
document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect payment details
    const cardNumber = document.getElementById("cardNumber").value;
    const cardExpiry = document.getElementById("cardExpiry").value;
    const cardCVC = document.getElementById("cardCVC").value;
    const discountCodeInput = document.getElementById("discountCode").value;

    let amount = parseInt(document.getElementById("amount").value);
    let discount = 0;

    // Check if the entered discount code is valid
    if (discountCodes[discountCodeInput]) {
        discount = discountCodes[discountCodeInput]; // Get discount percentage
        const discountAmount = (amount * discount) / 100; // Calculate discount amount
        amount -= discountAmount; // Subtract discount from total amount
        alert(`Discount applied: ${discount}%`);
    }

    // Show the final amount after applying the discount
    alert(`Final Amount to be paid: ₹${amount}`);

    // Mock payment process
    const isPaymentSuccess = mockPayment(cardNumber, cardExpiry, cardCVC, amount);

    if (isPaymentSuccess) {
        alert(`Payment of ₹${amount} successful!`);
        document.getElementById("paymentModal").style.display = "none"; // Close the modal after payment
        // Reset the form
        document.getElementById("paymentForm").reset();
    } else {
        alert("Payment failed. Please check your card details and try again.");
    }
});

// Mock payment function to simulate payment processing
function mockPayment(cardNumber, cardExpiry, cardCVC, amount) {
    // Simulate a success or failure response
    if (cardNumber && cardExpiry && cardCVC && amount > 0) {
        return Math.random() > 0.2; // 80% chance of success
    }
    return false; // Payment fails if details are missing
}

// Add event listeners to UPI options
upiImages.forEach((img) => {
    img.addEventListener('click', () => {
        const upiMethod = img.alt; // Get the alt text as UPI method
        alert(`You selected to pay with ${upiMethod}`);

        // Mock UPI payment processing
        const isUPIPaymentSuccess = mockUPIPayment(upiMethod, amount);

        if (isUPIPaymentSuccess) {
            alert(`Payment of ₹${amount} via ${upiMethod} successful!`);
            document.getElementById("paymentModal").style.display = "none"; // Close the modal after payment
        } else {
            alert("UPI payment failed. Please try again.");
        }
    });
});

// Mock UPI payment function to simulate UPI processing
function mockUPIPayment(upiMethod, amount) {
    // Simulate a success or failure response for UPI
    if (upiMethod && amount > 0) {
        return Math.random() > 0.2; // 80% chance of success
    }
    return false; // Payment fails if method is not provided
}
// Function to open UPI app
function openUPIApp(app) {
    const upiId = 'yourupi@upi'; // Replace with actual UPI ID
    const amount = '500'; // Replace with the actual amount to be paid

    let uri;

    // UPI URI structure based on selected app
    switch (app) {
        case 'googlepay':
            uri = `upi://pay?pa=${upiId}&pn=RestaurantName&mc=YourMerchantCode&tid=TransactionID&tn=PaymentForBooking&am=${amount}&cu=INR&url=yoururl`;
            break;
        case 'phonepe':
            uri = `upi://pay?pa=${upiId}&pn=RestaurantName&mc=YourMerchantCode&tid=TransactionID&tn=PaymentForBooking&am=${amount}&cu=INR&url=yoururl`;
            break;
        case 'paytm':
            uri = `upi://pay?pa=${upiId}&pn=RestaurantName&mc=YourMerchantCode&tid=TransactionID&tn=PaymentForBooking&am=${amount}&cu=INR&url=yoururl`;
            break;
        default:
            showMessage('Unsupported payment method. Please select a valid option.');
            return;
    }

    // Attempt to open the UPI app
    window.open(uri, '_self');

    // Simulate payment confirmation (for testing purposes only)
    setTimeout(() => {
        showMessage('Payment successful! Thank you for your order.');
    }, 3000); // Simulated delay for demonstration
}

// Function to display messages
function showMessage(message) {
    const messageDiv = document.getElementById('payment-message');
    const messageText = document.getElementById('message-text');

    messageText.innerText = message;
    messageDiv.style.display = 'block';
}

let totalAmount = 1000; // Example total amount
let discountRate = 0; // Initial discount rate

// Function to apply discount
function applyDiscount() {
    const promoCodeInput = document.getElementById('promo-code').value;
    const discountMessage = document.getElementById('discount-message');

    // Example promo codes and their discount rates
    const promoCodes = {
        'FESTIVE10': 0.10,  // 10% discount
        'SAVE20': 0.20      // 20% discount
    };

    if (promoCodes[promoCodeInput] !== undefined) {
        discountRate = promoCodes[promoCodeInput];
        const discountAmount = totalAmount * discountRate;
        const finalAmount = totalAmount - discountAmount;

        discountMessage.style.display = 'block';
        discountMessage.innerText = `Discount Applied: ${discountAmount.toFixed(2)} INR`;
        document.getElementById('amount').innerText = finalAmount.toFixed(2);
    } else {
        discountMessage.style.display = 'block';
        discountMessage.innerText = 'Invalid Promo Code';
    }
}
