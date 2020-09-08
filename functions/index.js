const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51GnTeoBEIECkI9TFsGaVZjL06pZxJsj5f1qowYaviE5ZnjoIJAEOSPc4AJeRjk5J6LdnfFu4tsDjWCLcHlmub4PB00nhJ3Kr74');

const customer = stripe.customers.create({
    email: 'josuebonito1993@gmail.com',
  });

exports.payWithStripe = functions.https.onRequest((request, response) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys

  // eslint-disable-next-line promise/catch-or-return
  stripe.charges.create({
      amount: request.body.amount,
      currency: request.body.currency,
      source: request.body.token,
      customer: customer,
  }).then((charge) => {
          // asynchronously called
          response.send(charge);
          return null;
      })
      .catch(err =>{
          console.log(err);
      });

});
