const stripe = Stripe('pk_test_M4lUHJesnz3f9gWbUJzdncMV');

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');
const cardholderName = document.getElementById('cardholder-name');
const cardButton = document.getElementById('card-button');

cardButton.addEventListener('click', async (ev) => {
  console.log("Submit Clicked");
  var email = document.getElementById('email').value;
  var tel = document.getElementById('tel').value;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;
  var donationamount = $("input[name=donation-amount]:checked").val();
  var subscription = document.getElementById("subscription").checked;
  var membership = document.getElementById("membership").checked;

  const {paymentMethod, error} =
    await stripe.createPaymentMethod('card', cardElement, {
      billing_details: {name: cardholderName.value}
    });
  if (error) {
    // console.log(result.error.message);
    // var errorElement = document.getElementById('card-errors');
    // errorElement.textContent = result.error.message;
  } else {
    // Send paymentMethod.id to your server (see Step 2)
    var fullbody = JSON.stringify({donationamount : donationamount, subscription : subscription, email : email, tel : tel, address: address, city : city, state : state, membership : membership, payment_method_id: paymentMethod.id});
      console.log(fullbody);

    const response = await fetch('https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: fullbody
    });

    const json = await response.json();

    // Handle server response (see Step 3)
    handleServerResponse(json);
  }
});


const handleServerResponse = async (response) => {
  if (response.error) {
    // Show error from server on payment form
    console.log(response.error);
  } else if (response.requires_action) {
    // Use Stripe.js to handle the required card action
    const { error: errorAction, paymentIntent } =
      await stripe.handleCardAction(response.payment_intent_client_secret);

    if (errorAction) {
      // Show error from Stripe.js in payment form
    } else {
      // The card action has been handled
      // The PaymentIntent can be confirmed again on the server
      const serverResponse = await fetch('https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_intent_id: paymentIntent.id })
      });
      handleServerResponse(await serverResponse.json());
    }
  } else {
    // Show success message
    // console.log("Success Message at End");
  }
}
