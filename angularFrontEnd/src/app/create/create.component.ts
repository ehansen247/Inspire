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
  showSubmissionText = false;
  submissionText = "";

  quoteText = "";
  username = "";
  password = "";

  submitQuote () {
    try {
      console.log("reached1");
      this.dbServ.authenticate(this.username, this.password)
      .subscribe(res => {
        if (res["message"] == "New User") {
          this.submissionText = "We've added your username to the database. Congratulations on your first quote!";
          this.dbServ.submitUserQuote(this.quoteText, this.username, this.password)
            .subscribe(result => this.postSubmit(result), err => this.handleSubmitError(err));
        }
        else if (res["message"] == "Authentication Valid") {
          this.submissionText = "We've added your quote to the database.";
          this.dbServ.submitUserQuote(this.quoteText, this.username, this.password)
            .subscribe(result => this.postSubmit(result), err => this.handleSubmitError(err));
        }
        else {
          this.submissionText = "Sorry that username corresponds to a different password.";
          this.clear();
        }
      }, err => this.handleSubmitError(err));
    } catch (err) {
      this.handleSubmitError(err);
    }
  }

  postSubmit(result) {
    console.log("true");
    if (result["success"] != "True") {
      this.submissionText = "We encounted an error while handling your submission";
    }
    this.clear();
  }

  clear() {
    this.quoteText = "";
    this.username = "";
    this.password = "";
    this.showSubmissionText = true;
  }

  handleSubmitError(err) {
    console.log(err);
    this.submissionText = "We encounted an error while handling your submission";
    this.clear();
  }
}
