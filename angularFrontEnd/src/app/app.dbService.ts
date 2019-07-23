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

  submitUserQuote(text, user) {
    console.log("reached");
    const results = this.http.post(this.apiUrl + "submitUserQuote", {"text" : text, "user" : user});
    return results;
  }
}

// export interface Config {
//     quote_text: string;
//     author: string;
// }