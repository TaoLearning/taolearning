var stripe = Stripe('pk_test_M4lUHJesnz3f9gWbUJzdncMV');
var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');

var cardholderName = document.getElementById('cardholder-name');
var cardButton = document.getElementById('card-button');


cardButton.addEventListener('click', function(ev) {
  console.log("Submit Clicked");
  var email = document.getElementById('email').value;
  var tel = document.getElementById('tel').value;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var donationamount = $("input[name=donation-amount]:checked").val();
  var subscription = document.getElementById("subscription").checked;
  var membership = document.getElementById("membership").checked;
  stripe.createPaymentMethod('card', cardElement, {
    billing_details: {name: cardholderName.value}
  }).then(function(result) {
    if (result.error) {
      console.log("Error");
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      console.log("Send Payment Method to Server");
      // Otherwise send paymentMethod.id to your server (see Step 2)
      var myHeaders = new Headers();
      var fullbody = JSON.stringify({donationamount : donationamount, subscription : subscription, email : email, tel : tel, address: address, city : city, state : state, membership : membership, payment_method_id: result.paymentMethod.id});
      console.log(fullbody);
      fetch('https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==', {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        body: fullbody
      }).then(function(result) {
        console.log("Handle Server Response");
        // Handle server response (see Step 3)
        console.log(result);
        result.json().then(function(json) {
          console.log("Made it Inside JSON Result");
          handleServerResponse(json);
        })
      });
    }
  });
});


function handleServerResponse(response) {
  if (response.error) {
    console.log("Made a lasting error");
    // Show error from server on payment form
    var errorElement = document.getElementById('card-errors');
    errorElement.textContent = result.error.message;
  } else if (response.requires_action) {
    console.log("Stripe Action");
    // Use Stripe.js to handle required card action
    stripe.handleCardAction(
      response.payment_intent_client_secret
    ).then(function(result) {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        console.log("Payment Handled and Can be Confirmed Again");
        var myHeaders = new Headers();
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        fetch('https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==', {
          method: 'POST',
          headers: myHeaders,
          cache: 'default',
          body: JSON.stringify({ payment_intent_id: result.paymentIntent.id })
        }).then(function(confirmResult) {
          return confirmResult.json();
        }).then(handleServerResponse);
      }
    });
  } else {
    console.log("Success Message at End");
    // Show success message
  }
}