const stripe = Stripe('pk_test_M4lUHJesnz3f9gWbUJzdncMV');
const fetchlink = 'https://stripedonate.azurewebsites.net/api/StripeHttpTrigger?code=/xlyHNsnNnqie7yQTDf0fVgPAGaC/D259rKok9dNWRraEIX8MhX5yg==';

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');
const cardholderName = document.getElementById('cardholder-name');
const cardButton = document.getElementById('card-button');
var errorElement = document.getElementById('card-errors');

cardButton.addEventListener('click', async (ev) => {
var email = document.getElementById('email').value;
var tel = document.getElementById('tel').value;
var address = document.getElementById('address').value;
var city = document.getElementById('city').value;
var state = document.getElementById('state').value;
var totalamount = parseInt($("input[name=donation-amount]:checked").val());
var subscription = document.getElementById("subscription").checked;
var membership = document.getElementById("membership").checked;

  // console.log("Submit Clicked");
  const {paymentMethod, error} =
  await stripe.createPaymentMethod('card', cardElement, {
    billing_details: {name: cardholderName.value}
  });
  if (error) {
  $("#card-errors").fadeIn();
  // console.log(error.message);
  errorElement.textContent = error.message;
  } else {
  $("#card-errors").fadeOut();
  // console.log("Send Payment Stringify to Server");
  var fullbody = JSON.stringify({totalamount : totalamount, subscription : subscription, email : email, tel : tel, address: address, city : city, state : state, membership : membership, payment_method_id: paymentMethod.id});
  console.log(fullbody);

  const response = await fetch(fetchlink, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: fullbody
  });

  const json = await response.json();

  handleServerResponse(json);
  }
});


const handleServerResponse = async (response) => {
  if (response.error) {
    $("#card-errors").fadeIn();
    // console.log(response.error.message);
    errorElement.textContent = response.error.message;
  } else if (response.requires_action) {
    const { error: errorAction, paymentIntent } =
    await stripe.handleCardAction(response.payment_intent_client_secret);

    if (errorAction) {
    // console.log(errorAction.message);
    $("#card-errors").fadeIn();
    errorElement.textContent = errorAction.message;
    } else {
      // console.log("Send Payment (again) Stringify to Server");

      const serverResponse = await fetch(fetchlink, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_intent_id: paymentIntent.id })
      });
      

      handleServerResponse(await serverResponse.json());
    }
  } else {
    // console.log("Payment Successful");
    window.location.replace("thankyou.html?name=" + cardholderName + "&amount=" + totalamount + "&membership=" + membership + "&subscription=" + subscription);
  }
}