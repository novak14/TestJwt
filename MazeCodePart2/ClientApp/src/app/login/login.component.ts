import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  baseUrl: string;

  constructor(private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
      console.log('Url: ' + this.baseUrl);
    }

  ngOnInit() {
  }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post(this.baseUrl + 'api/auth/login', credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
