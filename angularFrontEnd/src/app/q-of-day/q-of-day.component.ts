import { Component, OnInit } from '@angular/core';
import { DbService } from "../app.dbService";

@Component({
  selector: 'app-q-of-day',
  templateUrl: './q-of-day.component.html',
  styleUrls: ['./q-of-day.component.css', '../app.component.css']
})
export class QOfDayComponent implements OnInit {

  constructor(private dbServ : DbService) { }

  ngOnInit() {
    this.getDailyInfo();
    this.resultsPending = true;
  }

  resultsPending = false;
  dailyAuthor = ""
  dailyText = ""

  getDailyInfo() {
      // Number of days from January 1, 1970 00:00:00 UTC.

    var deviation = (Math.floor(Date.now() / 86400000));
    var id = (deviation % 4135) + 12;
    this.dbServ.getQuery(id.toString(), "id")
               .subscribe(res => {
                  try {
                    this.updateDaily(res["success"]);
                  } catch (err) {
                    this.updateDailyFailed(err);
                  }
                }, (err) => {
                  this.updateDailyFailed(err);
                });
  }

  updateDaily(rows) {
    this.dailyAuthor = rows[0].author;
    this.dailyText = rows[0].quote;
    this.resultsPending = false;
  }

  async updateDailyFailed(err) {
    await this.sleep(1000);
    console.log(err);
    this.dailyText = "May your choices reflect your hopes, not your fears."
    this.dailyAuthor = "Nelson Mandela";
    this.resultsPending = false;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
