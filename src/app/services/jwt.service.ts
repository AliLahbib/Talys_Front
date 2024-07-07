import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:9090/';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private http: HttpClient) {}
  register(signRequest: any): Observable<any> {
    console.log('register++++', signRequest);
    return this.http.post(BASE_URL + 'signup', signRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest);
  }
}
