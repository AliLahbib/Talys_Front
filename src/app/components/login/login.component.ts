import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) // private cookieService: CookieService
  {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response.jwttoken);
      localStorage.setItem('jwt', response.jwttoken);
      // this.cookieService.set('jwt', response.jwttoken, 1, '/'); // Stocke le token dans un cookie pour 1 jour
      this.router.navigateByUrl('/dashboard');
    });
  }
}
