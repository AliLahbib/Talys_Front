import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OCRService {

  private uploadUrl = 'http://localhost:5000/ReadPDF'; // URL du serveur Flask

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur lors du téléchargement du fichier', error);
    return throwError('Une erreur est survenue lors du téléchargement du fichier. Veuillez réessayer plus tard.');
  }
}
