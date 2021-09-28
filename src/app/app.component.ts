import { Component } from '@angular/core';
import books from './_files/books.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookmaster';
  public bookList:{id:string, title:string, isbn:string, pageCount:string, thumbnailUrl:string, shortDescription:string, longDescription:string,
  status:string}[] = books;
}
