import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

  paymentAmount: string = '100';
  currency: string = 'MXN';
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
        console.log('[makePayment] token: ', token);
        console.log('[makePayment] token id:', token.id);
        this.makePayment(token);
      })

      .catch(error => {
        console.error('error: ', error);
      });
    
  }

  makePayment(token) {
    console.log('[makePayment]');
    this.http
      .post('localhost:8000/api/store', {
        amount: 100,
        currency: "MXN",
        token: token,
        source: token.id,
      })
      .subscribe(data => {
        console.log('[makePayment] status');
        console.log('data: ', data);
      });
  }

}
