import { Component } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private stripe: Stripe) {
    console.log('caca home');
    
    
  }
  
  botonEnviar() {

    this.stripe.setPublishableKey('pk_test_ZOS306v6VUm4b4FPpfsDcuvE00Gv7W5YXp');

    console.log('[botonEnviar] Stripe pago');

    let card = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2020,
    cvc: '220'
    }

    this.stripe.createCardToken(card)

      .then(token => console.log('token id:', token.id, 'token: ', token))

      .catch(error => console.error('error: ', error));
    
  }
  

}
