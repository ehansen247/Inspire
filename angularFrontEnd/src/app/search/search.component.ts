import { Component, OnInit } from '@angular/core';
import { DbService } from '../app.dbService';

import { $ } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  
  constructor(private dbServ :  DbService) {  }

  ngOnInit() {
  }

  value = "";
  query = "Love";
  dataAcquired = false;
  queryType = "Quote";

  // queryType, author, quote, userID

  searchSubmit(text: string) {
    console.log("reached1");
    this.dbServ.getQuery().subscribe(res => console.log("reached3"), err => console.log(err));
  }

}
