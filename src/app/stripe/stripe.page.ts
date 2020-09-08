import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';
  stripeKey = 'pk_test_ZOS306v6VUm4b4FPpfsDcuvE00Gv7W5YXp';
  cardDetails: any = {};

  constructor(
    private stripe: Stripe,
    private http: HttpClient    
  ) {
    console.log('[constructor]');
  }

  ngOnInit() {
  }

  payWithStripe() {
    console.log('[payWithStripe]');

    this.stripe.setPublishableKey(this.stripeKey);

    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    };

    this.stripe.createCardToken(card)

      .then(token => {
        console.log('token id:', token.id);
        this.makePayment(token.id);
      })

      .catch(error => {
        console.error('error: ', error);
      });
    
  }

  makePayment(token) {
    console.log('[makePayment]');
    this.http
      .post('http://localhost:5000/stripeapp-d9e5f/us-central1/payWithStripe', {
        amount: 100,
        currency: "usd",
        token: token.id,
        source: token,
      })
      .subscribe(data => {
        console.log('data: ', data);
      });
  }

}
