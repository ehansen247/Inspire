import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  
  export class DbService {
  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:8000/api/get/";

  getQuery() {
    console.log("reached2");
    return this.http.get(this.apiUrl);
  }
}

// export interface Config {
//     quote_text: string;
//     author: string;
// }