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

  submitQuote () {
    alert("Remember your username. Use it to lookup your past quotes in the search tab");

  }
}
