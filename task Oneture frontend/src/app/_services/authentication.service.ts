import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public token: string;
  public headers: HttpHeaders;
  public readonly apiUrl = environment.apiUrl;
  public readonly baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) {
  }
  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json'
     })
  };


login(userName: string, password: string): Observable<any> {
    var raw = JSON.stringify({ userName: userName, password: password });
    //console.log(raw);
    return this.http.post(this.apiUrl+"login", JSON.parse(raw)).pipe(map((response: Response) => {
               return response;
            })
            );
  }


// getDashboard(): Observable<any> {

//   var token =  sessionStorage.getItem('token');
//   var header = {
//     headers: new HttpHeaders()
//      .set('x-access-token',  `Bearer ${token}`)
//   }

//   return this.http.get(this.apiUrl+"getDashboard",header)
//       .pipe(
//           map((response: Response) => {
//              console.log(response);
//              return response;
//           })
//       );
// }

// getProductList(): Observable<any> {

//   var token =  sessionStorage.getItem('token');
//   var header = {
//     headers: new HttpHeaders()
//      .set('x-access-token',  `Bearer ${token}`)
//   }

//   return this.http.get(this.apiUrl+"product",header)
//       .pipe(
//           map((response: Response) => {
//              console.log(response);
//              return response;
//           })
//       );
// }

}
