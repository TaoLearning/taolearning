var stripe = Stripe('pk_test_M4lUHJesnz3f9gWbUJzdncMV');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');


var cardholderName = document.getElementById('cardholder-name');
var cardButton = document.getElementById('card-button');

cardButton.addEventListener('click', function(ev) {
  stripe.createPaymentMethod('card', cardElement, {
    billing_details: {name: cardholderName.value}
  }).then(function(result) {
    if (result.error) {
      console.log("Error");
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
      // Show error in payment form
    } else {
      console.log("Send Payment");
      // Otherwise send paymentMethod.id to your server (see Step 2)
      fetch('https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_method_id: result.paymentMethod.id })
      }).then(function(result) {
        // Handle server response (see Step 3)
        result.json().then(function(json) {
          handleServerResponse(json);
        })
      });
    }
  });
});
