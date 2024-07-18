import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardDetails } from '../models/card-details.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CardDetailsService {
  private apiUrl = 'http://localhost:9090/card';
   
  constructor(private http: HttpClient) {}

  getAll(): Observable<CardDetails[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<CardDetails[]>(this.apiUrl, { headers });
  }

  getById(cardId: string): Observable<CardDetails> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<CardDetails>(`${this.apiUrl}/${cardId}`, { headers });
  }

  create(cardDetails: CardDetails): Observable<CardDetails> {
    const headers = this.createAuthorizationHeader();
    console.log("cardDetails", cardDetails);
    return this.http.post<CardDetails>(this.apiUrl, cardDetails, { headers });
  }

  update(cardId: string, cardDetails: CardDetails): Observable<CardDetails> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<CardDetails>(`${this.apiUrl}/${cardId}`, cardDetails, { headers });
  }

  delete(cardId: string): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/${cardId}`, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
      return new HttpHeaders(); // Retourne un HttpHeaders vide si le token n'est pas trouvé
    }
  }
}
