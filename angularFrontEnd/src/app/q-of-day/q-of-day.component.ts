import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q-of-day',
  templateUrl: './q-of-day.component.html',
  styleUrls: ['./q-of-day.component.css']
})
export class QOfDayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dailyAuthor = "Robert Oppenheimer";
  dailyText = "Any man whose errors take ten years to correct is quite a man"

}
