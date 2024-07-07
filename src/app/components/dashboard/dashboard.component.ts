import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedFile: File | null = null;
  uploadResponse: any = null;
  uploadError: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPDF() {
    if (!this.selectedFile) {
      this.uploadError = "Please select a PDF file to upload.";
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5000/ReadPDF', formData)
      .subscribe(
        (response) => {
          this.uploadResponse = response.result;
          this.uploadError = null; // Clear any previous error messages
          console.log("Upload successful:", this.uploadResponse);
        },
        (error: HttpErrorResponse) => {
          this.uploadError = error.error.error || error.message || 'An error occurred during upload.';
          console.error("Upload error:", error);
        }
      );
  }
}