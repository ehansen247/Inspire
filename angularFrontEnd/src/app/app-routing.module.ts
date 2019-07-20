import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SearchComponent} from './search/search.component';
import {QOfDayComponent} from './q-of-day/q-of-day.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'qOfDay', component: QOfDayComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
