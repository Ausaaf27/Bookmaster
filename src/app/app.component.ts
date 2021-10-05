import { Component, OnInit } from '@angular/core';
import books from './_files/books.json';
import {MatTableDataSource} from "@angular/material/table";
import {Books} from "./books";
import {ApiService} from "./api.service";


interface Book {
  id: Number;
  title: String;
  isbn: String;
  authors: [];
  pageCount: String;
  thumbnailUrl: String;
  shortDescription: String;
  longDescription: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {
//   title = 'bookmaster';
//   books: Book[] = books;
// abc: any[] = [];
// ngOnInit()
// {
//   for(var i=0;i<10;i++)
//   {
//     this.abc.push(this.books[i])
//   }

// }
// }

export class AppComponent implements OnInit{

  books: Book[] = [];
  
  public displayedColumns = ['id', 'title', 'authors', 'shortDescription' ];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Books>();

  //dependency injection
  constructor(private bookApiService: ApiService) {
  }

  ngOnInit(){
    //call this method on component load
    this.getBooksInformation();
  }
  /**
   * This method returns students details
   */
  getBooksInformation(){
    this.bookApiService.getBooksInformation()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }
}