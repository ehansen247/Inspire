import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  
  export class DbService {
  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:8000/api/";

  getQuery(text, type) {
    const results = this.http.post(this.apiUrl + "search", {"text": text, "type": type});
    return results;
  }

  authenticate(username: string, password: string) {
    const results = this.http.post(this.apiUrl + "authenticate", {"username" : username, "password" : password});
    return results;
  }

  submitUserQuote(text, username, password) {
    const results = this.http.post(this.apiUrl + "submitUserQuote", {"text" : text, "username" : username, "password" : password});
    return results;
  }
}

// export interface Config {
//     quote_text: string;
//     author: string;
// }