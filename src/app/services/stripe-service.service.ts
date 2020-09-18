import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  async successToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se hizo el pago de forma exitosa',
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

  realizaPago(token) {
    console.log('[realizaPago]');
    console.log('[realizaPago] token: ', token);
    
    return new Promise ( resolve => {
      this.http.post('http://localhost:8100/api/makePayment', token).subscribe( resp => {
        console.log('[realizaPago] resp: ', resp);
        if(resp['status'] == 'succeeded'){
          console.log('[realizaPago] succeeded');
          this.successToast();
          resolve(true);
        } else { 
          console.log('[realizaPago] else');
          resolve(false);
        }
      });
    });
    
  }
  
}
