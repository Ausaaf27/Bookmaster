import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditbookComponent } from './addeditbook/addeditbook.component';
import { BookListComponent } from './book-list/book-list.component';
import { DescriptionComponent } from './description/description.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecentBookComponent } from './recent-book/recent-book.component';
import { RecentlyDeletedComponent } from './recently-deleted/recently-deleted.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path: 'landing-page', component: LandingPageComponent,
    children: [
      {
        path: '', 
        redirectTo: 'recent-books', 
        pathMatch: 'full'
     },
      {
        path: 'recent-books', component: RecentBookComponent
      },
      {
        path: 'book-list', component: BookListComponent
      }
    ]
  },
  { path: 'description', component: DescriptionComponent },
  { path: 'addeditbook', component: AddeditbookComponent },
  { path: 'recently-deleted', component: RecentlyDeletedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
