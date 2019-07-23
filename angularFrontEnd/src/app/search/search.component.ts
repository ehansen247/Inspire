import { Component, OnInit } from '@angular/core';
import { DbService } from '../app.dbService';

import { $ } from 'protractor';
import { timeout } from 'q';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  
  constructor(private dbServ :  DbService) {  }

  resultsPending = false;
  noResults = true;
  resultsReturned = false;

  queryResults = [];
  displayResults = [];
  rowIndex = 0;
  endIndex = 5;

  ngOnInit() {
  }

  reset() {
    this.resultsPending = true;
    this.noResults = false;
    this.resultsReturned = false;

    this.queryResults = [];
    this.displayResults = [];
    this.rowIndex = 0;
    this.endIndex = 5;
  }

  updateTable(rows) {
    // No results
    if (rows.length == 0) {
      this.noResults = true;
      this.resultsPending = false;
    }
    // Show first eight results
    else {
      this.resultsReturned = true;

      this.resultsPending = false;
      this.queryResults = rows;
      this.endIndex = Math.min(this.endIndex, this.queryResults.length);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);
    }
  }

  forwardDisplay() {
    console.log("reached0");
    if (this.endIndex < this.queryResults.length)
    {
      this.rowIndex = this.endIndex;
      this.endIndex = Math.min(this.endIndex + 5, this.queryResults.length);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);

    }
  }

  backwardDisplay() {
    console.log("reached1");
    if (this.rowIndex > 0) {
      this.endIndex = this.rowIndex; 
      this.rowIndex = Math.max(0, this.rowIndex - 5);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);
    }
  }

  searchSubmit(text: string, type: string) {
    this.reset();
    this.dbServ.getQuery(text, type)
      .subscribe(res => this.updateTable(res["success"]), err => console.log(err));
  }

}
