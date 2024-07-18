import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardDetails } from 'src/app/models/card-details.model';
import { CardDetailsService } from 'src/app/services/card-details.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedFile: File | null = null;
  uploadResponse: any = null;
  uploadError: any = null;
  cardForm: FormGroup;

  constructor(private http: HttpClient,private fb: FormBuilder,private cardService:CardDetailsService,private router: Router) {
    this.cardForm = this.fb.group({
      cardId: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      localityName: ['', Validators.required],
      town: ['', Validators.required],
      number: ['', Validators.required],
      job: ['', Validators.required],
      sex: ['', Validators.required],
      religion: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      validityDate: ['', Validators.required],
      releaseDate: ['', Validators.required],
      image: ['', Validators.required],
      code_qr: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  setFormValues(response: any) {
    this.cardForm.setValue({
      cardId: response.cardId || '',
      lastname: response.lastname || '',
      firstname: response.firstname || '',
      localityName: response.localityName || '',
      town: response.town || '',
      number: response.number || '',
      job: response.job || '',
      sex: response.sex || '',
      religion: response.religion || '',
      maritalStatus: response.maritalStatus || '',
      validityDate: response.validityDate || '',
      releaseDate: response.releaseDate || '',
      image: response.image || '',
      code_qr: response.code_qr || ''
    });
    console.log("+++++++++++++++++++++++++++++")
    console.log(this.cardForm.value);
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
          this.setFormValues(this.uploadResponse);
          console.log("Upload successful:", this.uploadResponse);
        },
        (error: HttpErrorResponse) => {
          this.uploadError = error.error.error || error.message || 'An error occurred during upload.';
          console.error("Upload error:", error);
        }
      );
  }

  onSubmit(): void {
   
      const cardDetails: CardDetails = this.cardForm.value;
      this.cardService.create(cardDetails).subscribe(
        (response) => {
          console.log("Card Details saved successfully: " + response);
          this.router.navigate(['/card']);
        },
        (error) => {
          console.log("Error saving Card Details: " + error);
        }
      );
  }
}