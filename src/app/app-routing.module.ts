import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from "./home/home.component";
// import { BookDetailsComponent } from "./book-details/book-details.component";

import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    // { path: "home", component: HomeComponent },
    // { path: "bookDetails", component: BookDetailsComponent }
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}