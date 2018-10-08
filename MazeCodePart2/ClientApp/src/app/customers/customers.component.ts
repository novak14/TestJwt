import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any;
  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) { 
      this.baseUrl = baseUrl;
    }

  ngOnInit() {
    this.http.get(this.baseUrl + 'api/customers').subscribe(response => {
      this.customers = response;
    }, err => {
      console.log(err);
    });
  }

}
