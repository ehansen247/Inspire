import { Component, OnInit } from '@angular/core';
import { DbService } from '../app.dbService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private dbServ : DbService) { }

  ngOnInit() {
  }

  submitQuote (text, user) {
    alert("Remember your username so you can lookup your quotes later. Don't share your username with anyone else.");
    this.dbServ.submitUserQuote(text, user).subscribe(res => console.log(res), err => console.log(err));
  }
}
