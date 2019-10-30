import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare function SHA1(msg : string) : any;

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
    // Hash Password
    const salt = "f1nd1ngn3m0";
    const hash_pw = SHA1(salt + password);
    const results = this.http.post(this.apiUrl + "authenticate", {"username" : username, "password" : hash_pw});
    return results;
  }

  submitUserQuote(text, username, password) {
    // Hash Password
    const salt = "f1nd1ngn3m0";
    const hash_pw = SHA1(salt + password);
    const results = this.http.post(this.apiUrl + "submitUserQuote", {"text" : text, "username" : username, "password" : hash_pw});
    return results;
  }
}

// export interface Config {
//     quote_text: string;
//     author: string;
// }
