import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { StripeServiceService } from '../services/stripe-service.service';
import { ToastController } from '@ionic/angular';

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
    private stripeSrv: StripeServiceService,
    private toastCtrl: ToastController
  ) {
    console.log('[constructor]');
  }

  ngOnInit() {
  }

  async successToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha realizo el pago de forma exitosa',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async errorToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
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
        console.log('[payWithStripe][createCardToken] token:' , token);
        console.log('[payWithStripe][createCardToken] token id:', token.id);
        this.makePayment(token);
      })

      .catch(error => {
        this.errorToast(error);; 
        console.error('error: ', error);
      });
    
  }

  makePayment(token) {
    console.log('[makePayment]');
    console.log('[makePayment] token: ', token);
    this.stripeSrv.realizaPago(token);
  }

}
