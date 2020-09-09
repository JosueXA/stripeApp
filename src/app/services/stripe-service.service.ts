import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  realizaPago(token) {
    console.log('[realizaPago]');
    console.log('[realizaPago] token: ', token);
    return new Promise ( resolve => {
      this.http.post('http://localhost:8100/api/store', token).subscribe( resp => {
        console.log('[realizaPago] resp: ', resp);
        if(resp['status'] == 'succeeded'){
          console.log('[realizaPago] succeeded');
          resolve(true);
        } else { 
          console.log('[realizaPago] else');
          resolve(false);
        }
      });
    })
  }
  
}
