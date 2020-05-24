import { Component, OnInit } from '@angular/core';
import { DbService } from '../app.dbService';
import { resultStatus }  from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../app.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private dbServ :  DbService) {}

  ngOnInit() {
    this.placeholderText = "Enter a keyword";
    this.status = resultStatus.None;
  }

  status = resultStatus.None;
  placeholderText = "";

  queryResults = [];
  displayResults = [];
  rowIndex = 0;
  endIndex = 5;

  // For use in html bindings, since resultStatus is not accessible
  readonly pending = resultStatus.Pending;
  readonly failed = resultStatus.Failed;
  readonly returned = resultStatus.Returned;
  readonly none = resultStatus.None;

  // Handle the submission of a search query
  searchSubmit(text: string, type: string) {
    this.pend();
    try {
      this.dbServ.getQuery(text, type)
      .subscribe(res => this.updateTable(res["success"]), err => this.handleSearchError(err));
    } catch (err) {
      this.handleSearchError(err);
    }
  }

  // Helper Functions

  // Update the table with query results
  updateTable(rows) {
    // No results
    if (rows.length == 0) {
      this.status = resultStatus.None;
    }
    // Show first eight results
    else {
      this.status = resultStatus.Returned;
      this.queryResults = rows;
      this.endIndex = Math.min(this.endIndex, this.queryResults.length);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);
    }
  }

  // Change visuals while pending for results
  pend() {
    this.status = resultStatus.Pending;
    this.queryResults = [];
    this.displayResults = [];
    this.rowIndex = 0;
    this.endIndex = 5;
  }

  // On change of query type, change placeholder text and clear input
  queryTypeChange(value: string) {

    // Change placeholder text
    switch(value) {
      case "quote":
        this.placeholderText = "Enter a keyword";
        break;
      case "author":
        this.placeholderText = "Enter an author's name";
        break;
      case "username":
        this.placeholderText = "Enter a username";
        break;
    }

    // Clear Text in Input
    (<HTMLInputElement>document.getElementById("searchInput")).value = "";
  }

  // Change viewable results after forward click
  forwardDisplay() {
    if (this.endIndex < this.queryResults.length)
    {
      this.rowIndex = this.endIndex;
      this.endIndex = Math.min(this.endIndex + 5, this.queryResults.length);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);
    }
  }

    // Change viewable results after backward click
  backwardDisplay() {
    if (this.rowIndex > 0) {
      this.endIndex = this.rowIndex;
      this.rowIndex = Math.max(0, this.rowIndex - 5);
      this.displayResults = this.queryResults.slice(this.rowIndex, this.endIndex);
    }
  }

  // Handle errors during search process
  handleSearchError(err) {
    console.log(err);
    this.status = resultStatus.Failed;
  }
}
